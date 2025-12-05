

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
  useMediaQuery,
  Fade,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WalletIcon from '@mui/icons-material/Wallet';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import WalletModal from './WalletModal';
import { useWalletAuth } from '@/hooks/useAuth';

const navItems = ['Drop', 'Marketplace', 'Creator', 'Community'];

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [walletModalOpen, setWalletModalOpen] = useState(false);
  // const [account, setAccount] = useState<string>('');
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [account, setAccount] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const { account: hookAccount } = useWalletAuth(); // your wallet address from hook
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isTablet = useMediaQuery('(max-width:900px)');
  const isMobile = useMediaQuery('(max-width:600px)'); // 👈 thêm xác định mobile

  const [isHomePage, setIsHomePage] = useState(false);

  // Get query params
  const walletMode = searchParams?.get('walletMode');
  const address = searchParams?.get('address');

  const [profile, setProfile] = useState<{
    addressWallet: string;
    avatar?: string;
  } | null>(null);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Dynamic check using hookAccount
  useEffect(() => {
    if (!hookAccount) return; // chưa load xong
    const walletModeActive = walletMode === 'true';
    const sameAddress = address?.toLowerCase() === hookAccount.toLowerCase();
    const home =
      pathname === '/drop' ||
      pathname === '/community' ||
      pathname === '/view/upcoming' ||
      (pathname === '/creator/creator-detail' &&
        walletModeActive &&
        sameAddress);
    setIsHomePage(home);
  }, [hookAccount, walletMode, address, pathname]);

  // Dynamic background
  const backgroundColor = isHomePage
    ? 'rgba(26, 0, 71, 0.95)' // home pages fix màu
    : scrolled
      ? 'rgba(26, 0, 71, 0.95)' // scroll mới đổi
      : 'rgba(0, 0, 0, 0)'; // trang "/" sẽ vào đây khi chưa scroll

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: backgroundColor,
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          backgroundColor: backgroundColor,
          mb: 6,
          transition: 'all 0.4s ease',
          px: { xs: 2, md: 5 },
          zIndex: 1000,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            px: { xs: 1, md: 8 },
          }}
        >
          {/* LOGO */}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span
                style={{
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
            </Link>
          </Typography>

          {/* NAVIGATION + WALLET BUTTON (ẩn khi mobile) */}
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // 👈 trái-phải rõ ràng
                width: '100%',
              }}
            >
              {/* Navigation */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center', // 👈 căn giữa các item trong nhóm
                  alignItems: 'center',
                  gap: 3,
                  flex: 1, // 👈 giúp nav chiếm không gian giữa
                }}
              >
                {navItems.map((item) => {
                  const link = `/${item.toLowerCase()}`;
                  const active = pathname === link;
                  return (
                    <Button
                      key={item}
                      onClick={() => router.push(link)}
                      sx={{
                        color: active ? '#8c4aff' : '#fff',
                        fontWeight: active ? 700 : 500,
                        textTransform: 'none',
                        '&:hover': { color: '#8c4aff' },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item}
                    </Button>
                  );
                })}
              </Box>

              {/* Wallet Button */}
              <Button
                variant="contained"
                sx={{
                  background:
                    'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
                  textTransform: 'none',
                  borderRadius: '999px',
                  px: isTablet ? 2 : 3, // tăng padding cho tablet
                  py: 1,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  minWidth: isTablet ? 44 : 'auto', // giữ kích thước ổn định
                  '&:hover': {
                    background:
                      'linear-gradient(90deg, #7a3ae6 0%, #228de6 100%)',
                    boxShadow: '0 0 10px rgba(140, 74, 255, 0.6)',
                  },
                }}
                onClick={() => setWalletModalOpen(true)}
              >
                {/* Nếu đã kết nối ví */}
                {account ? (
                  `${account.slice(0, 6)}...${account.slice(-4)}`
                ) : isTablet ? (
                  <WalletIcon sx={{ fontSize: 24 }} /> // icon căn giữa khi không có text
                ) : (
                  <>Connect Wallet</>
                )}
              </Button>
            </Box>
          )}

          {/* MOBILE MENU ICON — chỉ hiện khi mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                ml: 'auto', // đẩy sang phải
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Fade}
        transitionDuration={250}
        PaperProps={{
          sx: {
            background:
              'radial-gradient(100% 100% at 0% 0%, #241A3E 0%, #12092A 100%)',
            borderRadius: '16px',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            mt: 1,
            px: 1,
            py: 0.5,
            minWidth: 180,
          },
        }}
        MenuListProps={{
          disablePadding: true,
          sx: {
            '& .MuiMenuItem-root.Mui-focusVisible': {
              backgroundColor: 'transparent !important',
            },
            '& .MuiMenuItem-root.Mui-selected': {
              backgroundColor: 'transparent !important',
            },
          },
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item}
            disableRipple
            onClick={() => {
              router.push(`/${item.toLowerCase()}`);
              setAnchorEl(null);
            }}
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: '12px',
              fontWeight: 500,
              transition: 'all 0.25s ease',
              backgroundColor: 'transparent !important',
              '&:hover': {
                background:
                  'linear-gradient(90deg, rgba(140,74,255,0.2), rgba(45,161,255,0.2))',
                color: '#8c4aff',
                transform: 'translateX(4px)',
              },
            }}
          >
            {item}
          </MenuItem>
        ))}

        <MenuItem
          disableRipple
          onClick={() => {
            setWalletModalOpen(true);
            setAnchorEl(null);
          }}
          sx={{
            mt: 0.5,
            py: 1.5,
            px: 2,
            borderRadius: '12px',
            fontWeight: 600,
            background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
            color: '#fff',
            justifyContent: 'center',
            '&:hover': {
              filter: 'brightness(1.15)',
              background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
            },
          }}
        >
          Connect Wallet
        </MenuItem>
      </Menu>
      {/* <WalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        account={account}
        setAccount={setAccount}
      /> */}
      <WalletModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        account={account}
        setAccount={setAccount}
      />

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
