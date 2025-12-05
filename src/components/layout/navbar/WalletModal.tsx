
'use client';

import React, { useState, useEffect } from 'react';
import {
  Modal,
  Paper,
  Typography,
  Button,
  Box,
  Stack,
  IconButton,
  Divider,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TranslateIcon from '@mui/icons-material/Translate';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useRouter } from 'next/navigation';
import { useWalletAuth } from '@/hooks/useAuth';
import dynamic from 'next/dynamic';

import Cookies from 'js-cookie';
import userApi from '@/services/userService';

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

type WalletState = 'select' | 'connecting' | 'info' | 'disconnect';

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  account: string;
  setAccount: (acc: string) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({
  open,
  onClose,
  account,
  setAccount,
}) => {
  const API_URL = process.env.NEXT_PUBLIC_API;
  const [walletState, setWalletState] = useState<WalletState>('select');
  const [connectingWalletName, setConnectingWalletName] = useState('');
  const [walletListOpen, setWalletListOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState('0');
  const [showPioneQR, setShowPioneQR] = useState(false);
  const [pioneQR, setPioneQR] = useState('');

  const router = useRouter();

  const [profile, setProfile] = useState<{
    addressWallet: string;
    avatar?: string;
  } | null>(null);
  const walletAddress = Cookies.get('account') || '';

  const [selectedWallet, setSelectedWallet] = useState<
    'eth' | 'metamask' | 'pione' | 'wallet'
  >('eth');

  const walletIcons: Record<typeof selectedWallet, string> = {
    eth: '/icons/eth.svg',
    metamask: '/icons/metamask.svg',
    pione: '/icons/pione.svg',
    wallet: '/icons/wallet.svg',
  };

  const shortenAddress = (addr: string) =>
    addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';
  const {
    authenticateWallet,
    logout,
    account: hookAccount,
    loading,
  } = useWalletAuth();
  const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

  // 🔹 Lấy balance
  const getBalance = async (acc: string): Promise<string> => {
  if (!window.ethereum || !window.ethereum.request) {
    console.error('Ethereum provider not found');
    return '0';
  }

  try {
    const balanceWei = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [acc, 'latest'],
    });

    // Kiểm tra dữ liệu trả về
    if (!balanceWei || typeof balanceWei !== 'string') {
      console.error('Invalid balance returned:', balanceWei);
      return '0';
    }

    // Chuyển từ hex sang số ETH
    const balanceEth = parseFloat((parseInt(balanceWei, 16) / 1e18).toFixed(4));
    if (isNaN(balanceEth)) {
      console.error('Parsed balance is NaN:', balanceWei);
      return '0';
    }

    return balanceEth.toString();
  } catch (err: unknown) {
    console.error('Error fetching balance:', err instanceof Error ? err.message : err);
    return '0';
  }
};

  const connectWallet = async (wallet: 'metamask' | 'pione') => {
    setSelectedWallet(wallet);
    setConnectingWalletName(wallet);
    setWalletState('connecting');

    try {
      if (wallet === 'metamask') {
        const { ethereum } = window;
        if (!ethereum) {
          toast.error('MetaMask is not installed!');
          setWalletState('select');
          return;
        }

        const accounts = (await ethereum.request({
          method: 'eth_requestAccounts',
        })) as string[];
        if (!accounts || accounts.length === 0)
          throw new Error('No accounts found');

        const address = accounts[0];
        setAccount(address);

        try {
          await authenticateWallet(address);
        } catch (err) {
          console.log('Backend auth failed, waiting...');
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        const balance = await getBalance(address);
        setWalletBalance(balance);
        setWalletState('info');
      } else if (wallet === 'pione') {
        const callbackUrl = encodeURIComponent(window.location.href);
        const qrLink = `pione://connect?callback=${callbackUrl}`;
        setPioneQR(qrLink);
        setShowPioneQR(true);
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : 'Connection failed');
      setWalletState('select');
    }
  };

  // 🔹 Disconnect wallet
  const handleDisconnect = () => {
    setWalletState('disconnect');
    logout();
    setAccount(''); // reset external account
    router.push('/');
  };

  // 🔹 Explore creator page
  const handleExplore = () => {
    if (hookAccount) {
      router.push(
        `/creator/creator-detail?walletMode=true&address=${hookAccount}`,
      );
    }
    onClose();
  };

  // ✅ Update wallet state & balance khi hookAccount thay đổi
  useEffect(() => {
    if (!open) return;
    if (hookAccount) {
      setWalletState('info');
      getBalance(hookAccount).then(setWalletBalance);
    } else {
      setWalletState('select');
      setWalletBalance('0');
    }
  }, [hookAccount, open]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userApi.getUserProfileByWallet(walletAddress); // dùng đúng tên export
        setProfile({
          addressWallet: data.addressWallet,
          avatar: data.avatar ? userApi.getUserAvatar(data.avatar) : undefined,
        });
      } catch (err) {
        console.error('Failed to load profile', err);
      }
    };

    if (walletAddress) fetchProfile();
  }, [walletAddress]);

  // if (!profile) return null;
  const avatarUrl = profile?.avatar
    ? profile.avatar.startsWith('http')
      ? profile.avatar // đã là link Cloudinary
      : `https://res.cloudinary.com/dr6cnnvma/image/upload/v1763370298/${profile.avatar}.png`
    : '/avatars/cyber-avatar.png';

  console.log(avatarUrl);

  return (
    <>
      {/* MAIN MODAL */}
      <Modal open={open} onClose={onClose}>
        <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              className="relative w-[400px] rounded-2xl p-8 text-center text-white shadow-2xl"
              sx={{
                background:
                  walletState === 'disconnect'
                    ? '#fff'
                    : 'linear-gradient(180deg, rgba(29,0,59,1) 0%, rgba(12,4,35,1) 100%)',
                color: walletState === 'disconnect' ? '#1a1a1a' : '#fff',
                border:
                  walletState === 'disconnect'
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  color: walletState === 'disconnect' ? '#555' : '#fff',
                  opacity: 0.7,
                  '&:hover': { opacity: 1 },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* SELECT */}
              {walletState === 'select' && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Connect Wallet
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#bcb9d3', fontSize: '14px', mb: 4 }}
                  >
                    Discover, collect, and trade unique digital assets. <br />
                    To start, please connect your wallet.
                  </Typography>

                  <Stack spacing={2}>
                    <Button
                      fullWidth
                      onClick={() => connectWallet('metamask')}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: '#1F1639',
                        '&:hover': { bgcolor: '#2A1C52' },
                      }}
                    >
                      <Image
                        src="/icons/metamask.svg"
                        alt="metamask"
                        width={28}
                        height={28}
                      />
                      MetaMask
                    </Button>

                    <Button
                      fullWidth
                      onClick={() => connectWallet('pione')}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: '#1F1639',
                        '&:hover': { bgcolor: '#2A1C52' },
                      }}
                    >
                      <Image
                        src="/icons/pione.svg"
                        alt="pione"
                        width={28}
                        height={28}
                      />
                      Pione Wallet
                    </Button>

                    <Button
                      fullWidth
                      onClick={() => setSelectedWallet('wallet')}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 3,
                        py: 1.5,
                        borderRadius: 2,
                        bgcolor: '#1F1639',
                        '&:hover': { bgcolor: '#2A1C52' },
                      }}
                    >
                      <Image
                        src="/icons/wallet.svg"
                        alt="all-wallets"
                        width={28}
                        height={28}
                      />
                      All Wallets
                    </Button>
                  </Stack>
                </>
              )}

              {/* PIONE QR */}
              {showPioneQR && (
                <Box mt={4} className="flex flex-col items-center gap-4">
                  <Typography variant="body2" sx={{ color: '#bcb9d3' }}>
                    Scan this QR code with your Pione Wallet app
                  </Typography>
                  <QRCode value={pioneQR} size={180} />
                  <Button
                    onClick={() => setShowPioneQR(false)}
                    sx={{
                      mt: 2,
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.2)',
                      textTransform: 'none',
                      borderRadius: '12px',
                      px: 3,
                      py: 1,
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}

              {/* CONNECTING */}
              {walletState === 'connecting' && (
                <Box className="flex flex-col items-center justify-center py-6 px-4">
                  {/* Title */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      fontSize: '22px',
                    }}
                  >
                    Connecting {connectingWalletName}...
                  </Typography>

                  {/* Circle loading */}
                  <motion.div className="relative mb-6 w-[95px] h-[95px] flex items-center justify-center">
                    {/* Rotating soft border */}
                    <motion.div
                      className="absolute w-[95px] h-[95px] rounded-full border-[4px] border-[#9d69ff]/30"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: 'linear',
                      }}
                      style={{ willChange: 'transform' }}
                    />

                    {/* Soft continuous aura */}
                    <motion.div
                      className="absolute w-[95px] h-[95px] rounded-full"
                      style={{
                        boxShadow: '0 0 18px 6px rgba(157,105,255,0.3)',
                        willChange: 'transform'
                      }}
                      initial={{ scale: 0.85 }}
                      animate={{ scale: [0.85, 1.2] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Center icon */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        src={walletIcons[selectedWallet]}
                        alt={selectedWallet}
                        width={38}
                        height={38}
                      />
                    </Box>
                  </motion.div>

                  {/* Subtitle */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#c8c5db',
                      fontSize: '15px',
                      mb: 4,
                      maxWidth: '260px',
                      textAlign: 'center',
                    }}
                  >
                    {connectingWalletName} is open. Please select an account and
                    press &quot;Connect&quot;.
                  </Typography>

                  {/* Status bar */}
                  <Box
                    sx={{
                      width: '100%',
                      py: 1.5,
                      borderRadius: '14px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.2,
                    }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <Typography
                      variant="body2"
                      sx={{ color: '#e8e6f5', fontSize: '14px' }}
                    >
                      Waiting for confirmation from {connectingWalletName}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* INFO */}
              {walletState === 'info' && (
                <Box className="relative flex flex-col items-center justify-center">
                  {/* Avatar Section */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-5"
                  >
                    <Avatar
                      src={
                        avatarUrl
                        // : '/avatars/cyber-avatar.png'
                      }
                      sx={{
                        width: 80,
                        height: 80,
                        border: '2px solid #8c4aff',
                        boxShadow: '0 0 20px rgba(140,74,255,0.7)',
                        cursor: 'pointer',
                        '&:hover': { transform: 'scale(1.05)' },
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: '#c7baff', fontSize: 13 }}
                    >
                      {profile?.addressWallet
                        ? shortenAddress(profile.addressWallet)
                        : 'Loading...'}
                    </Typography>
                  </motion.div>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: '#fff',
                      textShadow: '0 0 10px #8c4aff',
                    }}
                  >
                    Wallet Connected
                  </Typography>

                  {/* Action Buttons */}
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    mb={4}
                  >
                    <Button
                      startIcon={<RocketLaunchIcon />}
                      onClick={handleExplore}
                      sx={{
                        background: 'linear-gradient(90deg, #7b2fff, #d16bff)',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '12px',
                        px: 2.5,
                        py: 1,
                        boxShadow: '0 0 12px rgba(140,74,255,0.5)',
                        '&:hover': { opacity: 0.9 },
                      }}
                    >
                      Explore
                    </Button>

                    <Button
                      startIcon={<PowerSettingsNewIcon />}
                      onClick={handleDisconnect}
                      sx={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: '12px',
                        px: 2.5,
                        py: 1,
                        '&:hover': {
                          background: 'rgba(255,255,255,0.15)',
                        },
                      }}
                    >
                      Disconnect
                    </Button>
                  </Stack>

                  <Divider sx={{ bgcolor: 'rgba(255,255,255,0.15)', mb: 3 }} />

                  {/* Sub Sections */}
                  <Stack spacing={2} alignItems="center">
                    <Box className="flex items-center gap-2">
                      <TranslateIcon sx={{ color: '#b79aff' }} />
                      <Typography sx={{ color: '#b79aff' }}>
                        Language: EN / VN
                      </Typography>
                    </Box>

                    <Box className="flex items-center gap-2">
                      <AccountBalanceWalletIcon sx={{ color: '#b79aff' }} />
                      <Typography sx={{ color: '#b79aff' }}>
                        Balance: {walletBalance} PZO
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              )}

              {/* DISCONNECT */}
              {walletState === 'disconnect' && (
                <>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-pink-500 text-white"
                  >
                    <WarningAmberRoundedIcon sx={{ fontSize: 36 }} />
                  </motion.div>

                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    Wallet Disconnected
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#bcb9d3', mb: 4, fontSize: '14px' }}
                  >
                    You have disconnected your wallet. Connect again to
                    continue.
                  </Typography>

                  <Button
                    onClick={() => setWalletState('select')}
                    fullWidth
                    sx={{
                      background:
                        'linear-gradient(90deg,#4B6CFB 0%,#9C5CFF 100%)',
                      borderRadius: '10px',
                      color: '#fff',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '15px',
                      py: 1.2,
                      '&:hover': { opacity: 0.9 },
                    }}
                  >
                    Reconnect Wallet
                  </Button>
                </>
              )}
            </Paper>
          </motion.div>
        </Box>
      </Modal>

      {/* ===================== WALLET LIST MODAL ===================== */}
      <Modal open={walletListOpen} onClose={() => setWalletListOpen(false)}>
        <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <Paper className="w-[350px] p-6 rounded-xl text-white">
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
              Select Wallet
            </Typography>
            <Stack spacing={2}>
              <Button
                onClick={() => {
                  connectWallet('metamask');
                  setWalletListOpen(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  justifyContent: 'flex-start',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: '#1F1639',
                  '&:hover': { bgcolor: '#2A1C52' },
                }}
              >
                <Image
                  src="/icons/metamask.svg"
                  width={28}
                  height={28}
                  alt="MetaMask"
                />{' '}
                MetaMask
              </Button>
              <Button
                onClick={() => {
                  connectWallet('pione');
                  setWalletListOpen(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  justifyContent: 'flex-start',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: '#1F1639',
                  '&:hover': { bgcolor: '#2A1C52' },
                }}
              >
                <Image
                  src="/icons/pione.svg"
                  width={28}
                  height={28}
                  alt="Pione Wallet"
                />{' '}
                Pione Wallet
              </Button>
              {['coinbase', 'walletconnect'].map((w) => (
                <Button
                  key={w}
                  disabled
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    justifyContent: 'flex-start',
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: '#1a1230',
                    opacity: 0.6,
                  }}
                >
                  <Image
                    src={`/icons/${w}.svg`}
                    width={28}
                    height={28}
                    alt={w}
                  />{' '}
                  {w.charAt(0).toUpperCase() + w.slice(1)}
                </Button>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </>
  );
};

export default WalletModal;
