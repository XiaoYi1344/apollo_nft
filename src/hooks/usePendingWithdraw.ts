// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { ethers } from 'ethers';
// import { getContract } from '@/services/marketplaceService';
// import { toast } from 'react-hot-toast';

// export const usePendingWithdraw = () => {
//   const [pendingEth, setPendingEth] = useState('0');
//   const [loading, setLoading] = useState(false);
//   const [withdrawing, setWithdrawing] = useState(false);

//   // Lấy số ETH chờ rút
//   const fetchPending = useCallback(async () => {
//     if (!window.ethereum) return;
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);
//       const user = await signer.getAddress();

//       const raw = await marketplace.pendingWithdrawals(user);
//       setPendingEth(ethers.formatEther(raw));
//     } catch (err) {
//       console.error('Lấy pending ETH thất bại', err);
//       setPendingEth('0');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     setLoading(true);
//     fetchPending();
//   }, [fetchPending]);

//   // Rút ETH
//   const withdraw = useCallback(async () => {
//     if (!window.ethereum) return;
//     try {
//       setWithdrawing(true);
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       toast.loading(`Đang rút ${pendingEth} ETH...`);
//       const tx = await marketplace.withdraw();
//       await tx.wait();
//       toast.dismiss();
//       toast.success(`Rút ${pendingEth} ETH thành công!`);

//       setPendingEth('0');
//     } catch (err) {
//       toast.error(`Rút thất bại: ${(err as Error).message}`);
//     } finally {
//       setWithdrawing(false);
//     }
//   }, [pendingEth]);

//   return { pendingEth, loading, withdrawing, fetchPending, withdraw };
// };
