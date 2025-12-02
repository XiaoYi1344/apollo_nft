// import { ethers } from 'ethers';
// import { useCallback, useState } from 'react';
// import Cookies from 'js-cookie';
// import { useUpdateListing } from '@/hooks/useProduct';
// import { marketplaceService } from '@/services/marketplaceService';

// export const useHandleBuy = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [txHash, setTxHash] = useState<string | null>(null);

//   const updateListing = useUpdateListing();

//   const handleBuy = useCallback(
//     async (nft: { listingId: number; price: number }) => {
//       setLoading(true);
//       setError(null);
//       setTxHash(null);

//       try {
//         // 1️⃣ Lấy signer từ wallet
//         const { ethereum } = window as any;
//         if (!ethereum) throw new Error('MetaMask not installed');

//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const buyerAddress = await signer.getAddress();

//         // 2️⃣ Gọi smart contract buyItem
//         const tx = await marketplaceService.buyItem(
//           signer,
//           nft.listingId,
//           nft.price
//         );

//         if (!tx || !tx.hash) throw new Error('Transaction failed');
//         setTxHash(tx.hash);

//         // 3️⃣ Chờ transaction mined
//         await tx.wait();

//         // 4️⃣ Gọi backend cập nhật listing & buyer
//         const sellerAddress = Cookies.get('account'); // địa chỉ người bán
//         if (!sellerAddress) throw new Error('Seller address not found');

//         await updateListing.mutateAsync({
//           listingId: nft.listingId,
//           quantity: 1,
//           sellerAddress,
//           buyerAddress,
//           finalPrice: nft.price,
//           paymentToken: 'ETH',
//         });

//         // 5️⃣ Thông báo thành công
//         console.log('Buy successful');
//       } catch (err: unknown) {
//         if (err instanceof Error) setError(err.message);
//         else setError('Unknown error');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [updateListing]
//   );

//   return { handleBuy, loading, error, txHash };
// };
