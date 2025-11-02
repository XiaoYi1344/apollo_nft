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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

type WalletState =
  | 'select'
  | 'connecting'
  | 'success'
  | 'error'
  | 'info'
  | 'main'
  | 'disconnect';

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
  const [walletState, setWalletState] = useState<WalletState>('select');

  const connectWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error('MetaMask is not installed!');
      return;
    }

    setWalletState('connecting');
    try {
      const accounts = (await ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setWalletState('info');
        toast.success('Wallet connected successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('Connection rejected or failed.');
      setWalletState('select');
    }
  };

//   const disconnectWallet = () => {
//     setAccount('');
//     setWalletState('disconnect');

//     //Giữ trạng thái disconnect 2 giây rồi về select
//     setTimeout(() => {
//       setWalletState('select');
//     }, 2000);
//   };

  const handleRetry = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      toast.error('MetaMask is not installed!');
      return;
    }

    setWalletState('connecting');
    await connectWallet();
  };

  useEffect(() => {
      if (walletState === 'disconnect' || walletState === 'main') return; //Đừng override khi đang disconnect

    if (account) setWalletState('info');
    else setWalletState('select');
  }, [account, open, walletState]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ===================== CONNECT / INFO / DISCONNECT ===================== */}
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

            {/* ===================== SELECT ===================== */}
            {/* {walletState === 'select' && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '20px', mb: 1 }}>
                  Connect Wallet
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#bcb9d3',
                    fontSize: '14px',
                    mb: 4,
                  }}
                >
                  Discover, collect, and trade unique digital assets.
                  <br />
                  Please connect your wallet to get started.
                </Typography>

                <Stack spacing={2}>
                  <Button
                    fullWidth
                    onClick={connectWallet}
                    className="flex items-center justify-start gap-3 px-4 py-2 rounded-xl bg-[#1F1639] hover:bg-[#2A1C52] transition"
                  >
                    <Image
                      src="/icons/metamask.svg"
                      alt="metamask"
                      width={28}
                      height={28}
                    />
                    <span className="font-semibold text-white text-base">MetaMask</span>
                  </Button>
                </Stack>
              </>
            )} */}
            {/* ===================== SELECT STATE ===================== */}
            {walletState === 'select' && (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '20px',
                    mb: 1,
                  }}
                >
                  Connect Wallet
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#bcb9d3',
                    fontSize: '14px',
                    mb: 4,
                  }}
                >
                  Discover, collect, and trade unique digital assets. <br />
                  To start discovering, buying, selling, and creating NFTs,
                  please connect your wallet.
                </Typography>

                <Stack spacing={2}>
                  {/* MetaMask */}
                  <Button
                    fullWidth
                    onClick={connectWallet}
                    className="flex items-center justify-start gap-3 px-4 py-2 rounded-xl bg-[#1F1639] hover:bg-[#2A1C52] transition"
                  >
                    <Image
                      src="/icons/metamask.svg"
                      alt="metamask"
                      width={28}
                      height={28}
                    />
                    <span className="font-semibold text-white text-base">
                      MetaMask
                    </span>
                  </Button>

                  {/* Coinbase */}
                  <Button
                    disabled
                    fullWidth
                    className="flex items-center justify-start gap-3 px-4 py-2 rounded-xl bg-[#1F1639] opacity-60 cursor-not-allowed"
                  >
                    <Image
                      src="/icons/coinbase.svg"
                      alt="coinbase"
                      width={28}
                      height={28}
                    />
                    <span className="font-semibold text-white text-base">
                      Coinbase Wallet
                    </span>
                  </Button>

                  {/* WalletConnect */}
                  <Button
                    disabled
                    fullWidth
                    className="flex items-center justify-start gap-3 px-4 py-2 rounded-xl bg-[#1F1639] opacity-60 cursor-not-allowed"
                  >
                    <Image
                      src="/icons/walletconnect.svg"
                      alt="walletconnect"
                      width={28}
                      height={28}
                    />
                    <span className="font-semibold text-white text-base">
                      WalletConnect
                    </span>
                  </Button>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 3,
                    color: '#9f9bd2',
                    fontSize: '13px',
                  }}
                >
                  Mới sử dụng Web3?{' '}
                  <span
                    style={{
                      color: '#2da1ff',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Tìm hiểu về Ví điện tử
                  </span>
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    color: '#6d6a9a',
                    fontSize: '12px',
                  }}
                >
                  Bằng cách kết nối ví, bạn đồng ý với{' '}
                  <span style={{ color: '#8c4aff' }}>Điều khoản Dịch vụ</span>{' '}
                  của chúng tôi.
                </Typography>
              </>
            )}

            {/* ===================== CONNECTING ===================== */}
            {/* {walletState === 'connecting' && (
              <Box className="flex flex-col items-center justify-center">
                <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
                  <motion.div
                    className="absolute w-20 h-20 rounded-full border-[6px] border-[#8c4aff]/40 border-t-[#8c4aff]"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  />
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-20 h-20 rounded-full border-[3px] border-[#8c4aff]/30"
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                    />
                  ))}
                  <Image src="/icons/metamask.svg" alt="metamask" width={40} height={40} className="relative z-10" />
                </div>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Connecting MetaMask...
                </Typography>
                <Typography variant="body2" sx={{ color: '#bcb9d3', fontSize: '14px', mb: 4 }}>
                  Please confirm the connection in MetaMask.
                </Typography>
              </Box>
            )} */}

            {walletState === 'connecting' && (
              <Box className="flex flex-col items-center justify-center">
                {/* Hiệu ứng nhiều vòng tròn lan tỏa */}
                <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
                  {/* Vòng xoay chính */}
                  <motion.div
                    className="absolute w-20 h-20 rounded-full border-[6px] border-[#8c4aff]/40 border-t-[#8c4aff]"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: 'linear',
                    }}
                  />
                  {/* Vòng nở lan tỏa */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-20 h-20 rounded-full border-[3px] border-[#8c4aff]/30"
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                  Logo MetaMask
                  <Image
                    src="/icons/metamask.svg"
                    alt="metamask"
                    width={40}
                    height={40}
                    className="relative z-10"
                  />
                </div>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Connecting MetaMask...
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#bcb9d3',
                    fontSize: '14px',
                    mb: 4,
                    textAlign: 'center',
                  }}
                >
                  MetaMask is open. Please select an account and press
                  &quot;Connect&quot;.
                </Typography>

                <Button
                  disabled
                  startIcon={
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  }
                  sx={{
                    color: '#fff',
                    borderColor: '#fff',
                    textTransform: 'none',
                    fontWeight: 600,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                  }}
                >
                  Waiting for confirmation from MetaMask
                </Button>
              </Box>
            )}

            {/* ===================== INFO (CONNECTED SUCCESSFULLY) ===================== */}
{walletState === 'info' && (
  <>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-500/20 text-green-400"
    >
      <CheckCircleIcon sx={{ fontSize: 36 }} />
    </motion.div>

    <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
      Your wallet has been securely connected to <b>Apollo NFT</b>.
    </Typography>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '16px',
        mb: 3,
      }}
    >
      <Image
        src="/icons/avatar.png"
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <Box textAlign="left" flex={1}>
        <Typography variant="body2" sx={{ color: '#bcb9d3' }}>
          Address: {account.slice(0, 6)}...{account.slice(-4)}
        </Typography>
        <Typography variant="body2" sx={{ color: '#4BFB9B', fontWeight: 600 }}>
          Balance: 1.25 ETH
        </Typography>
      </Box>
    </Box>

    {/* Nút mở main */}
    <Button
      onClick={() => setWalletState('main')}
      fullWidth
      sx={{
        mt: 1.5,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        py: 1.2,
        '&:hover': { background: 'rgba(255,255,255,0.15)' },
      }}
    >
      Open Main
    </Button>

    {/* Nút bắt đầu khám phá (disconnect ở đây giữ nguyên nếu bạn muốn reset sau khi nhấn) */}
    <Button
      onClick={() => setWalletState('disconnect')}
      fullWidth
      sx={{
        mt: 1.5,
        background: 'linear-gradient(90deg, #8C4AFF 0%, #2DA1FF 100%)',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        py: 1.2,
        '&:hover': { opacity: 0.9 },
      }}
    >
      Start Exploring
    </Button>
  </>
)}


{walletState === 'main' && (
  <>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Wallet Status
    </Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        borderRadius: '10px',
        background: '#2a2b3d',
        mb: 3,
      }}
    >
      <Typography sx={{ color: '#f87171', fontWeight: 500 }}>
        Disconnected
      </Typography>
      <IconButton
        onClick={() => setWalletState('disconnect')}
        sx={{
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#f87171',
          '&:hover': { background: 'rgba(255, 255, 255, 0.15)' },
        }}
      >
        <PowerSettingsNewIcon />
      </IconButton>
    </Box>

    <Button
      fullWidth
      onClick={connectWallet}
      sx={{
        background:
          'linear-gradient(90deg, #4B6CFB 0%, #9C5CFF 100%)',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 600,
        textTransform: 'none',
        py: 1.2,
        '&:hover': { opacity: 0.9 },
      }}
    >
      Connect MetaMask Wallet
    </Button>
  </>
)}

{/* ===================== DISCONNECT MODAL ===================== */}
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
      You have disconnected your wallet. Connect again to continue.
    </Typography>

    <Button
      fullWidth
      onClick={handleRetry}
      sx={{
        background: 'linear-gradient(90deg, #4B6CFB 0%, #9C5CFF 100%)',
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
  );
};

export default WalletModal;
