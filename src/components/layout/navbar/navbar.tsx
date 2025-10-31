'use client';

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import toast, { Toaster } from 'react-hot-toast';

import { useRouter, usePathname } from 'next/navigation';
const navItems = ['Drop', 'Marketplace', 'Creator', 'Community'];

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

const styleModal: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  backgroundColor: '#1B0137',
  color: '#fff',
  borderRadius: '16px',
  boxShadow: '0 0 24px rgba(0,0,0,0.4)',
  padding: '32px',
  textAlign: 'center',
};

type WalletState = 'select' | 'connecting' | 'success' | 'error' | 'info';

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [walletState, setWalletState] = useState<WalletState>('select');

  const router = useRouter();
  const pathname = usePathname();
  // Handle scooling effect
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScrolled = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScrolled);
    return () => window.removeEventListener('scroll', handleScrolled);
  }, []);
  // Lắng nghe sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Kiểm tra có đang ở trang home không
  const isHome = pathname === "/" || pathname === "/vi" || pathname === "/en";

  // Logic màu nền
  const backgroundColor = isHome
    ? scrolled
      ? "rgba(26, 0, 71, 0.95)" // 🔹 Khi cuộn ở home
      : "rgba(0, 0, 0, 0)" // 🔹 Trong suốt ở home khi chưa cuộn
    : "rgba(26, 0, 71, 0.95)"; // 🔹 Luôn tím ở trang khác

  // Handle menu open/close
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        setWalletState('success');
        toast.success('Wallet connected successfully!');
      }
    } catch (error) {
      console.error(error);
      setWalletState('error');
      toast.error('Connection rejected or failed.');
    }
  };

  const handleOpenModal = () => {
    if (account) {
      // Nếu đã kết nối ví thì hiển thị thông tin ví
      setWalletState('info');
    } else {
      // Nếu chưa kết nối thì chọn ví
      setWalletState('select');
    }
    setWalletModalOpen(true);
  };

  const handleCloseModal = () => {
    setWalletModalOpen(false);
    setWalletState('select');
  };

  const disconnectWallet = () => {
    setAccount('');
    setWalletState('select');
    setWalletModalOpen(false);
    toast('Wallet disconnected', { icon: '🔌' });
  };

  return (
    <>
      <AppBar
        position="fixed" // 🔹 Giúp navbar luôn ở trên cùng khi cuộn
        elevation={0}
        sx={{
          // bgcolor: scrolled
          //   ? 'rgba(26, 0, 71, 0.95)' // 🔹 Khi cuộn: nền tím đậm, hơi mờ
          //   : 'rgba(0, 0, 0, 0)', // 🔹 Khi mới mở: trong suốt
           bgcolor: backgroundColor,
          backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)', // nhẹ nhàng mờ nền khi cuộn
          transition: 'all 0.4s ease',
          boxShadow: scrolled ? '0 0 20px rgba(0,0,0,0.4)' : 'none',
          px: 5,
          zIndex: 1000, // 🔹 Đảm bảo navbar luôn nổi trên topsection
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 3, md: 8 } }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            <span
              style={{
                // background: "linear-gradient(90deg, #7a3bff 0%, #8c4aff 40%, #b78eff 100%)",
                background:
                  'linear-gradient(90deg, #b78eff 0%, #8c4aff 40%, #4b0082 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
              }}
            >
              Apollo
            </span>

            <span style={{ color: '#2da1ff' }}>NFT</span>
          </Typography>

          {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: '#fff', // màu mặc định
                  '&:hover': {
                    color: '#00F8D1', // khi hover
                  },
                  '&.Mui-selected': {
                    color: '#500ACA', // khi active / chọn
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box> */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            {navItems.map((item) => {
              const link = `/${item.toLowerCase()}`; // tạo link tự động
              const active = pathname === link; // kiểm tra đang ở trang nào

              return (
                <Button
                  key={item}
                  onClick={() => router.push(link)}
                  sx={{
                    color: active ? '#8c4aff' : '#fff', // màu khi active
                    fontWeight: active ? 700 : 500,
                    textTransform: 'none',
                    '&:hover': {
                      color: '#8c4aff',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </Box>

          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
              textTransform: 'none',
              borderRadius: '999px',
              px: 3,
              py: 1,
              fontWeight: 'bold',
            }}
            onClick={handleOpenModal}
          >
            {account
              ? `${account.slice(0, 6)}...${account.slice(-4)}`
              : 'Connect Wallet'}
          </Button>

          {/* Mobile menu */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { md: 'none' } }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            {navItems.map((item) => (
              <MenuItem key={item} onClick={handleClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>

          {/* Wallet Modal */}
          <Modal open={walletModalOpen} onClose={handleCloseModal}>
            <Paper sx={styleModal}>
              {walletState === 'select' && (
                <>
                  <Typography variant="h6" mb={2}>
                    Connect Wallet
                  </Typography>
                  <Typography variant="body2" mb={2} sx={{ opacity: 0.8 }}>
                    Choose your preferred wallet to connect to Apollo NFT.
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#FF8C00' }}
                      onClick={connectWallet}
                    >
                      MetaMask
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#627EEA' }}
                      disabled
                    >
                      Coinbase Wallet
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: '#3C99FC' }}
                      disabled
                    >
                      WalletConnect
                    </Button>
                  </Stack>
                </>
              )}

              {walletState === 'connecting' && (
                <>
                  <Typography variant="h6" mb={2}>
                    Connecting MetaMask...
                  </Typography>
                  <CircularProgress color="inherit" sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Please confirm the connection in your MetaMask wallet.
                  </Typography>
                </>
              )}

              {walletState === 'success' && (
                <>
                  <CheckCircleIcon
                    sx={{ color: '#4CAF50', fontSize: 48, mb: 1 }}
                  />
                  <Typography variant="h6" mb={1}>
                    Connected Successfully
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                    Your wallet is now connected to Apollo NFT.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
                    }}
                    onClick={handleCloseModal}
                  >
                    Start Exploring
                  </Button>
                </>
              )}

              {walletState === 'error' && (
                <>
                  <ErrorIcon sx={{ color: '#FF5252', fontSize: 48, mb: 1 }} />
                  <Typography variant="h6" mb={1}>
                    Connection Failed
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                    The connection request was rejected or expired. Please try
                    again.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
                    }}
                    onClick={connectWallet}
                  >
                    Retry
                  </Button>
                </>
              )}

              {walletState === 'info' && (
                <>
                  <Typography variant="h6" mb={2}>
                    Wallet Information
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                    Connected with MetaMask
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      bgcolor: '#2D115E',
                      wordBreak: 'break-all',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2">Address: {account}</Typography>
                  </Box>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      sx={{
                        background:
                          'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
                      }}
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: '#fff',
                        borderColor: '#fff',
                      }}
                      onClick={handleCloseModal}
                    >
                      Close
                    </Button>
                  </Stack>
                </>
              )}
            </Paper>
          </Modal>
        </Toolbar>
      </AppBar>

      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#1A0047', color: '#fff' },
          success: { iconTheme: { primary: '#2da1ff', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ff3d71', secondary: '#fff' } },
        }}
      />
    </>
  );
};

export default Navbar;
