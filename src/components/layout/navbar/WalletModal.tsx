// // // 'use client';

// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   Modal,
// // //   Paper,
// // //   Typography,
// // //   Button,
// // //   Box,
// // //   Stack,
// // //   IconButton,
// // // } from '@mui/material';
// // // import CloseIcon from '@mui/icons-material/Close';
// // // import Image from 'next/image';
// // // import { motion } from 'framer-motion';
// // // import toast from 'react-hot-toast';
// // // import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
// // // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // // import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// // // import { useWalletAuth } from '@/hooks/useAuth';
// // // interface EthereumProvider {
// // //   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// // // }

// // // declare global {
// // //   interface Window {
// // //     ethereum?: EthereumProvider;
// // //   }
// // // }

// // // type WalletState =
// // //   | 'select'
// // //   | 'connecting'
// // //   | 'success'
// // //   | 'error'
// // //   | 'info'
// // //   | 'main'
// // //   | 'disconnect';

// // // interface WalletModalProps {
// // //   open: boolean;
// // //   onClose: () => void;
// // //   account: string;
// // //   setAccount: (acc: string) => void;
// // // }

// // // const WalletModal: React.FC<WalletModalProps> = ({
// // //   open,
// // //   onClose,
// // //   account,
// // //   setAccount,
// // // }) => {
// // //   const [walletState, setWalletState] = useState<WalletState>('select');
// // //   const { authenticateWallet, logout, loading } = useWalletAuth(); // ⚡ only hook functions, no account

// // //   const connectWallet = async () => {
// // //     const { ethereum } = window;
// // //     if (!ethereum) {
// // //       toast.error('MetaMask is not installed!');
// // //       return;
// // //     }

// // //     setWalletState('connecting');

// // //     try {
// // //       // Request accounts từ MetaMask
// // //       const accounts = (await ethereum.request({
// // //         method: 'eth_requestAccounts',
// // //       })) as string[];

// // //       if (!accounts || accounts.length === 0) throw new Error('No accounts found');

// // //       const address = accounts[0];

// // //       // Authenticate wallet
// // //       await authenticateWallet(address);

// // //       // Update parent state
// // //       setAccount(address);

// // //       setWalletState('info');
// // //     } catch (error: unknown) {
// // //       console.error(error);
// // //       if (error instanceof Error) toast.error(error.message);
// // //       else toast.error('Connection rejected or failed.');
// // //       setWalletState('select');
// // //     }
// // //   };

// // //   const handleRetry = async () => {
// // //     const { ethereum } = window;
// // //     if (!ethereum) {
// // //       toast.error('MetaMask is not installed!');
// // //       return;
// // //     }
// // //     setWalletState('connecting');
// // //     await connectWallet();
// // //   };

// // //   useEffect(() => {
// // //     if (account) setWalletState('info');
// // //     else setWalletState('select');
// // //   }, [account]);

// // //   useEffect(() => {
// // //     if (walletState === 'disconnect' || walletState === 'main') return;
// // //     if (account) setWalletState('info');
// // //     else setWalletState('select');
// // //   }, [account, open, walletState]);

// // //   return (
// // //     <Modal open={open} onClose={onClose}>
// // //       <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
// // //         <motion.div
// // //           initial={{ scale: 0.9, opacity: 0 }}
// // //           animate={{ scale: 1, opacity: 1 }}
// // //           exit={{ scale: 0.9, opacity: 0 }}
// // //           transition={{ duration: 0.3 }}
// // //         >
// // //           {/* ===================== CONNECT / INFO / DISCONNECT ===================== */}
// // //           <Paper
// // //             className="relative w-[400px] rounded-2xl p-8 text-center text-white shadow-2xl"
// // //             sx={{
// // //               background:
// // //                 walletState === 'disconnect'
// // //                   ? '#fff'
// // //                   : 'linear-gradient(180deg, rgba(29,0,59,1) 0%, rgba(12,4,35,1) 100%)',
// // //               color: walletState === 'disconnect' ? '#1a1a1a' : '#fff',
// // //               border:
// // //                 walletState === 'disconnect'
// // //                   ? 'none'
// // //                   : '1px solid rgba(255,255,255,0.08)',
// // //             }}
// // //           >
// // //             <IconButton
// // //               onClick={onClose}
// // //               sx={{
// // //                 position: 'absolute',
// // //                 top: 12,
// // //                 right: 12,
// // //                 color: walletState === 'disconnect' ? '#555' : '#fff',
// // //                 opacity: 0.7,
// // //                 '&:hover': { opacity: 1 },
// // //               }}
// // //             >
// // //               <CloseIcon />
// // //             </IconButton>

// // //             {/* ===================== SELECT ===================== */}
// // //             {/* {walletState === 'select' && (
// // //               <>
// // //                 <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '20px', mb: 1 }}>
// // //                   Connect Wallet
// // //                 </Typography>
// // //                 <Typography
// // //                   variant="body2"
// // //                   sx={{
// // //                     color: '#bcb9d3',
// // //                     fontSize: '14px',
// // //                     mb: 4,
// // //                   }}
// // //                 >
// // //                   Discover, collect, and trade unique digital assets.
// // //                   <br />
// // //                   Please connect your wallet to get started.
// // //                 </Typography>

// // //                 <Stack spacing={2}>
// // //                   <Button
// // //                     fullWidth
// // //                     onClick={connectWallet}
// // //                     className="flex items-center justify-start gap-3 px-4 py-2 rounded-xl bg-[#1F1639] hover:bg-[#2A1C52] transition"
// // //                   >
// // //                     <Image
// // //                       src="/icons/metamask.svg"
// // //                       alt="metamask"
// // //                       width={28}
// // //                       height={28}
// // //                     />
// // //                     <span className="font-semibold text-white text-base">MetaMask</span>
// // //                   </Button>
// // //                 </Stack>
// // //               </>
// // //             )} */}
// //             // {/* ===================== SELECT STATE ===================== */}
// //             // {walletState === 'select' && (
// //             //   <>
// //             //     <Typography
// //             //       variant="h6"
// //             //       sx={{
// //             //         fontWeight: 700,
// //             //         fontSize: '20px',
// //             //         mb: 1,
// //             //       }}
// //             //     >
// //             //       Connect Wallet
// //             //     </Typography>
// //             //     <Typography
// //             //       variant="body2"
// //             //       sx={{
// //             //         color: '#bcb9d3',
// //             //         fontSize: '14px',
// //             //         mb: 4,
// //             //       }}
// //             //     >
// //             //       Discover, collect, and trade unique digital assets. <br />
// //             //       To start discovering, buying, selling, and creating NFTs,
// //             //       please connect your wallet.
// //             //     </Typography>

// //             //     <Stack spacing={2}>
// //             //       {/* MetaMask */}
// //             //       <Button
// //             //         fullWidth
// //             //         onClick={connectWallet}
// //             //         sx={{
// //             //           display: 'flex',
// //             //           alignItems: 'center',
// //             //           justifyContent: 'flex-start', // căn trái
// //             //           gap: 1.5, // khoảng cách giữa icon và chữ
// //             //           px: 3, // bỏ padding trái/phải
// //             //           py: 1.5,
// //             //           borderRadius: 2,
// //             //           bgcolor: '#1F1639',
// //             //           '&:hover': {
// //             //             bgcolor: '#2A1C52',
// //             //           },
// //             //         }}
// //             //       >
// //             //         <Image
// //             //           src="/icons/metamask.svg"
// //             //           alt="metamask"
// //             //           width={28}
// //             //           height={28}
// //             //         />
// //             //         <span
// //             //           style={{
// //             //             marginLeft: 8,
// //             //             fontWeight: 600,
// //             //             color: '#fff',
// //             //             fontSize: 16,
// //             //           }}
// //             //         >
// //             //           MetaMask
// //             //         </span>
// //             //       </Button>

// //             //       {/* Coinbase Wallet */}
// //             //       <Button
// //             //         fullWidth
// //             //         disabled
// //             //         sx={{
// //             //           display: 'flex',
// //             //           alignItems: 'center',
// //             //           justifyContent: 'flex-start', // căn trái
// //             //           gap: 1.5,
// //             //           px: 3,
// //             //           py: 1.5,
// //             //           borderRadius: 2,
// //             //           bgcolor: '#1a1230',
// //             //           opacity: 0.6,
// //             //           cursor: 'not-allowed',
// //             //           '&:hover': {
// //             //             bgcolor: '#1F1639', // hover không đổi màu khi disabled
// //             //           },
// //             //         }}
// //             //       >
// //             //         <Image
// //             //           src="/icons/coinbase.svg"
// //             //           alt="coinbase"
// //             //           width={28}
// //             //           height={28}
// //             //         />
// //             //         <span
// //             //           style={{
// //             //             marginLeft: 8,
// //             //             fontWeight: 600,
// //             //             color: '#fff',
// //             //             fontSize: 16,
// //             //           }}
// //             //         >
// //             //           Coinbase Wallet
// //             //         </span>
// //             //       </Button>

// //             //       {/* WalletConnect */}
// //             //       <Button
// //             //         fullWidth
// //             //         disabled
// //             //         sx={{
// //             //           display: 'flex',
// //             //           alignItems: 'center',
// //             //           justifyContent: 'flex-start',
// //             //           gap: 1.5,
// //             //           px: 3,
// //             //           py: 1.5,
// //             //           borderRadius: 2,
// //             //           bgcolor: '#1a1230',
// //             //           opacity: 0.6,
// //             //           cursor: 'not-allowed',
// //             //           '&:hover': {
// //             //             bgcolor: '#1F1639',
// //             //           },
// //             //         }}
// //             //       >
// //             //         <Image
// //             //           src="/icons/walletconnect.svg"
// //             //           alt="walletconnect"
// //             //           width={28}
// //             //           height={28}
// //             //         />
// //             //         <span
// //             //           style={{
// //             //             marginLeft: 8,
// //             //             fontWeight: 600,
// //             //             color: '#fff',
// //             //             fontSize: 16,
// //             //           }}
// //             //         >
// //             //           WalletConnect
// //             //         </span>
// //             //       </Button>

// //             //     </Stack>

// //             //     <Typography
// //             //       variant="body2"
// //             //       sx={{
// //             //         mt: 3,
// //             //         color: '#9f9bd2',
// //             //         fontSize: '13px',
// //             //       }}
// //             //     >
// //             //       Mới sử dụng Web3?{' '}
// //             //       <span
// //             //         style={{
// //             //           color: '#2da1ff',
// //             //           textDecoration: 'underline',
// //             //           cursor: 'pointer',
// //             //         }}
// //             //       >
// //             //         Tìm hiểu về Ví điện tử
// //             //       </span>
// //             //     </Typography>

// //             //     <Typography
// //             //       variant="caption"
// //             //       sx={{
// //             //         mt: 1,
// //             //         display: 'block',
// //             //         color: '#6d6a9a',
// //             //         fontSize: '12px',
// //             //       }}
// //             //     >
// //             //       Bằng cách kết nối ví, bạn đồng ý với{' '}
// //             //       <span style={{ color: '#8c4aff' }}>Điều khoản Dịch vụ</span>{' '}
// //             //       của chúng tôi.
// //             //     </Typography>
// //             //   </>
// //             // )}

// //             // {/* ===================== CONNECTING ===================== */}
// //             // {/* {walletState === 'connecting' && (
// //             //   <Box className="flex flex-col items-center justify-center">
// //             //     <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
// //             //       <motion.div
// //             //         className="absolute w-20 h-20 rounded-full border-[6px] border-[#8c4aff]/40 border-t-[#8c4aff]"
// //             //         animate={{ rotate: 360 }}
// //             //         transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
// //             //       />
// //             //       {[0, 1, 2].map((i) => (
// //             //         <motion.div
// //             //           key={i}
// //             //           className="absolute w-20 h-20 rounded-full border-[3px] border-[#8c4aff]/30"
// //             //           initial={{ scale: 0.6, opacity: 0.8 }}
// //             //           animate={{ scale: 1.6, opacity: 0 }}
// //             //           transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
// //             //         />
// //             //       ))}
// //             //       <Image src="/icons/metamask.svg" alt="metamask" width={40} height={40} className="relative z-10" />
// //             //     </div>

// //             //     <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
// //             //       Connecting MetaMask...
// //             //     </Typography>
// //             //     <Typography variant="body2" sx={{ color: '#bcb9d3', fontSize: '14px', mb: 4 }}>
// //             //       Please confirm the connection in MetaMask.
// //             //     </Typography>
// //             //   </Box>
// //             // )} */}

// //             // {walletState === 'connecting' && (
// //             //   <Box className="flex flex-col items-center justify-center">
// //             //     {/* Hiệu ứng nhiều vòng tròn lan tỏa */}
// //             //     <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
// //             //       {/* Vòng xoay chính */}
// //             //       <motion.div
// //             //         className="absolute w-20 h-20 rounded-full border-[6px] border-[#8c4aff]/40 border-t-[#8c4aff]"
// //             //         animate={{ rotate: 360 }}
// //             //         transition={{
// //             //           repeat: Infinity,
// //             //           duration: 2.5,
// //             //           ease: 'linear',
// //             //         }}
// //             //       />
// //             //       {/* Vòng nở lan tỏa */}
// //             //       {[0, 1, 2].map((i) => (
// //             //         <motion.div
// //             //           key={i}
// //             //           className="absolute w-20 h-20 rounded-full border-[3px] border-[#8c4aff]/30"
// //             //           initial={{ scale: 0.6, opacity: 0.8 }}
// //             //           animate={{ scale: 1.6, opacity: 0 }}
// //             //           transition={{
// //             //             duration: 2.5,
// //             //             repeat: Infinity,
// //             //             delay: i * 0.6,
// //             //             ease: 'easeOut',
// //             //           }}
// //             //         />
// //             //       ))}
// //             //       Logo MetaMask
// //             //       <Image
// //             //         src="/icons/metamask.svg"
// //             //         alt="metamask"
// //             //         width={40}
// //             //         height={40}
// //             //         className="relative z-10"
// //             //       />
// //             //     </div>

// //             //     <Typography
// //             //       variant="h6"
// //             //       sx={{
// //             //         fontWeight: 600,
// //             //         mb: 1,
// //             //       }}
// //             //     >
// //             //       Connecting MetaMask...
// //             //     </Typography>
// //             //     <Typography
// //             //       variant="body2"
// //             //       sx={{
// //             //         color: '#bcb9d3',
// //             //         fontSize: '14px',
// //             //         mb: 4,
// //             //         textAlign: 'center',
// //             //       }}
// //             //     >
// //             //       MetaMask is open. Please select an account and press
// //             //       &quot;Connect&quot;.
// //             //     </Typography>

// //             //     <Button
// //             //       disabled
// //             //       startIcon={
// //             //         <span className="w-2 h-2 rounded-full bg-yellow-400" />
// //             //       }
// //             //       sx={{
// //             //         color: '#fff',
// //             //         borderColor: '#fff',
// //             //         textTransform: 'none',
// //             //         fontWeight: 600,
// //             //         backgroundColor: 'rgba(255,255,255,0.1)',
// //             //         borderRadius: '12px',
// //             //         px: 3,
// //             //         py: 1,
// //             //       }}
// //             //     >
// //             //       Waiting for confirmation from MetaMask
// //             //     </Button>
// //             //   </Box>
// //             // )}

// // //             {/* ===================== INFO (CONNECTED SUCCESSFULLY) ===================== */}
// // //             {walletState === 'info' && (
// // //               <>
// // //                 <motion.div
// // //                   initial={{ scale: 0.8, opacity: 0 }}
// // //                   animate={{ scale: 1, opacity: 1 }}
// // //                   transition={{ duration: 0.3 }}
// // //                   className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-500/20 text-green-400"
// // //                 >
// // //                   <CheckCircleIcon sx={{ fontSize: 36 }} />
// // //                 </motion.div>

// // //                 <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
// // //                   Your wallet has been securely connected to <b>Apollo NFT</b>.
// // //                 </Typography>

// // //                 <Box
// // //                   sx={{
// // //                     display: 'flex',
// // //                     alignItems: 'center',
// // //                     gap: 2,
// // //                     background: 'rgba(255,255,255,0.05)',
// // //                     borderRadius: '12px',
// // //                     padding: '16px',
// // //                     mb: 3,
// // //                   }}
// // //                 >
// // //                   <Image
// // //                     src="/icons/avatar.png"
// // //                     alt="avatar"
// // //                     width={40}
// // //                     height={40}
// // //                     className="rounded-full"
// // //                   />
// // //                   <Box textAlign="left" flex={1}>
// // //                     <Typography variant="body2" sx={{ color: '#bcb9d3' }}>
// // //                       Address: {account.slice(0, 6)}...{account.slice(-4)}
// // //                     </Typography>
// // //                     <Typography
// // //                       variant="body2"
// // //                       sx={{ color: '#4BFB9B', fontWeight: 600 }}
// // //                     >
// // //                       Balance: 1.25 ETH
// // //                     </Typography>
// // //                   </Box>
// // //                 </Box>

// // //                 {/* Nút mở main */}
// // //                 <Button
// // //                   onClick={() => setWalletState('main')}
// // //                   fullWidth
// // //                   sx={{
// // //                     mt: 1.5,
// // //                     background: 'rgba(255,255,255,0.08)',
// // //                     borderRadius: '10px',
// // //                     color: '#fff',
// // //                     fontWeight: 600,
// // //                     textTransform: 'none',
// // //                     py: 1.2,
// // //                     '&:hover': { background: 'rgba(255,255,255,0.15)' },
// // //                   }}
// // //                 >
// // //                   Open Main
// // //                 </Button>

// // //                 {/* Nút bắt đầu khám phá (disconnect ở đây giữ nguyên nếu bạn muốn reset sau khi nhấn) */}
// // //                 <Button
// // //                   onClick={() => setWalletState('disconnect')}
// // //                   fullWidth
// // //                   sx={{
// // //                     mt: 1.5,
// // //                     background:
// // //                       'linear-gradient(90deg, #8C4AFF 0%, #2DA1FF 100%)',
// // //                     borderRadius: '10px',
// // //                     color: '#fff',
// // //                     fontWeight: 600,
// // //                     textTransform: 'none',
// // //                     py: 1.2,
// // //                     '&:hover': { opacity: 0.9 },
// // //                   }}
// // //                 >
// // //                   Start Exploring
// // //                 </Button>
// // //               </>
// // //             )}

// // //             {walletState === 'main' && (
// // //               <>
// // //                 <Typography variant="h6" sx={{ mb: 2 }}>
// // //                   Wallet Status
// // //                 </Typography>
// // //                 <Box
// // //                   sx={{
// // //                     display: 'flex',
// // //                     alignItems: 'center',
// // //                     justifyContent: 'space-between',
// // //                     p: 2,
// // //                     borderRadius: '10px',
// // //                     background: '#2a2b3d',
// // //                     mb: 3,
// // //                   }}
// // //                 >
// // //                   <Typography sx={{ color: '#f87171', fontWeight: 500 }}>
// // //                     Disconnected
// // //                   </Typography>
// // //                   <IconButton
// // //                     onClick={() => setWalletState('disconnect')}
// // //                     sx={{
// // //                       background: 'rgba(255, 255, 255, 0.08)',
// // //                       color: '#f87171',
// // //                       '&:hover': { background: 'rgba(255, 255, 255, 0.15)' },
// // //                     }}
// // //                   >
// // //                     <PowerSettingsNewIcon />
// // //                   </IconButton>
// // //                 </Box>

// // //                 <Button
// // //                   fullWidth
// // //                   onClick={connectWallet}
// // //                   sx={{
// // //                     background:
// // //                       'linear-gradient(90deg, #4B6CFB 0%, #9C5CFF 100%)',
// // //                     borderRadius: '10px',
// // //                     color: '#fff',
// // //                     fontWeight: 600,
// // //                     textTransform: 'none',
// // //                     py: 1.2,
// // //                     '&:hover': { opacity: 0.9 },
// // //                   }}
// // //                 >
// // //                   Connect MetaMask Wallet
// // //                 </Button>
// // //               </>
// // //             )}

// // //             {/* ===================== DISCONNECT MODAL ===================== */}
// // //             {walletState === 'disconnect' && (
// // //               <>
// // //                 <motion.div
// // //                   initial={{ scale: 0.8, opacity: 0 }}
// // //                   animate={{ scale: 1, opacity: 1 }}
// // //                   transition={{ duration: 0.3 }}
// // //                   className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-pink-500 text-white"
// // //                 >
// // //                   <WarningAmberRoundedIcon sx={{ fontSize: 36 }} />
// // //                 </motion.div>

// // //                 <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
// // //                   Wallet Disconnected
// // //                 </Typography>
// // //                 <Typography
// // //                   variant="body2"
// // //                   sx={{ color: '#bcb9d3', mb: 4, fontSize: '14px' }}
// // //                 >
// // //                   You have disconnected your wallet. Connect again to continue.
// // //                 </Typography>

// // //                 <Button
// // //                   fullWidth
// // //                   onClick={handleRetry}
// // //                   sx={{
// // //                     background:
// // //                       'linear-gradient(90deg, #4B6CFB 0%, #9C5CFF 100%)',
// // //                     borderRadius: '10px',
// // //                     color: '#fff',
// // //                     fontWeight: 600,
// // //                     textTransform: 'none',
// // //                     fontSize: '15px',
// // //                     py: 1.2,
// // //                     '&:hover': { opacity: 0.9 },
// // //                   }}
// // //                 >
// // //                   Reconnect Wallet
// // //                 </Button>
// // //               </>
// // //             )}
// // //           </Paper>
// // //         </motion.div>
// // //       </Box>
// // //     </Modal>
// // //   );
// // // };

// // // export default WalletModal;

// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Modal,
// //   Paper,
// //   Typography,
// //   Button,
// //   Box,
// //   Stack,
// //   IconButton,
// // } from '@mui/material';
// // import CloseIcon from '@mui/icons-material/Close';
// // import Image from 'next/image';
// // import { motion } from 'framer-motion';
// // import toast from 'react-hot-toast';
// // import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
// // import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// // import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

// // import { useWalletAuth } from '@/hooks/useAuth';

// // interface EthereumProvider {
// //   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// // }

// // declare global {
// //   interface Window {
// //     ethereum?: EthereumProvider;
// //   }
// // }

// // type WalletState =
// //   | 'select'
// //   | 'connecting'
// //   | 'info'
// //   | 'main'
// //   | 'disconnect';

// // interface WalletModalProps {
// //   open: boolean;
// //   onClose: () => void;
// //   account: string;
// //   setAccount: (acc: string) => void;
// // }

// // const WalletModal: React.FC<WalletModalProps> = ({
// //   open,
// //   onClose,
// //   account,
// //   setAccount,
// // }) => {
// //   const [walletState, setWalletState] = useState<WalletState>('select');
// //   const [connectingWalletName, setConnectingWalletName] = useState<string>('');
// //   const { authenticateWallet, logout } = useWalletAuth();

// //   // Khi modal mở, set trạng thái ban đầu dựa vào account
// //   useEffect(() => {
// //     if (!open) return;
// //     if (account) setWalletState('info');
// //     else setWalletState('select');
// //   }, [open]);

// //   const connectWallet = async (wallet: string) => {
// //   try {
// //     setConnectingWalletName(wallet); // lưu tên wallet đang kết nối
// //     setWalletState('connecting');

// //     if (wallet === 'metamask') {
// //       const { ethereum } = window;
// //       if (!ethereum) {
// //         toast.error('MetaMask is not installed!');
// //         setWalletState('select');
// //         return;
// //       }

// //       const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];

// //       if (!accounts || accounts.length === 0) throw new Error('No accounts found');

// //       const address = accounts[0];

// //       await authenticateWallet(address); // gọi API đăng nhập

// //       setAccount(address);
// //       setWalletState('info'); // hoặc 'connected'
// //     } else if (wallet === 'pioneer') {
// //       // logic kết nối Pioneer Wallet
// //       console.log('Connecting Pioneer Wallet...');
// //       setTimeout(() => {
// //         // giả lập kết nối thành công
// //         setWalletState('info');
// //         setAccount('0xPioneerWalletAddress'); // có thể đổi thành address thực
// //       }, 1500);
// //     } else {
// //       toast.error('Wallet not supported');
// //       setWalletState('select');
// //     }
// //   } catch (error: unknown) {
// //     console.error(error);
// //     if (error instanceof Error) toast.error(error.message);
// //     else toast.error('Connection rejected or failed.');
// //     setWalletState('select');
// //   }
// // };

// //   const handleDisconnect = () => {
// //     setWalletState('disconnect');
// //     setAccount('');
// //     logout?.();
// //   };

// //   const handleRetry = async () => {
// //     setWalletState('connecting');
// //     // await connectWallet();
// //   };

// //   return (
// //     <Modal open={open} onClose={onClose}>
// //       <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
// //         <motion.div
// //           initial={{ scale: 0.9, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //           exit={{ scale: 0.9, opacity: 0 }}
// //           transition={{ duration: 0.3 }}
// //         >
// //           <Paper
// //             className="relative w-[400px] rounded-2xl p-8 text-center text-white shadow-2xl"
// //             sx={{
// //               background:
// //                 walletState === 'disconnect'
// //                   ? '#fff'
// //                   : 'linear-gradient(180deg, rgba(29,0,59,1) 0%, rgba(12,4,35,1) 100%)',
// //               color: walletState === 'disconnect' ? '#1a1a1a' : '#fff',
// //               border:
// //                 walletState === 'disconnect'
// //                   ? 'none'
// //                   : '1px solid rgba(255,255,255,0.08)',
// //             }}
// //           >
// //             <IconButton
// //               onClick={onClose}
// //               sx={{
// //                 position: 'absolute',
// //                 top: 12,
// //                 right: 12,
// //                 color: walletState === 'disconnect' ? '#555' : '#fff',
// //                 opacity: 0.7,
// //                 '&:hover': { opacity: 1 },
// //               }}
// //             >
// //               <CloseIcon />
// //             </IconButton>

// //  {/* ===================== SELECT STATE ===================== */}
// // {walletState === 'select' && (
// //   <>
// //     <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '20px', mb: 1 }}>
// //       Connect Wallet
// //     </Typography>
// //     <Typography variant="body2" sx={{ color: '#bcb9d3', fontSize: '14px', mb: 4 }}>
// //       Discover, collect, and trade unique digital assets. <br />
// //       To start discovering, buying, selling, and creating NFTs, please connect your wallet.
// //     </Typography>

// //     <Stack spacing={2}>
// //       {/* MetaMask */}
// //       <Button
// //         fullWidth
// //         onClick={() => connectWallet('metamask')}
// //         sx={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'flex-start',
// //           gap: 1.5,
// //           px: 3,
// //           py: 1.5,
// //           borderRadius: 2,
// //           bgcolor: '#1F1639',
// //           '&:hover': { bgcolor: '#2A1C52' },
// //         }}
// //       >
// //         <Image src="/icons/metamask.svg" alt="metamask" width={28} height={28} />
// //         <span style={{ marginLeft: 8, fontWeight: 600, color: '#fff', fontSize: 16 }}>
// //           MetaMask
// //         </span>
// //       </Button>

// //       {/* Pioneer Wallet */}
// //       <Button
// //         fullWidth
// //         onClick={() => connectWallet('pioneer')}
// //         sx={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'flex-start',
// //           gap: 1.5,
// //           px: 3,
// //           py: 1.5,
// //           borderRadius: 2,
// //           bgcolor: '#1F1639',
// //           '&:hover': { bgcolor: '#2A1C52' },
// //         }}
// //       >
// //         <Image src="/icons/pione.svg" alt="pioneer" width={28} height={28} />
// //         <span style={{ marginLeft: 8, fontWeight: 600, color: '#fff', fontSize: 16 }}>
// //           Pioneer Wallet
// //         </span>
// //       </Button>

// //       {/* Disabled wallets */}
// //       {['coinbase', 'walletconnect'].map((w) => (
// //         <Button
// //           key={w}
// //           fullWidth
// //           disabled
// //           sx={{
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'flex-start',
// //             gap: 1.5,
// //             px: 3,
// //             py: 1.5,
// //             borderRadius: 2,
// //             bgcolor: '#1a1230',
// //             opacity: 0.6,
// //             cursor: 'not-allowed',
// //             '&:hover': { bgcolor: '#1F1639' },
// //           }}
// //         >
// //           <Image src={`/icons/${w}.svg`} alt={w} width={28} height={28} />
// //           <span style={{ marginLeft: 8, fontWeight: 600, color: '#fff', fontSize: 16 }}>
// //             {w.charAt(0).toUpperCase() + w.slice(1)}
// //           </span>
// //         </Button>
// //       ))}
// //     </Stack>

// //     <Typography variant="body2" sx={{ mt: 3, color: '#9f9bd2', fontSize: '13px' }}>
// //       Mới sử dụng Web3?{' '}
// //       <span style={{ color: '#2da1ff', textDecoration: 'underline', cursor: 'pointer' }}>
// //         Tìm hiểu về Ví điện tử
// //       </span>
// //     </Typography>

// //     <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#6d6a9a', fontSize: '12px' }}>
// //       Bằng cách kết nối ví, bạn đồng ý với{' '}
// //       <span style={{ color: '#8c4aff' }}>Điều khoản Dịch vụ</span> của chúng tôi.
// //     </Typography>
// //   </>
// // )}

// // {/* ===================== CONNECTING ===================== */}
// // {walletState === 'connecting' && (
// //   <Box className="flex flex-col items-center justify-center">
// //     <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
// //       <motion.div
// //         className="absolute w-20 h-20 rounded-full border-[6px] border-[#8c4aff]/40 border-t-[#8c4aff]"
// //         animate={{ rotate: 360 }}
// //         transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
// //       />
// //       {[0, 1, 2].map((i) => (
// //         <motion.div
// //           key={i}
// //           className="absolute w-20 h-20 rounded-full border-[3px] border-[#8c4aff]/30"
// //           initial={{ scale: 0.6, opacity: 0.8 }}
// //           animate={{ scale: 1.6, opacity: 0 }}
// //           transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
// //         />
// //       ))}
// //       <Image src="/icons/metamask.svg" alt="metamask" width={40} height={40} className="relative z-10" />
// //     </div>

// //     <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
// //       Connecting {connectingWalletName}...
// //     </Typography>
// //     <Typography variant="body2" sx={{ color: '#bcb9d3', fontSize: '14px', mb: 4, textAlign: 'center' }}>
// //       {connectingWalletName} is open. Please select an account and press &quot;Connect&quot;.
// //     </Typography>

// //     <Button
// //       disabled
// //       startIcon={<span className="w-2 h-2 rounded-full bg-yellow-400" />}
// //       sx={{
// //         color: '#fff',
// //         borderColor: '#fff',
// //         textTransform: 'none',
// //         fontWeight: 600,
// //         backgroundColor: 'rgba(255,255,255,0.1)',
// //         borderRadius: '12px',
// //         px: 3,
// //         py: 1,
// //       }}
// //     >
// //       Waiting for confirmation from {connectingWalletName}
// //     </Button>
// //   </Box>
// // )}

// //             {/* INFO */}
// //             {walletState === 'info' && (
// //               <>
// //                 <motion.div
// //                   initial={{ scale: 0.8, opacity: 0 }}
// //                   animate={{ scale: 1, opacity: 1 }}
// //                   transition={{ duration: 0.3 }}
// //                   className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-500/20 text-green-400"
// //                 >
// //                   <CheckCircleIcon sx={{ fontSize: 36 }} />
// //                 </motion.div>

// //                 <Typography variant="body1" sx={{ color: '#ccc', mb: 3 }}>
// //                   Your wallet has been securely connected.
// //                 </Typography>

// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', mb: 3 }}>
// //                   <Image src="/icons/avatar.png" alt="avatar" width={40} height={40} className="rounded-full" />
// //                   <Box textAlign="left" flex={1}>
// //                     <Typography variant="body2" sx={{ color: '#bcb9d3' }}>
// //                       Address: {account.slice(0, 6)}...{account.slice(-4)}
// //                     </Typography>
// //                     <Typography variant="body2" sx={{ color: '#4BFB9B', fontWeight: 600 }}>
// //                       Balance: 1.25 ETH
// //                     </Typography>
// //                   </Box>
// //                 </Box>

// //                 <Button onClick={() => setWalletState('main')} fullWidth sx={{ mt: 1.5, background: 'rgba(255,255,255,0.08)', borderRadius: '10px', color: '#fff', fontWeight: 600, textTransform: 'none', py: 1.2, '&:hover': { background: 'rgba(255,255,255,0.15)' } }}>
// //                   Open Main
// //                 </Button>
// //                 <Button onClick={handleDisconnect} fullWidth sx={{ mt: 1.5, background: 'linear-gradient(90deg, #8C4AFF 0%, #2DA1FF 100%)', borderRadius: '10px', color: '#fff', fontWeight: 600, textTransform: 'none', py: 1.2, '&:hover': { opacity: 0.9 } }}>
// //                   Start Exploring
// //                 </Button>
// //               </>
// //             )}

// //             {/* MAIN */}
// //             {walletState === 'main' && (
// //               <>
// //                 <Typography variant="h6" sx={{ mb: 2 }}>
// //                   Wallet Status
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: '10px', background: '#2a2b3d', mb: 3 }}>
// //                   <Typography sx={{ color: '#f87171', fontWeight: 500 }}>Disconnected</Typography>
// //                   <IconButton onClick={handleDisconnect} sx={{ background: 'rgba(255, 255, 255, 0.08)', color: '#f87171', '&:hover': { background: 'rgba(255, 255, 255, 0.15)' } }}>
// //                     <PowerSettingsNewIcon />
// //                   </IconButton>
// //                 </Box>
// //                 {/* <Button onClick={connectWallet} fullWidth sx={{ background: 'linear-gradient(90deg, #4B6CFB 0%, #9C5CFF 100%)', borderRadius: '10px', color: '#fff', fontWeight: 600, textTransform: 'none', py: 1.2, '&:hover': { opacity: 0.9 } }}>
// //                   Connect MetaMask Wallet
// //                 </Button> */}
// //               </>
// //             )}

// //             {/* DISCONNECT */}
// //             {walletState === 'disconnect' && (
// //               <>
// //                 <motion.div
// //                   initial={{ scale: 0.8, opacity: 0 }}
// //                   animate={{ scale: 1, opacity: 1 }}
// //                   transition={{ duration: 0.3 }}
// //                   className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-b from-orange-400 to-pink-500 text-white"
// //                 >
// //                   <WarningAmberRoundedIcon sx={{ fontSize: 36 }} />
// //                 </motion.div>

// //                 <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
// //                   Wallet Disconnected
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ color: '#bcb9d3', mb: 4, fontSize: '14px' }}>
// //                   You have disconnected your wallet. Connect again to continue.
// //                 </Typography>

// //                 <Button onClick={handleRetry} fullWidth sx={{ background: 'linear-gradient(90deg, #4B6CFB 0%, #9C5CFF 100%)', borderRadius: '10px', color: '#fff', fontWeight: 600, textTransform: 'none', fontSize: '15px', py: 1.2, '&:hover': { opacity: 0.9 } }}>
// //                   Reconnect Wallet
// //                 </Button>
// //               </>
// //             )}
// //           </Paper>
// //         </motion.div>
// //       </Box>
// //     </Modal>
// //   );
// // };

// // export default WalletModal;

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
// import QRCode from 'qrcode.react';

import dynamic from 'next/dynamic';
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
  const [walletState, setWalletState] = useState<WalletState>('select');
  const [connectingWalletName, setConnectingWalletName] = useState('');
  const [walletListOpen, setWalletListOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState('0');
  const [showPioneQR, setShowPioneQR] = useState(false);
  const [pioneQR, setPioneQR] = useState('');

  const router = useRouter();
  // const { authenticateWallet, logout } = useWalletAuth();

  // const { authenticateWallet, logout: hookLogout, account: hookAccount, loading } =
  //   useWalletAuth();
    
  // const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

  // // useEffect(() => {
  // //   if (!open) return;
  // //   if (account) {
  // //     setWalletState('info');
  // //     getBalance(account).then(setWalletBalance);
  // //   } else {
  // //     setWalletState('select');
  // //   }
  // // }, [open, account]);
  // useEffect(() => {
  //   if (!open) return;

  //   if (hookAccount) {
  //     setWalletState('info');
  //     getBalance(hookAccount).then(setWalletBalance);
  //   } else {
  //     setWalletState('select');
  //   }
  // }, [open, hookAccount]);

  // // const getBalance = async (account: string) => {
  // //   if (!window.ethereum) return '0';
  // //   try {
  // //     const balanceWei = await window.ethereum.request({
  // //       method: 'eth_getBalance',
  // //       params: [account, 'latest'],
  // //     });
  // //     const balanceEth = parseFloat(
  // //       (parseInt(balanceWei as string, 16) / 1e18).toFixed(4),
  // //     );
  // //     return balanceEth.toString();
  // //   } catch (err) {
  // //     console.error('Error fetching balance:', err);
  // //     return '0';
  // //   }
  // // };

  // // const connectWallet = async (wallet: string) => {
  // //   try {
  // //     setConnectingWalletName(wallet);
  // //     setWalletState('connecting');

  // //     if (wallet === 'metamask') {
  // //       const { ethereum } = window;
  // //       if (!ethereum) {
  // //         toast.error('MetaMask is not installed!');
  // //         setWalletState('select');
  // //         return;
  // //       }

  // //       const accounts = (await ethereum.request({
  // //         method: 'eth_requestAccounts',
  // //       })) as string[];
  // //       if (!accounts || accounts.length === 0)
  // //         throw new Error('No accounts found');

  // //       const address = accounts[0];
  // //       await authenticateWallet(address);
  // //       setAccount(address);

  // //       const balance = await getBalance(address);
  // //       setWalletBalance(balance);
  // //       setWalletState('info');
  // //       toast.success('Wallet connected successfully!');
  // //     } else if (wallet === 'pione') {
  // //       const callbackUrl = encodeURIComponent(window.location.href);
  // //       const qrLink = `pione://connect?callback=${callbackUrl}`;
  // //       setPioneQR(qrLink);
  // //       setShowPioneQR(true);
  // //     }
  // //   } catch (error: unknown) {
  // //     console.error(error);
  // //     toast.error(error instanceof Error ? error.message : 'Connection failed');
  // //     setWalletState('select');
  // //   }
  // // };

  // // const handleDisconnect = () => {
  // //   setWalletState('disconnect');
  // //   setAccount('');
  // //   logout?.();
  // // };

  // // const handleExplore = () => {
  // //   onClose();
  // //   router.push(`/creator/creator-detail?walletMode=true&address=${account}`);
  // // };

  // const getBalance = async (account: string) => {
  //   if (!window.ethereum) return '0';
  //   try {
  //     const balanceWei = await window.ethereum.request({
  //       method: 'eth_getBalance',
  //       params: [account, 'latest'],
  //     });
  //     const balanceEth = parseFloat(
  //       (parseInt(balanceWei as string, 16) / 1e18).toFixed(4),
  //     );
  //     return balanceEth.toString();
  //   } catch (err) {
  //     console.error('Error fetching balance:', err);
  //     return '0';
  //   }
  // };

  // const connectWallet = async (wallet: string) => {
  //   try {
  //     setConnectingWalletName(wallet);
  //     setWalletState('connecting');

  //     if (wallet === 'metamask') {
  //       const { ethereum } = window;
  //       if (!ethereum) {
  //         toast.error('MetaMask is not installed!');
  //         setWalletState('select');
  //         return;
  //       }

  //       const accounts = (await ethereum.request({
  //         method: 'eth_requestAccounts',
  //       })) as string[];
  //       if (!accounts || accounts.length === 0) throw new Error('No accounts found');

  //       const address = accounts[0];
  //       await authenticateWallet(address); // 🔥 gọi hook
  //       setAccount(address);

  //       const balance = await getBalance(address);
  //       setWalletBalance(balance);
  //       setWalletState('info');
  //     } else if (wallet === 'pione') {
  //       const callbackUrl = encodeURIComponent(window.location.href);
  //       const qrLink = `pione://connect?callback=${callbackUrl}`;
  //       setPioneQR(qrLink);
  //       setShowPioneQR(true);
  //     }
  //   } catch (error: unknown) {
  //     console.error(error);
  //     toast.error(error instanceof Error ? error.message : 'Connection failed');
  //     setWalletState('select');
  //   }
  // };

  // const handleDisconnect = () => {
  //   setWalletState('disconnect');
  //   setAccount('');
  //   hookLogout();
  //   router.push(`/`)
  // };

  // const handleExplore = () => {
  //   onClose();
  //   router.push(`/creator/creator-detail?walletMode=true&address=${hookAccount}`);
  // };

   const { authenticateWallet, logout, account: hookAccount, loading } = useWalletAuth();
  const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

  // ✅ Update wallet state & balance khi hookAccount thay đổi
  useEffect(() => {
    if (!open) return;
    if (hookAccount) {
      setWalletState('info');
      getBalance(hookAccount).then(setWalletBalance);
    } else {
      setWalletState('select');
    }
  }, [hookAccount, open]);

  // 🔹 Lấy balance
  const getBalance = async (account: string) => {
    if (!window.ethereum) return '0';
    try {
      const balanceWei = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      const balanceEth = parseFloat((parseInt(balanceWei as string, 16) / 1e18).toFixed(4));
      return balanceEth.toString();
    } catch (err) {
      console.error('Error fetching balance:', err);
      return '0';
    }
  };

  // 🔹 Connect wallet (MetaMask / Pione)
  const connectWallet = async (wallet: string) => {
    try {
      setConnectingWalletName(wallet);
      setWalletState('connecting');

      if (wallet === 'metamask') {
        const { ethereum } = window;
        if (!ethereum) {
          toast.error('MetaMask is not installed!');
          setWalletState('select');
          return;
        }

        const accounts = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];
        if (!accounts || accounts.length === 0) throw new Error('No accounts found');

        const address = accounts[0];
        await authenticateWallet(address); // 🔥 gọi hook

        const balance = await getBalance(address);
        setWalletBalance(balance);
        setWalletState('info');
      } else if (wallet === 'pione') {
        const callbackUrl = encodeURIComponent(window.location.href);
        const qrLink = `pione://connect?callback=${callbackUrl}`;
        setPioneQR(qrLink);
        setShowPioneQR(true);
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'Connection failed');
      setWalletState('select');
    }
  };

  const handleDisconnect = () => {
    setWalletState('disconnect');
    logout();
    router.push('/');
  };

  const handleExplore = () => {
    if (hookAccount) {
      router.push(`/creator/creator-detail?walletMode=true&address=${hookAccount}`);
    }
    onClose();
  };


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
                      onClick={() => setWalletListOpen(true)}
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
                <Box className="flex flex-col items-center justify-center">
                  <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
                    <motion.div
                      className="absolute w-20 h-20 rounded-full border-[6px] border-[#8c4aff]/40 border-t-[#8c4aff]"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: 'linear',
                      }}
                    />
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
                    <Image
                      src="/icons/metamask.svg"
                      alt="metamask"
                      width={40}
                      height={40}
                      className="relative z-10"
                    />
                  </div>

                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Connecting {connectingWalletName}...
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
                    {connectingWalletName} is open. Please select an account and
                    press &quot;Connect&quot;.
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
                    Waiting for confirmation from {connectingWalletName}
                  </Button>
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
                      src="/avatars/cyber-avatar.png"
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
                      sx={{
                        mt: 1,
                        color: '#c7baff',
                        fontSize: 13,
                        letterSpacing: 0.3,
                      }}
                    >
                      {account.slice(0, 6)}...{account.slice(-4)}
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
                        Balance: {walletBalance} ETH
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

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import {
//   Modal,
//   Paper,
//   Typography,
//   Button,
//   Box,
//   Stack,
//   IconButton,
//   Divider,
//   Avatar,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
// import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
// import TranslateIcon from '@mui/icons-material/Translate';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/navigation';
// import { useWalletAuth } from '@/hooks/useAuth';

// interface EthereumProvider {
//   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
// }

// declare global {
//   interface Window {
//     ethereum?: EthereumProvider;
//   }
// }

// type WalletState = 'select' | 'connecting' | 'info' | 'disconnect';

// interface WalletModalProps {
//   open: boolean;
//   onClose: () => void;
//   account: string;
//   setAccount: (acc: string) => void;
// }

// const WalletModal: React.FC<WalletModalProps> = ({
//   open,
//   onClose,
//   account,
//   setAccount,
// }) => {
//   const [walletState, setWalletState] = useState<WalletState>('select');
//   const [connectingWalletName, setConnectingWalletName] = useState('');
//   const [walletListOpen, setWalletListOpen] = useState(false);
//   const [walletBalance, setWalletBalance] = useState('0');
//   const [showPioneQR, setShowPioneQR] = useState(false);
//   const [pioneQR, setPioneQR] = useState('');

//   const router = useRouter();
//   const { authenticateWallet, logout } = useWalletAuth();

//   const QRCode = dynamic(() => import('qrcode.react'), { ssr: false });

//   // ------------------------ Persist wallet in cookie ------------------------
//   useEffect(() => {
//     const cookieAccount = Cookies.get('walletAccount');
//     if (cookieAccount) {
//       setAccount(cookieAccount);
//       setWalletState('info');
//       getBalance(cookieAccount).then(setWalletBalance);
//     }
//   }, []);

//   useEffect(() => {
//     if (!open) return;
//     if (account) {
//       setWalletState('info');
//       getBalance(account).then(setWalletBalance);
//     } else {
//       setWalletState('select');
//     }
//   }, [open, account]);

//   // ------------------------ Get ETH balance ------------------------
//   const getBalance = async (account: string) => {
//     if (!window.ethereum) return '0';
//     try {
//       const balanceWei = await window.ethereum.request({
//         method: 'eth_getBalance',
//         params: [account, 'latest'],
//       });
//       const balanceEth = parseFloat(
//         (parseInt(balanceWei as string, 16) / 1e18).toFixed(4)
//       );
//       return balanceEth.toString();
//     } catch (err) {
//       console.error('Error fetching balance:', err);
//       return '0';
//     }
//   };

//   // ------------------------ Connect Wallet ------------------------
//   const connectWallet = async (wallet: string) => {
//     try {
//       setConnectingWalletName(wallet);
//       setWalletState('connecting');

//       if (wallet === 'metamask') {
//         const { ethereum } = window;
//         if (!ethereum) {
//           toast.error('MetaMask is not installed!');
//           setWalletState('select');
//           return;
//         }

//         const accounts = (await ethereum.request({
//           method: 'eth_requestAccounts',
//         })) as string[];
//         if (!accounts || accounts.length === 0)
//           throw new Error('No accounts found');

//         const address = accounts[0];
//         await authenticateWallet(address);
//         setAccount(address);
//         Cookies.set('walletAccount', address, { expires: 7 }); // persist 7 days

//         const balance = await getBalance(address);
//         setWalletBalance(balance);
//         setWalletState('info');
//         toast.success('Wallet connected successfully!');
//       } else if (wallet === 'pione') {
//         const callbackUrl = encodeURIComponent(window.location.href);
//         const qrLink = `pione://connect?callback=${callbackUrl}`;
//         setPioneQR(qrLink);
//         setShowPioneQR(true);
//       }
//     } catch (error: unknown) {
//       console.error(error);
//       toast.error(error instanceof Error ? error.message : 'Connection failed');
//       setWalletState('select');
//     }
//   };

//   // ------------------------ Disconnect Wallet ------------------------
//   const handleDisconnect = () => {
//     setWalletState('disconnect');
//     setAccount('');
//     Cookies.remove('walletAccount'); // remove cookie
//     logout?.();
//   };

//   const handleExplore = () => {
//     onClose();
//     router.push(`/creator/creator-detail?walletMode=true&address=${account}`);
//   };

//   return (
//     <>
//       {/* MAIN MODAL */}
//       <Modal open={open} onClose={onClose}>
//         <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Paper
//               className="relative w-[400px] rounded-2xl p-8 text-center text-white shadow-2xl"
//               sx={{
//                 background:
//                   walletState === 'disconnect'
//                     ? '#fff'
//                     : 'linear-gradient(180deg, rgba(29,0,59,1) 0%, rgba(12,4,35,1) 100%)',
//                 color: walletState === 'disconnect' ? '#1a1a1a' : '#fff',
//                 border:
//                   walletState === 'disconnect'
//                     ? 'none'
//                     : '1px solid rgba(255,255,255,0.08)',
//               }}
//             >
//               <IconButton
//                 onClick={onClose}
//                 sx={{
//                   position: 'absolute',
//                   top: 12,
//                   right: 12,
//                   color: walletState === 'disconnect' ? '#555' : '#fff',
//                   opacity: 0.7,
//                   '&:hover': { opacity: 1 },
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>

//               {/* SELECT */}
//               {walletState === 'select' && (
//                 <>
//                   <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//                     Connect Wallet
//                   </Typography>
//                   <Stack spacing={2}>
//                     <Button onClick={() => connectWallet('metamask')}>
//                       MetaMask
//                     </Button>
//                     <Button onClick={() => connectWallet('pione')}>
//                       Pione Wallet
//                     </Button>
//                     <Button onClick={() => setWalletListOpen(true)}>
//                       All Wallets
//                     </Button>
//                   </Stack>
//                 </>
//               )}

//               {/* PIONE QR */}
//               {showPioneQR && (
//                 <Box mt={4} className="flex flex-col items-center gap-4">
//                   <Typography variant="body2" sx={{ color: '#bcb9d3' }}>
//                     Scan this QR code with your Pione Wallet app
//                   </Typography>
//                   <QRCode value={pioneQR} size={180} />
//                   <Button onClick={() => setShowPioneQR(false)}>Cancel</Button>
//                 </Box>
//               )}

//               {/* CONNECTING */}
//               {walletState === 'connecting' && (
//                 <Box className="flex flex-col items-center justify-center">
//                   <Typography>Connecting {connectingWalletName}...</Typography>
//                 </Box>
//               )}

//               {/* INFO */}
//               {walletState === 'info' && (
//                 <Box className="flex flex-col items-center">
//                   <Avatar
//                     src="/avatars/cyber-avatar.png"
//                     sx={{ width: 80, height: 80 }}
//                   />
//                   <Typography sx={{ mt: 1 }}>
//                     {account.slice(0, 6)}...{account.slice(-4)}
//                   </Typography>
//                   <Typography>Balance: {walletBalance} ETH</Typography>
//                   <Stack direction="row" spacing={2} mt={3}>
//                     <Button onClick={handleExplore}>Explore</Button>
//                     <Button onClick={handleDisconnect}>Disconnect</Button>
//                   </Stack>
//                 </Box>
//               )}

//               {/* DISCONNECT */}
//               {walletState === 'disconnect' && (
//                 <>
//                   <WarningAmberRoundedIcon sx={{ fontSize: 36, mb: 2 }} />
//                   <Typography>Wallet Disconnected</Typography>
//                   <Button onClick={() => setWalletState('select')}>
//                     Reconnect Wallet
//                   </Button>
//                 </>
//               )}
//             </Paper>
//           </motion.div>
//         </Box>
//       </Modal>

//       {/* WALLET LIST MODAL */}
//       <Modal open={walletListOpen} onClose={() => setWalletListOpen(false)}>
//         <Box className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40">
//           <Paper className="w-[350px] p-6 rounded-xl text-white">
//             <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
//               Select Wallet
//             </Typography>
//             <Stack spacing={2}>
//               <Button onClick={() => { connectWallet('metamask'); setWalletListOpen(false); }}>MetaMask</Button>
//               <Button onClick={() => { connectWallet('pione'); setWalletListOpen(false); }}>Pione</Button>
//               <Button disabled>Coinbase</Button>
//               <Button disabled>WalletConnect</Button>
//             </Stack>
//           </Paper>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default WalletModal;
