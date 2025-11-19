// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   Box,
// //   Button,
// //   IconButton,
// //   Menu,
// //   MenuItem,
// //   Modal,
// //   Paper,
// //   Stack,
// //   CircularProgress,
// // } from '@mui/material';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import ErrorIcon from '@mui/icons-material/Error';
// // import toast, { Toaster } from 'react-hot-toast';
// // import Image from 'next/image';
// // import { useRouter, usePathname } from 'next/navigation';
// // import Link from 'next/link';

// // const navItems = ['Drop', 'Marketplace', 'Creator', 'Community'];

// // interface EthereumProvider {
// //   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// // }

// // declare global {
// //   interface Window {
// //     ethereum?: EthereumProvider;
// //   }
// // }

// // // ✅ Nâng cấp modal cho giống hình 2
// // const styleModal: React.CSSProperties = {
// //   position: 'absolute',
// //   top: '50%',
// //   left: '50%',
// //   transform: 'translate(-50%, -50%)',
// //   width: 380,
// //   background:
// //     'radial-gradient(100% 100% at 0% 0%, #241A3E 0%, #12092A 100%)',
// //   color: '#fff',
// //   borderRadius: '16px',
// //   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
// //   padding: '32px',
// //   textAlign: 'center',
// // };

// // type WalletState = 'select' | 'connecting' | 'success' | 'error' | 'info';

// // const Navbar: React.FC = () => {
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// //   const [walletModalOpen, setWalletModalOpen] = useState(false);
// //   const [account, setAccount] = useState<string>('');
// //   const [walletState, setWalletState] = useState<WalletState>('select');

// //   const router = useRouter();
// //   const pathname = usePathname();

// //   const [scrolled, setScrolled] = useState(false);
// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 60);
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   const isHome = pathname === '/' || pathname === '/vi' || pathname === '/en';
// //   const backgroundColor = isHome
// //     ? scrolled
// //       ? 'rgba(26, 0, 71, 0.95)'
// //       : 'rgba(0, 0, 0, 0)'
// //     : 'rgba(26, 0, 71, 0.95)';

// //   const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
// //     setAnchorEl(event.currentTarget);
// //   const handleClose = () => setAnchorEl(null);

// //   const connectWallet = async () => {
// //     const { ethereum } = window;
// //     if (!ethereum) {
// //       toast.error('MetaMask is not installed!');
// //       return;
// //     }

// //     setWalletState('connecting');
// //     try {
// //       const accounts = (await ethereum.request({
// //         method: 'eth_requestAccounts',
// //       })) as string[];

// //       if (accounts && accounts.length > 0) {
// //         setAccount(accounts[0]);
// //         setWalletState('success');
// //         toast.success('Wallet connected successfully!');
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       setWalletState('error');
// //       toast.error('Connection rejected or failed.');
// //     }
// //   };

// //   const handleOpenModal = () => {
// //     if (account) setWalletState('info');
// //     else setWalletState('select');
// //     setWalletModalOpen(true);
// //   };

// //   const handleCloseModal = () => {
// //     setWalletModalOpen(false);
// //     setWalletState('select');
// //   };

// //   const disconnectWallet = () => {
// //     setAccount('');
// //     setWalletState('select');
// //     setWalletModalOpen(false);
// //     toast('Wallet disconnected', { icon: '🔌' });
// //   };

// //   return (
// //     <>
// //       <AppBar
// //         position="fixed"
// //         elevation={0}
// //         sx={{
// //           bgcolor: backgroundColor,
// //           backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
// //           transition: 'all 0.4s ease',
// //           boxShadow: scrolled ? '0 0 20px rgba(0,0,0,0.4)' : 'none',
// //           px: 5,
// //           zIndex: 1000,
// //         }}
// //       >
// //         <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 3, md: 8 } }}>
// //           <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// //             <Link href="/" style={{ textDecoration: 'none' }}>
// //               <span
// //                 style={{
// //                   background:
// //                     'linear-gradient(90deg, #b78eff 0%, #8c4aff 40%, #4b0082 100%)',
// //                   WebkitBackgroundClip: 'text',
// //                   WebkitTextFillColor: 'transparent',
// //                   fontWeight: 'bold',
// //                 }}
// //               >
// //                 Apollo
// //               </span>
// //               <span style={{ color: '#2da1ff' }}>NFT</span>
// //             </Link>
// //           </Typography>

// //           <Box sx={{ display: 'flex', gap: 3 }}>
// //             {navItems.map((item) => {
// //               const link = `/${item.toLowerCase()}`;
// //               const active = pathname === link;
// //               return (
// //                 <Button
// //                   key={item}
// //                   onClick={() => router.push(link)}
// //                   sx={{
// //                     color: active ? '#8c4aff' : '#fff',
// //                     fontWeight: active ? 700 : 500,
// //                     textTransform: 'none',
// //                     '&:hover': { color: '#8c4aff' },
// //                     transition: 'all 0.3s ease',
// //                   }}
// //                 >
// //                   {item}
// //                 </Button>
// //               );
// //             })}
// //           </Box>

// //           <Button
// //             variant="contained"
// //             sx={{
// //               background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
// //               textTransform: 'none',
// //               borderRadius: '999px',
// //               px: 3,
// //               py: 1,
// //               fontWeight: 'bold',
// //             }}
// //             onClick={handleOpenModal}
// //           >
// //             {account
// //               ? `${account.slice(0, 6)}...${account.slice(-4)}`
// //               : 'Connect Wallet'}
// //           </Button>

// //           <IconButton
// //             color="inherit"
// //             edge="end"
// //             sx={{ display: { md: 'none' } }}
// //             onClick={handleMenu}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           <Menu
// //             anchorEl={anchorEl}
// //             open={Boolean(anchorEl)}
// //             onClose={handleClose}
// //             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //           >
// //             {navItems.map((item) => (
// //               <MenuItem key={item} onClick={handleClose}>
// //                 {item}
// //               </MenuItem>
// //             ))}
// //           </Menu>

// //           {/* Wallet Modal */}
// //           <Modal open={walletModalOpen} onClose={handleCloseModal}>
// //             <Paper sx={styleModal}>
// //               {walletState === 'select' && (
// //                 <>
// //                   <Typography
// //                     variant="h6"
// //                     mb={1}
// //                     sx={{
// //                       fontWeight: 700,
// //                       fontSize: '20px',
// //                       color: '#fff',
// //                     }}
// //                   >
// //                     Connect Wallet
// //                   </Typography>
// //                   <Typography
// //                     variant="body2"
// //                     mb={3}
// //                     sx={{
// //                       opacity: 0.8,
// //                       color: '#cfcde6',
// //                       fontSize: '14px',
// //                     }}
// //                   >
// //                     Discover, collect, and trade unique digital assets. <br />
// //                     To start discovering, buying, selling, and creating NFTs,
// //                     please connect your wallet.
// //                   </Typography>

// //                   <Stack spacing={2}>
// //                     {/* MetaMask */}
// //                     <Button
// //                       onClick={connectWallet}
// //                       sx={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         justifyContent: 'flex-start',
// //                         gap: 1.5,
// //                         backgroundColor: '#2A1C52',
// //                         color: '#fff',
// //                         textTransform: 'none',
// //                         borderRadius: '12px',
// //                         px: 2,
// //                         py: 1.5,
// //                         fontWeight: 600,
// //                         '&:hover': { backgroundColor: '#3a2a73' },
// //                       }}
// //                       fullWidth
// //                     >
// //                       <Image
// //                         src="/icons/metamask.svg"
// //                         alt="metamask"
// //                         width={28}
// //                         height={28}
// //                       />
// //                       MetaMask
// //                     </Button>

// //                     {/* Coinbase */}
// //                     <Button
// //                       disabled
// //                       sx={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         justifyContent: 'flex-start',
// //                         gap: 1.5,
// //                         backgroundColor: '#2A1C52',
// //                         color: '#fff',
// //                         textTransform: 'none',
// //                         borderRadius: '12px',
// //                         px: 2,
// //                         py: 1.5,
// //                         fontWeight: 600,
// //                         opacity: 0.6,
// //                       }}
// //                       fullWidth
// //                     >
// //                       <Image
// //                         src="/icons/coinbase.svg"
// //                         alt="coinbase"
// //                         width={28}
// //                         height={28}
// //                       />
// //                       Coinbase Wallet
// //                     </Button>

// //                     {/* WalletConnect */}
// //                     <Button
// //                       disabled
// //                       sx={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         justifyContent: 'flex-start',
// //                         gap: 1.5,
// //                         backgroundColor: '#2A1C52',
// //                         color: '#fff',
// //                         textTransform: 'none',
// //                         borderRadius: '12px',
// //                         px: 2,
// //                         py: 1.5,
// //                         fontWeight: 600,
// //                         opacity: 0.6,
// //                       }}
// //                       fullWidth
// //                     >
// //                       <Image
// //                         src="/icons/walletconnect.svg"
// //                         alt="walletconnect"
// //                         width={28}
// //                         height={28}
// //                       />
// //                       WalletConnect
// //                     </Button>
// //                   </Stack>

// //                   <Typography
// //                     variant="body2"
// //                     sx={{
// //                       mt: 3,
// //                       color: '#9f9bd2',
// //                       textAlign: 'center',
// //                       fontSize: '13px',
// //                     }}
// //                   >
// //                     Mới sử dụng Web3?{' '}
// //                     <span
// //                       style={{
// //                         color: '#2da1ff',
// //                         textDecoration: 'underline',
// //                         cursor: 'pointer',
// //                       }}
// //                     >
// //                       Tìm hiểu về Ví điện tử
// //                     </span>
// //                   </Typography>

// //                   <Typography
// //                     variant="caption"
// //                     sx={{
// //                       mt: 1,
// //                       display: 'block',
// //                       color: '#6d6a9a',
// //                       fontSize: '12px',
// //                       textAlign: 'center',
// //                     }}
// //                   >
// //                     Bằng cách kết nối ví, bạn đồng ý với{' '}
// //                     <span style={{ color: '#8c4aff' }}>
// //                       Điều khoản Dịch vụ
// //                     </span>{' '}
// //                     của chúng tôi.
// //                   </Typography>
// //                 </>
// //               )}

// //               {walletState === 'connecting' && (
// //                 <>
// //                   <Typography variant="h6" mb={2}>
// //                     Connecting MetaMask...
// //                   </Typography>
// //                   <CircularProgress color="inherit" sx={{ mb: 2 }} />
// //                   <Typography variant="body2" sx={{ opacity: 0.8 }}>
// //                     Please confirm the connection in your MetaMask wallet.
// //                   </Typography>
// //                 </>
// //               )}

// //               {walletState === 'success' && (
// //                 <>
// //                   <CheckCircleIcon
// //                     sx={{ color: '#4CAF50', fontSize: 48, mb: 1 }}
// //                   />
// //                   <Typography variant="h6" mb={1}>
// //                     Connected Successfully
// //                   </Typography>
// //                   <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
// //                     Your wallet is now connected to Apollo NFT.
// //                   </Typography>
// //                   <Button
// //                     variant="contained"
// //                     sx={{
// //                       background:
// //                         'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
// //                     }}
// //                     onClick={handleCloseModal}
// //                   >
// //                     Start Exploring
// //                   </Button>
// //                 </>
// //               )}

// //               {walletState === 'error' && (
// //                 <>
// //                   <ErrorIcon sx={{ color: '#FF5252', fontSize: 48, mb: 1 }} />
// //                   <Typography variant="h6" mb={1}>
// //                     Connection Failed
// //                   </Typography>
// //                   <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
// //                     The connection request was rejected or expired. Please try
// //                     again.
// //                   </Typography>
// //                   <Button
// //                     variant="contained"
// //                     sx={{
// //                       background:
// //                         'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
// //                     }}
// //                     onClick={connectWallet}
// //                   >
// //                     Retry
// //                   </Button>
// //                 </>
// //               )}

// //               {walletState === 'info' && (
// //                 <>
// //                   <Typography variant="h6" mb={2}>
// //                     Wallet Information
// //                   </Typography>
// //                   <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
// //                     Connected with MetaMask
// //                   </Typography>
// //                   <Box
// //                     sx={{
// //                       p: 2,
// //                       borderRadius: '12px',
// //                       bgcolor: '#2D115E',
// //                       wordBreak: 'break-all',
// //                       mb: 2,
// //                     }}
// //                   >
// //                     <Typography variant="body2">Address: {account}</Typography>
// //                   </Box>
// //                   <Stack direction="row" spacing={2} justifyContent="center">
// //                     <Button
// //                       variant="contained"
// //                       sx={{
// //                         background:
// //                           'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
// //                       }}
// //                       onClick={disconnectWallet}
// //                     >
// //                       Disconnect
// //                     </Button>
// //                     <Button
// //                       variant="outlined"
// //                       sx={{
// //                         color: '#fff',
// //                         borderColor: '#fff',
// //                       }}
// //                       onClick={handleCloseModal}
// //                     >
// //                       Close
// //                     </Button>
// //                   </Stack>
// //                 </>
// //               )}
// //             </Paper>
// //           </Modal>
// //         </Toolbar>
// //       </AppBar>

// //       <Toaster
// //         position="top-right"
// //         toastOptions={{
// //           style: { background: '#1A0047', color: '#fff' },
// //           success: { iconTheme: { primary: '#2da1ff', secondary: '#fff' } },
// //           error: { iconTheme: { primary: '#ff3d71', secondary: '#fff' } },
// //         }}
// //       />
// //     </>
// //   );
// // };

// // export default Navbar;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   Button,
//   IconButton,
//   Menu,
//   MenuItem,
//   useMediaQuery,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { Toaster } from 'react-hot-toast';
// import WalletModal from './WalletModal';

// const navItems = ['Drop', 'Marketplace', 'Creator', 'Community'];

// const Navbar: React.FC = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [walletModalOpen, setWalletModalOpen] = useState(false);
//   const [account, setAccount] = useState<string>('');
//   const [scrolled, setScrolled] = useState(false);

//   const router = useRouter();
//   const pathname = usePathname();

//     const isTablet = useMediaQuery('(max-width:900px)');

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const isHome = pathname === '/' || pathname === '/vi' || pathname === '/en';
//   const backgroundColor = isHome
//     ? scrolled
//       ? 'rgba(26, 0, 71, 0.95)'
//       : 'rgba(0, 0, 0, 0)'
//     : 'rgba(26, 0, 71, 0.95)';

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           bgcolor: backgroundColor,
//           backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
//           transition: 'all 0.4s ease',
//           px: 5,
//           zIndex: 1000,
//         }}
//       >
//         <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 3, md: 8 } }}>
//           {/* Logo */}
//           <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//             <Link href="/" style={{ textDecoration: 'none' }}>
//               <span
//                 style={{
//                   background:
//                     'linear-gradient(90deg, #b78eff 0%, #8c4aff 40%, #4b0082 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 Apollo
//               </span>
//               <span style={{ color: '#2da1ff' }}>NFT</span>
//             </Link>
//           </Typography>

//           {/* Navigation */}
//           <Box sx={{ display: 'flex', gap: 3 }}>
//             {navItems.map((item) => {
//               const link = `/${item.toLowerCase()}`;
//               const active = pathname === link;
//               return (
//                 <Button
//                   key={item}
//                   onClick={() => router.push(link)}
//                   sx={{
//                     color: active ? '#8c4aff' : '#fff',
//                     fontWeight: active ? 700 : 500,
//                     textTransform: 'none',
//                     '&:hover': { color: '#8c4aff' },
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   {item}
//                 </Button>
//               );
//             })}
//           </Box>

//           {/* Wallet Button */}
//           {/* <Button
//             variant="contained"
//             sx={{
//               background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
//               textTransform: 'none',
//               borderRadius: '999px',
//               px: 3,
//               py: 1,
//               fontWeight: 'bold',
//             }}
//             onClick={() => setWalletModalOpen(true)}
//           >
//             {account
//               ? `${account.slice(0, 6)}...${account.slice(-4)}`
//               : 'Connect Wallet'}
//           </Button> */}

//           <Button
//       variant="contained"
//       sx={{
//         background: 'linear-gradient(90deg, #8c4aff 0%, #2da1ff 100%)',
//         textTransform: 'none',
//         borderRadius: '999px',
//         px: 3,
//         py: 1,
//         fontWeight: 'bold',
//       }}
//       onClick={() => setWalletModalOpen(true)}
//       // startIcon={isTablet && !account ? <WalletIcon /> : null}
//     >
//       {account
//         ? `${account.slice(0, 6)}...${account.slice(-4)}`
//         : isTablet
//         ? 'Wallet' // Ẩn text khi là tablet
//         : 'Connect Wallet'}
//     </Button>

//           {/* Mobile Menu */}
//           <IconButton
//             color="inherit"
//             edge="end"
//             sx={{ display: { md: 'none' } }}
//             onClick={(e) => setAnchorEl(e.currentTarget)}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={() => setAnchorEl(null)}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//           >
//             {navItems.map((item) => (
//               <MenuItem key={item}>{item}</MenuItem>
//             ))}
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <WalletModal
//         open={walletModalOpen}
//         onClose={() => setWalletModalOpen(false)}
//         account={account}
//         setAccount={setAccount}
//       />

//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: { background: '#1A0047', color: '#fff' },
//           success: { iconTheme: { primary: '#2da1ff', secondary: '#fff' } },
//           error: { iconTheme: { primary: '#ff3d71', secondary: '#fff' } },
//         }}
//       />
//     </>
//   );
// };

// export default Navbar;

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
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const { account: hookAccount } = useWalletAuth(); // your wallet address from hook
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isTablet = useMediaQuery('(max-width:900px)');
  const isMobile = useMediaQuery('(max-width:600px)'); // 👈 thêm xác định mobile

  // Get query params
  const walletMode = searchParams?.get('walletMode');
  const address = searchParams?.get('address');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Dynamic check using hookAccount
  const isHome =
  pathname === '/drop' ||
  pathname === '/community' ||
  pathname === '/view/upcoming' ||
  (pathname === '/creator/creator-detail' &&
    walletMode === 'true' &&
    address?.toLowerCase() === hookAccount?.toLowerCase());

  // Dynamic background
  const backgroundColor = isHome
    ? 'rgba(26, 0, 71, 0.95)' // fixed purple for "home" pages
    : scrolled
      ? 'rgba(26, 0, 71, 0.95)' // purple on scroll for other pages
      : 'rgba(0, 0, 0, 0)'; // transparent when not scrolled

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: backgroundColor,
          backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
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
