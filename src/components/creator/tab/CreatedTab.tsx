// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Button,
//   CircularProgress,
//   Chip,
//   Tooltip,
//   Typography,
//   Box,
// } from '@mui/material';
// import { OwnedProduct, ProductActivity } from '@/types/product';
// import { ethers } from 'ethers';
// import { getContract } from '@/services/getContract';
// import { toast } from 'react-hot-toast';

// interface Props {
//   ownedProducts: OwnedProduct[];
//   allActivities: ProductActivity[][];
//   activitiesLoading: boolean;
//   walletMode: boolean;
//   handleOpenEdit: (
//     product: OwnedProduct,
//     activities: ProductActivity[],
//   ) => void;
//   // openSellModal: (productId: number, price: string) => void;
//   openSellModal: (product: OwnedProduct) => void;

// }

// const CreatedTab: React.FC<Props> = ({
//   ownedProducts,
//   allActivities,
//   activitiesLoading,
//   walletMode,
//   handleOpenEdit,
//   openSellModal,
// }) => {
//   const [withdrawingMap, setWithdrawingMap] = useState<Record<number, boolean>>(
//     {},
//   );
//   const [pzoBalanceMap, setPzoBalanceMap] = useState<Record<number, string>>(
//     {},
//   );

//   // Giả sử fetch số PZO có thể rút cho từng sản phẩm SOLD
//   useEffect(() => {
//     const fetchBalances = async () => {
//       if (!window.ethereum) return;
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balances: Record<number, string> = {};
//       for (const product of ownedProducts) {
//         if (Number(product.totalInstock) === 0) {
//           try {
//             const balance: ethers.BigNumberish =
//               await marketplace.getPendingPZO(product.id);
//             balances[product.id] = ethers.formatUnits(balance, 18);
//           } catch {
//             balances[product.id] = '0';
//           }
//         }
//       }
//       setPzoBalanceMap(balances);
//     };

//     fetchBalances();
//   }, [ownedProducts]);

//   const handleWithdraw = async (productId: number) => {
//     try {
//       if (!window.ethereum) throw new Error('MetaMask chưa cài đặt');

//       setWithdrawingMap((prev) => ({ ...prev, [productId]: true }));

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balanceRaw: ethers.BigNumberish =
//         await marketplace.getPendingPZO(productId);
//       const balance = ethers.toBigInt(balanceRaw); // chuyển về bigint

//       if (balance === BigInt(0)) throw new Error('Không có PZO để rút');

//       const tx = await marketplace.withdraw(productId);
//       toast.loading(`Đang rút ${ethers.formatUnits(balance, 18)} PZO...`);
//       await tx.wait();

//       toast.dismiss();
//       toast.success(`Rút ${ethers.formatUnits(balance, 18)} PZO thành công!`);

//       setPzoBalanceMap((prev) => ({ ...prev, [productId]: '0' }));
//     } catch (err: unknown) {
//       let message = 'Lỗi không xác định';
//       if (err instanceof Error) message = err.message;
//       toast.error(`Rút PZO thất bại: ${message}`);
//     } finally {
//       setWithdrawingMap((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   return (
//     <Grid container spacing={3} mb={3}>
//       {(Array.isArray(ownedProducts) ? ownedProducts : [])
//     .filter((product, idx) => {
//       const activities = allActivities[idx] ?? [];
//       const isMintedActivity = activities.some((a) => a.evenType === 'Mint');

//       // chỉ hiển thị nếu tokenId > 0
//       const hasValidTokenId =
//         typeof product.tokenId === 'number' && product.tokenId > 0;

//       return isMintedActivity || hasValidTokenId;
//     })
//     .map((product, idx) => {
//       const activities = allActivities[idx] ?? [];
//       const isFrozen = product.isFreeze;

//       return (
//             <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
//               <Card
//                 sx={{
//                   position: 'relative',
//                   bgcolor: 'rgba(255,255,255,0.03)',
//                   borderRadius: 3,
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
//                   },
//                 }}
//               >
//                 {/* SOLD BADGE */}
//                 {Number(product.totalInstock) === 0 && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: 10,
//                       left: 10,
//                       background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
//                       color: '#fff',
//                       px: 1.5,
//                       py: 0.5,
//                       borderRadius: 1,
//                       fontSize: 12,
//                       fontWeight: 'bold',
//                       zIndex: 20,
//                     }}
//                   >
//                     SOLD
//                   </Box>
//                 )}

//                 <CardMedia
//                   component="img"
//                   image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
//                   alt={product.name}
//                   sx={{
//                     height: 280,
//                     objectFit: 'cover',
//                     borderTopLeftRadius: 12,
//                     borderTopRightRadius: 12,
//                   }}
//                   loading="lazy"
//                 />
//                 <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         color: '#fff',
//                         fontWeight: 700,
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                       }}
//                     >
//                       {product.name}
//                     </Typography>
//                   </Stack>

//                   {activitiesLoading ? (
//                     <CircularProgress size={16} sx={{ mt: 1 }} />
//                   ) : (
//                     <Stack
//                       direction="row"
//                       spacing={1}
//                       sx={{ mt: 1, flexWrap: 'wrap' }}
//                     >
//                       <Tooltip title="Sản phẩm đã được mint onchain">
//                         <Chip
//                           label="Minted"
//                           size="small"
//                           sx={{
//                             bgcolor: 'rgba(0,255,127,0.15)',
//                             color: '#00FA9A',
//                             fontWeight: 600,
//                           }}
//                         />
//                       </Tooltip>
//                       {isFrozen && (
//                         <Tooltip title="Metadata của sản phẩm đã bị khóa (freeze)">
//                           <Chip
//                             label="Frozen"
//                             size="small"
//                             sx={{
//                               bgcolor: 'rgba(135,206,250,0.15)',
//                               color: '#1E90FF',
//                               fontWeight: 600,
//                             }}
//                           />
//                         </Tooltip>
//                       )}
//                     </Stack>
//                   )}

//                   <Typography sx={{ color: '#b78eff', mt: 1 }}>
//                     Giá: {product.price ?? 'N/A'}
//                   </Typography>

//                   {walletMode && (
//                     <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         sx={{
//                           background: 'linear-gradient(90deg,#8b5cf6,#7c3aed)',
//                           textTransform: 'none',
//                         }}
//                         // onClick={() =>
//                         //   openSellModal(product.id, product.price ?? '0')
//                         // }
//                         onClick={() => openSellModal(product)}
//                       >
//                         Sell
//                       </Button>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         sx={{
//                           borderColor: '#7a3bff',
//                           color: '#b78eff',
//                           textTransform: 'none',
//                         }}
//                         onClick={() => handleOpenEdit(product, activities)}
//                       >
//                         Update
//                       </Button>

//                       {/* Nút Withdraw chỉ hiện cho SOLD */}
//                       {Number(product.totalInstock) === 0 && (
//                         <Button
//                           size="small"
//                           variant="contained"
//                           color="warning"
//                           sx={{ textTransform: 'none' }}
//                           onClick={() => handleWithdraw(product.id)}
//                           disabled={withdrawingMap[product.id] || false}
//                         >
//                           {withdrawingMap[product.id]
//                             ? 'Đang rút...'
//                             : `Withdraw ${pzoBalanceMap[product.id] ?? '0'} PZO`}
//                         </Button>
//                       )}
//                     </Stack>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//     </Grid>
//   );
// };

// export default CreatedTab;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Button,
//   Chip,
//   Typography,
//   Box,
// } from '@mui/material';
// import { OwnedProduct, ProductActivity, SoldProduct } from '@/types/product';
// import { ethers } from 'ethers';
// import { getContract } from '@/services/getContract';
// import { toast } from 'react-hot-toast';
// import { getAllOwnedProductsWithSold } from '@/services/productService';

// interface Props {
//   ownedProducts: OwnedProduct[];
//   allActivities: ProductActivity[][];
//   activitiesLoading: boolean;
//   walletMode: boolean;
//   handleOpenEdit: (
//     product: OwnedProduct,
//     activities: ProductActivity[],
//   ) => void;
//   openSellModal: (product: OwnedProduct) => void;
// }

// const CreatedTab: React.FC<Props> = ({
//   ownedProducts,
//   allActivities,
//   activitiesLoading,
//   walletMode,
//   handleOpenEdit,
//   openSellModal,
// }) => {
//   const [soldList, setSoldList] = useState<SoldProduct[]>([]);
//   const [withdrawingMap, setWithdrawingMap] = useState<Record<number, boolean>>(
//     {},
//   );
//   const [pzoBalanceMap, setPzoBalanceMap] = useState<Record<number, string>>(
//     {},
//   );
//   function isOwnedProduct(
//     product: OwnedProduct | SoldProduct,
//   ): product is OwnedProduct {
//     return (product as OwnedProduct).totalInstock !== undefined;
//   }

//   // Fetch sold products
//   useEffect(() => {
//     const fetchSold = async () => {
//       try {
//         const { soldProducts } = await getAllOwnedProductsWithSold();
//         setSoldList(soldProducts || []);
//       } catch (err) {
//         console.error('Lấy sold products thất bại', err);
//       }
//     };
//     fetchSold();
//   }, []);

//   // Merge products: tokenId > 0 và tất cả soldProducts
//   const mergedProducts = [
//     ...ownedProducts.filter((p) => p.tokenId !== null && Number(p.tokenId) > 0),
//     ...soldList.filter((sold) => !ownedProducts.some((p) => p.id === sold.id)),
//   ];

//   // Fetch pending PZO
//   useEffect(() => {
//     const fetchBalances = async () => {
//       if (!window.ethereum) return;
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balances: Record<number, string> = {};

//       for (const product of mergedProducts) {
//         if (Number(product.totalInstock) === 0) {
//           try {
//             const balance = await marketplace.getPendingPZO(product.id);
//             balances[product.id] = ethers.formatUnits(balance, 18);
//           } catch {
//             balances[product.id] = '0';
//           }
//         }
//       }

//       setPzoBalanceMap(balances);
//     };

//     fetchBalances();
//   }, [mergedProducts]);

//   const handleWithdraw = async (productId: number) => {
//     try {
//       if (!window.ethereum) throw new Error('MetaMask chưa cài đặt');

//       setWithdrawingMap((prev) => ({ ...prev, [productId]: true }));

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balanceRaw = await marketplace.getPendingPZO(productId);
//       const balance = ethers.toBigInt(balanceRaw);

//       if (balance === BigInt(0)) throw new Error('Không có PZO để rút');

//       const tx = await marketplace.withdraw(productId);

//       toast.loading(`Đang rút ${ethers.formatUnits(balance, 18)} PZO...`);
//       await tx.wait();
//       toast.dismiss();
//       toast.success(`Rút ${ethers.formatUnits(balance, 18)} PZO thành công!`);

//       setPzoBalanceMap((prev) => ({ ...prev, [productId]: '0' }));
//     } catch (err) {
//       toast.error(`Rút thất bại: ${(err as Error).message}`);
//     } finally {
//       setWithdrawingMap((prev) => ({ ...prev, [productId]: false }));
//     }
//   };

//   return (
//     <Grid container spacing={3} mb={3}>
//       {mergedProducts.map((product) => {
//         const idx = ownedProducts.findIndex((p) => p.id === product.id);
//         const activities = allActivities[idx] ?? [];
//         const isFrozen = product.isFreeze;

//         // Check if sold: totalInstock = 0 hoặc có trong soldList
//         const isSold =
//           Number(product.totalInstock) === 0 ||
//           soldList.some((sp) => sp.id === product.id);

//         return (
//           <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
//             <Card
//               sx={{
//                 position: 'relative',
//                 bgcolor: 'rgba(255,255,255,0.03)',
//                 borderRadius: 3,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
//                 },
//               }}
//             >
//               {isSold && (
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 10,
//                     left: 10,
//                     background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
//                     color: '#fff',
//                     px: 1.5,
//                     py: 0.5,
//                     borderRadius: 1,
//                     fontSize: 12,
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   SOLD
//                 </Box>
//               )}

//               <CardMedia
//                 component="img"
//                 image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
//                 alt={product.name}
//                 sx={{
//                   height: 280,
//                   objectFit: 'cover',
//                   borderTopLeftRadius: 12,
//                   borderTopRightRadius: 12,
//                 }}
//               />

//               <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                 <Stack direction="row" justifyContent="space-between">
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ color: '#fff', fontWeight: 700 }}
//                   >
//                     {product.name}
//                   </Typography>
//                 </Stack>

//                 <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                   <Chip
//                     label="Minted"
//                     size="small"
//                     sx={{
//                       bgcolor: 'rgba(0,255,127,0.15)',
//                       color: '#00FA9A',
//                       fontWeight: 600,
//                     }}
//                   />
//                   {isFrozen && (
//                     <Chip
//                       label="Frozen"
//                       size="small"
//                       sx={{
//                         bgcolor: 'rgba(135,206,250,0.15)',
//                         color: '#1E90FF',
//                         fontWeight: 600,
//                       }}
//                     />
//                   )}
//                 </Stack>

//                 <Typography sx={{ color: '#b78eff', mt: 1 }}>
//                   Giá: {product.price ?? 'N/A'}
//                 </Typography>

//                 {walletMode && isOwnedProduct(product) && (
//                   <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       sx={{
//                         background: 'linear-gradient(90deg,#8b5cf6,#7c3aed)',
//                         textTransform: 'none',
//                       }}
//                       onClick={() => openSellModal(product)}
//                     >
//                       Sell
//                     </Button>

//                     <Button
//                       size="small"
//                       variant="outlined"
//                       sx={{
//                         borderColor: '#7a3bff',
//                         color: '#b78eff',
//                         textTransform: 'none',
//                       }}
//                       onClick={() => handleOpenEdit(product, activities)}
//                     >
//                       Update
//                     </Button>

//                     {pzoBalanceMap[product.id] &&
//                       Number(pzoBalanceMap[product.id]) > 0 && (
//                         <Button
//                           size="small"
//                           variant="contained"
//                           color="warning"
//                           sx={{ textTransform: 'none' }}
//                           onClick={() => handleWithdraw(product.id)}
//                           disabled={withdrawingMap[product.id]}
//                         >
//                           {withdrawingMap[product.id]
//                             ? 'Đang rút...'
//                             : `Withdraw ${pzoBalanceMap[product.id]} PZO`}
//                         </Button>
//                       )}
//                   </Stack>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );
// };

// export default CreatedTab;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Button,
//   Chip,
//   Typography,
//   Box,
// } from '@mui/material';
// import { OwnedProduct, ProductActivity, SoldProduct } from '@/types/product';
// import { ethers } from 'ethers';
// import { getContract } from '@/services/getContract';
// import { toast } from 'react-hot-toast';
// import { getAllOwnedProductsWithSold } from '@/services/productService';

// interface Props {
//   ownedProducts: OwnedProduct[];
//   allActivities: ProductActivity[][];
//   activitiesLoading: boolean;
//   walletMode: boolean;
//   handleOpenEdit: (
//     product: OwnedProduct,
//     activities: ProductActivity[],
//   ) => void;
//   openSellModal: (product: OwnedProduct) => void;
// }

// const CreatedTab: React.FC<Props> = ({
//   ownedProducts,
//   allActivities,
//   activitiesLoading,
//   walletMode,
//   handleOpenEdit,
//   openSellModal,
// }) => {
//   const [soldList, setSoldList] = useState<SoldProduct[]>([]);
//   const [withdrawingMap, setWithdrawingMap] = useState<Record<number, boolean>>({});
//   const [pzoBalanceMap, setPzoBalanceMap] = useState<Record<number, string>>({});

//   // Type guard
//   const isOwnedProduct = (product: OwnedProduct | SoldProduct): product is OwnedProduct =>
//     (product as OwnedProduct).totalInstock !== undefined;

//   // Fetch sold products
//   useEffect(() => {
//     const fetchSold = async () => {
//       try {
//         const { soldProducts } = await getAllOwnedProductsWithSold();
//         setSoldList(soldProducts || []);
//       } catch (err) {
//         console.error('Lấy sold products thất bại', err);
//       }
//     };
//     fetchSold();
//   }, []);

//   // Merge owned + sold products
//   const mergedProducts = [
//     ...ownedProducts.filter(p => p.tokenId !== null && Number(p.tokenId) > 0),
//     ...soldList.filter(sold => !ownedProducts.some(p => p.id === sold.id)),
//   ];

//   // Fetch pending PZO per product
//   useEffect(() => {
//     const fetchBalances = async () => {
//       if (!window.ethereum) return;
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balances: Record<number, string> = {};
//       for (const product of mergedProducts) {
//         try {
//           const balanceRaw = await marketplace.getPendingPZO(product.id);
//           balances[product.id] = ethers.formatUnits(balanceRaw, 18);
//         } catch {
//           balances[product.id] = '0';
//         }
//       }
//       setPzoBalanceMap(balances);
//     };

//     fetchBalances();
//   }, [mergedProducts]);

//   // Withdraw PZO for a single product
//   const handleWithdraw = async (productId: number) => {
//     try {
//       if (!window.ethereum) throw new Error('MetaMask chưa cài đặt');

//       setWithdrawingMap(prev => ({ ...prev, [productId]: true }));

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balanceRaw = await marketplace.getPendingPZO(productId);
//       const balance = ethers.formatUnits(balanceRaw, 18);

//       if (Number(balance) === 0) throw new Error('Không có PZO để rút');

//       const tx = await marketplace.withdraw(productId);
//       toast.loading(`Đang rút ${balance} PZO...`);
//       await tx.wait();
//       toast.dismiss();
//       toast.success(`Rút ${balance} PZO thành công!`);

//       // Update balance
//       setPzoBalanceMap(prev => ({ ...prev, [productId]: '0' }));

//       // Refresh soldList or activities if needed
//       const { soldProducts } = await getAllOwnedProductsWithSold();
//       setSoldList(soldProducts || []);

//     } catch (err) {
//       toast.error(`Rút thất bại: ${(err as Error).message}`);
//     } finally {
//       setWithdrawingMap(prev => ({ ...prev, [productId]: false }));
//     }
//   };

//   return (
//     <Grid container spacing={3} mb={3}>
//       {mergedProducts.map(product => {
//         const idx = ownedProducts.findIndex(p => p.id === product.id);
//         const activities = allActivities[idx] ?? [];
//         const isFrozen = product.isFreeze;

//         const isSold = Number(product.totalInstock) === 0 ||
//           soldList.some(sp => sp.id === product.id);

//         return (
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
//             <Card
//               sx={{
//                 position: 'relative',
//                 bgcolor: 'rgba(255,255,255,0.03)',
//                 borderRadius: 3,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
//                 },
//               }}
//             >
//               {isSold && (
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 10,
//                     left: 10,
//                     background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
//                     color: '#fff',
//                     px: 1.5,
//                     py: 0.5,
//                     borderRadius: 1,
//                     fontSize: 12,
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   SOLD
//                 </Box>
//               )}

//               <CardMedia
//                 component="img"
//                 image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
//                 alt={product.name}
//                 sx={{
//                   height: 280,
//                   objectFit: 'cover',
//                   borderTopLeftRadius: 12,
//                   borderTopRightRadius: 12,
//                 }}
//               />

//               <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                 <Stack direction="row" justifyContent="space-between">
//                   <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
//                     {product.name}
//                   </Typography>
//                 </Stack>

//                 <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                   <Chip
//                     label="Minted"
//                     size="small"
//                     sx={{ bgcolor: 'rgba(0,255,127,0.15)', color: '#00FA9A' }}
//                   />
//                   {isFrozen && (
//                     <Chip
//                       label="Frozen"
//                       size="small"
//                       sx={{ bgcolor: 'rgba(135,206,250,0.15)', color: '#1E90FF' }}
//                     />
//                   )}
//                 </Stack>

//                 <Typography sx={{ color: '#b78eff', mt: 1 }}>
//                   Giá: {product.price ?? 'N/A'}
//                 </Typography>

//                 {walletMode && isOwnedProduct(product) && (
//                   <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       onClick={() => openSellModal(product)}
//                     >
//                       Sell
//                     </Button>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       onClick={() => handleOpenEdit(product, activities)}
//                     >
//                       Update
//                     </Button>
//                     {walletMode && isSold && Number(pzoBalanceMap[product.id] || 0) > 0 && (
//   <Button
//     size="small"
//     variant="contained"
//     color="warning"
//     onClick={() => handleWithdraw(product.id)}
//     disabled={withdrawingMap[product.id]}
//   >
//     {withdrawingMap[product.id]
//       ? 'Đang rút...'
//       : `Withdraw ${pzoBalanceMap[product.id]} PZO`}
//   </Button>
// )}

//                   </Stack>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );
// };

// export default CreatedTab;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Button,
//   Chip,
//   Typography,
//   Box,
// } from '@mui/material';
// import { OwnedProduct, ProductActivity, SoldProduct } from '@/types/product';
// import { ethers } from 'ethers';
// import { getContract } from '@/services/getContract';
// import { toast } from 'react-hot-toast';
// import { getAllOwnedProductsWithSold } from '@/services/productService';

// interface Props {
//   ownedProducts: OwnedProduct[];
//   allActivities: ProductActivity[][];
//   activitiesLoading: boolean;
//   walletMode: boolean;
//   handleOpenEdit: (
//     product: OwnedProduct,
//     activities: ProductActivity[],
//   ) => void;
//   openSellModal: (product: OwnedProduct) => void;
// }

// const CreatedTab: React.FC<Props> = ({
//   ownedProducts,
//   allActivities,
//   activitiesLoading,
//   walletMode,
//   handleOpenEdit,
//   openSellModal,
// }) => {
//   const [soldList, setSoldList] = useState<SoldProduct[]>([]);
//   const [withdrawingMap, setWithdrawingMap] = useState<Record<number, boolean>>({});
//   const [pzoBalanceMap, setPzoBalanceMap] = useState<Record<number, string>>({});

//   // Type guard
//   const isOwnedProduct = (product: OwnedProduct | SoldProduct): product is OwnedProduct =>
//     (product as OwnedProduct).totalInstock !== undefined;

//   // Fetch sold products
//   useEffect(() => {
//     const fetchSold = async () => {
//       try {
//         const { soldProducts } = await getAllOwnedProductsWithSold();
//         setSoldList(soldProducts || []);
//       } catch (err) {
//         console.error('Lấy sold products thất bại', err);
//       }
//     };
//     fetchSold();
//   }, []);

//   // Merge owned + sold products
//   const mergedProducts = [
//     ...ownedProducts.filter(p => p.tokenId !== null && Number(p.tokenId) > 0),
//     ...soldList.filter(sold => !ownedProducts.some(p => p.id === sold.id)),
//   ];

//   // Fetch pending PZO per product
//   useEffect(() => {
//     const fetchBalances = async () => {
//       if (!window.ethereum) return;
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balances: Record<number, string> = {};
//       for (const product of mergedProducts) {
//         try {
//           const balanceRaw = await marketplace.getPendingPZO(product.id);
//           balances[product.id] = ethers.formatUnits(balanceRaw, 18);
//         } catch {
//           balances[product.id] = '0';
//         }
//       }
//       setPzoBalanceMap(balances);
//     };

//     fetchBalances();
//   }, [mergedProducts]);

//   // Withdraw PZO for a single product
//   const handleWithdraw = async (productId: number) => {
//     try {
//       if (!window.ethereum) throw new Error('MetaMask chưa cài đặt');

//       setWithdrawingMap(prev => ({ ...prev, [productId]: true }));

//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const marketplace = getContract(signer);

//       const balanceRaw = await marketplace.getPendingPZO(productId);
//       const balance = ethers.formatUnits(balanceRaw, 18);

//       if (Number(balance) === 0) throw new Error('Không có PZO để rút');

//       toast.loading(`Đang rút ${balance} PZO...`);
//       const tx = await marketplace.withdraw(productId);
//       await tx.wait();
//       toast.dismiss();
//       toast.success(`Rút ${balance} PZO thành công!`);

//       // Update balance
//       setPzoBalanceMap(prev => ({ ...prev, [productId]: '0' }));

//       // Refresh soldList
//       const { soldProducts } = await getAllOwnedProductsWithSold();
//       setSoldList(soldProducts || []);

//     } catch (err) {
//       toast.error(`Rút thất bại: ${(err as Error).message}`);
//     } finally {
//       setWithdrawingMap(prev => ({ ...prev, [productId]: false }));
//     }
//   };

//   return (
//     <Grid container spacing={3} mb={3}>
//       {mergedProducts.map(product => {
//         const idx = ownedProducts.findIndex(p => p.id === product.id);
//         const activities = allActivities[idx] ?? [];
//         const isFrozen = product.isFreeze;

//         const isSold = Number(product.totalInstock) === 0 ||
//           soldList.some(sp => sp.id === product.id);

//         return (
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
//             <Card
//               sx={{
//                 position: 'relative',
//                 bgcolor: 'rgba(255,255,255,0.03)',
//                 borderRadius: 3,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
//                 },
//               }}
//             >
//               {isSold && (
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     top: 10,
//                     left: 10,
//                     background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
//                     color: '#fff',
//                     px: 1.5,
//                     py: 0.5,
//                     borderRadius: 1,
//                     fontSize: 12,
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   SOLD
//                 </Box>
//               )}

//               <CardMedia
//                 component="img"
//                 image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
//                 alt={product.name}
//                 sx={{
//                   height: 280,
//                   objectFit: 'cover',
//                   borderTopLeftRadius: 12,
//                   borderTopRightRadius: 12,
//                 }}
//               />

//               <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                 <Stack direction="row" justifyContent="space-between">
//                   <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
//                     {product.name}
//                   </Typography>
//                 </Stack>

//                 <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                   <Chip
//                     label="Minted"
//                     size="small"
//                     sx={{ bgcolor: 'rgba(0,255,127,0.15)', color: '#00FA9A' }}
//                   />
//                   {isFrozen && (
//                     <Chip
//                       label="Frozen"
//                       size="small"
//                       sx={{ bgcolor: 'rgba(135,206,250,0.15)', color: '#1E90FF' }}
//                     />
//                   )}
//                 </Stack>

//                 <Typography sx={{ color: '#b78eff', mt: 1 }}>
//                   Giá: {product.price ?? 'N/A'}
//                 </Typography>

//                 {walletMode && isOwnedProduct(product) && (
//                   <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                     <Button
//                       size="small"
//                       variant="contained"
//                       onClick={() => openSellModal(product)}
//                     >
//                       Sell
//                     </Button>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       onClick={() => handleOpenEdit(product, activities)}
//                     >
//                       Update
//                     </Button>
//                     <Typography sx={{ color: 'yellow' }}>
//   pending: {pzoBalanceMap[product.id]}
// </Typography>

//                     {isSold && Number(pzoBalanceMap[product.id] || 0) > 0 && (
//                       <Button
//                         size="small"
//                         variant="contained"
//                         color="warning"
//                         onClick={() => handleWithdraw(product.id)}
//                         disabled={withdrawingMap[product.id]}
//                       >
//                         {withdrawingMap[product.id]
//                           ? 'Đang rút...'
//                           : `Withdraw ${pzoBalanceMap[product.id]} PZO`}
//                       </Button>
//                     )}
//                   </Stack>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         );
//       })}
//     </Grid>
//   );
// };

// export default CreatedTab;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Button,
//   Chip,
//   Typography,
//   Box,
// } from '@mui/material';
// import { OwnedProduct, ProductActivity, SoldProduct } from '@/types/product';
// import { ethers } from 'ethers';
// import { getContract } from '@/services/marketplaceService';
// import { toast } from 'react-hot-toast';
// import { getAllOwnedProductsWithSold } from '@/services/productService';
// import Link from 'next/link';

// interface Props {
//   ownedProducts: OwnedProduct[];
//   allActivities: ProductActivity[][];
//   activitiesLoading: boolean;
//   walletMode: boolean;
//   handleOpenEdit: (
//     product: OwnedProduct,
//     activities: ProductActivity[],
//   ) => void;
//   openSellModal: (product: OwnedProduct) => void;
// }

// const CreatedTab: React.FC<Props> = ({
//   ownedProducts,
//   allActivities,
//   activitiesLoading,
//   walletMode,
//   handleOpenEdit,
//   openSellModal,
// }) => {
//   const [soldList, setSoldList] = useState<SoldProduct[]>([]);
//   const [withdrawing, setWithdrawing] = useState(false);
//   const [pendingEth, setPendingEth] = useState('0');

//   const isOwnedProduct = (
//     product: OwnedProduct | SoldProduct,
//   ): product is OwnedProduct =>
//     (product as OwnedProduct).totalInstock !== undefined;

//   // Lấy danh sách sản phẩm đã bán từ BE
//   useEffect(() => {
//     const fetchSold = async () => {
//       try {
//         const { soldProducts } = await getAllOwnedProductsWithSold();
//         setSoldList(soldProducts || []);
//       } catch (err) {
//         console.error('Lấy sold products thất bại', err);
//       }
//     };
//     fetchSold();
//   }, []);

//   // Merge owned + sold
//   const mergedProducts = [
//     ...ownedProducts.filter((p) => p.tokenId !== null && Number(p.tokenId) > 0),
//     ...soldList.filter((sold) => !ownedProducts.some((p) => p.id === sold.id)),
//   ];

//   // FE-only: Lấy số ETH đang chờ rút
//   useEffect(() => {
//     const fetchPendingEth = async () => {
//       if (!window.ethereum) return;

//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const marketplace = getContract(signer);
//         const user = await signer.getAddress();

//         const raw = await marketplace.pendingWithdrawals(user);
//         setPendingEth(ethers.formatEther(raw));
//       } catch (err) {
//         console.error('Lấy pending ETH thất bại', err);
//         setPendingEth('0');
//       }
//     };

//     fetchPendingEth();
//   }, [mergedProducts]);

//   // Rút ETH
//   const handleWithdraw = async () => {
//     try {
//       if (!window.ethereum) throw new Error('MetaMask chưa cài đặt');

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
//   };

//   return (
//     <Grid container spacing={3} mb={3}>
//       {mergedProducts.map((product) => {
//         const idx = ownedProducts.findIndex((p) => p.id === product.id);
//         const activities = allActivities[idx] ?? [];
//         const isFrozen = product.isFreeze;
//         if (isOwnedProduct(product)) {
//   const isSold = Number(product.totalInstock) === 0 || soldList.some(sp => sp.id === product.id);
// }

//         return (
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
//             <Card
//               sx={{
//                 position: 'relative',
//                 bgcolor: 'rgba(255,255,255,0.03)',
//                 borderRadius: 3,
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-5px)',
//                   boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
//                 },
//               }}
//             >
//              <Link href={`/marketplace/${product.id}`} style={{ textDecoration: 'none' }}>
//                 {isSold && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: 10,
//                       left: 10,
//                       background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
//                       color: '#fff',
//                       px: 1.5,
//                       py: 0.5,
//                       borderRadius: 1,
//                       fontSize: 12,
//                       fontWeight: 'bold',
//                     }}
//                   >
//                     SOLD
//                   </Box>
//                 )}

//                 <CardMedia
//                   component="img"
//                   image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
//                   alt={product.name}
//                   sx={{
//                     height: 280,
//                     objectFit: 'cover',
//                     borderTopLeftRadius: 12,
//                     borderTopRightRadius: 12,
//                   }}
//                 />

//                 <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                   <Stack direction="row" justifyContent="space-between">
//                     <Typography
//                       variant="subtitle1"
//                       sx={{ color: '#fff', fontWeight: 700 }}
//                     >
//                       {product.name}
//                     </Typography>
//                   </Stack>

//                   <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                     <Chip
//                       label="Minted"
//                       size="small"
//                       sx={{ bgcolor: 'rgba(0,255,127,0.15)', color: '#00FA9A' }}
//                     />
//                     {isFrozen && (
//                       <Chip
//                         label="Frozen"
//                         size="small"
//                         sx={{
//                           bgcolor: 'rgba(135,206,250,0.15)',
//                           color: '#1E90FF',
//                         }}
//                       />
//                     )}
//                   </Stack>

//                   <Typography sx={{ color: '#b78eff', mt: 1 }}>
//                     Giá: {product.price ?? 'N/A'}
//                   </Typography>

//                   {walletMode && isOwnedProduct(product) && (
//                     <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         onClick={() => openSellModal(product)}
//                       >
//                         Sell
//                       </Button>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         onClick={() => handleOpenEdit(product, activities)}
//                       >
//                         Update
//                       </Button>
//                     </Stack>
//                   )}
//                 </CardContent>
//               </Link>
//             </Card>
//           </Grid>
//         );
//       })}

//       {/* Withdraw ETH nút chung ở dưới */}
//       {walletMode && Number(pendingEth) > 0 && (
//         <Box mt={3} width="100%" display="flex" justifyContent="center">
//           <Button
//             variant="contained"
//             color="warning"
//             onClick={handleWithdraw}
//             disabled={withdrawing}
//           >
//             {withdrawing ? 'Đang rút...' : `Withdraw ${pendingEth} ETH`}
//           </Button>
//         </Box>
//       )}
//     </Grid>
//   );
// };

// export default CreatedTab;

'use client';

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Button,
  Chip,
  Typography,
  Box,
} from '@mui/material';
import { OwnedProduct, ProductActivity, SoldProduct } from '@/types/product';
import { ethers } from 'ethers';
import { getContract } from '@/services/marketplaceService';
import { toast } from 'react-hot-toast';
import { getAllOwnedProductsWithSold } from '@/services/productService';
import Link from 'next/link';

interface Props {
  ownedProducts: OwnedProduct[];
  allActivities: ProductActivity[][];
  activitiesLoading: boolean;
  walletMode: boolean;
  handleOpenEdit: (
    product: OwnedProduct,
    activities: ProductActivity[],
  ) => void;
  openSellModal: (product: OwnedProduct) => void;
}

// Type guard for OwnedProduct
const isOwnedProduct = (
  product: OwnedProduct | SoldProduct,
): product is OwnedProduct =>
  (product as OwnedProduct).totalInstock !== undefined;

const CreatedTab: React.FC<Props> = ({
  ownedProducts,
  allActivities,
  activitiesLoading,
  walletMode,
  handleOpenEdit,
  openSellModal,
}) => {
  const [soldList, setSoldList] = useState<SoldProduct[]>([]);
  const [withdrawing, setWithdrawing] = useState(false);
  const [pendingEth, setPendingEth] = useState('0');

  // Fetch sold products
  useEffect(() => {
    const fetchSold = async () => {
      try {
        const { soldProducts } = await getAllOwnedProductsWithSold();
        setSoldList(soldProducts || []);
      } catch (err) {
        console.error('Failed to fetch sold products', err);
      }
    };
    fetchSold();
  }, []);

  // Merge owned + sold products
  const mergedProducts = [
    ...ownedProducts.filter((p) => p.tokenId !== null && Number(p.tokenId) > 0),
    ...soldList.filter((sold) => !ownedProducts.some((p) => p.id === sold.id)),
  ];

  // Fetch pending ETH
  useEffect(() => {
    const fetchPendingEth = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const marketplace = getContract(signer);
        const user = await signer.getAddress();
        const raw = await marketplace.pendingWithdrawals(user);
        setPendingEth(ethers.formatEther(raw));
      } catch (err) {
        console.error('Failed to fetch pending ETH', err);
        setPendingEth('0');
      }
    };
    fetchPendingEth();
  }, [mergedProducts]);

  // Withdraw ETH
  const handleWithdraw = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed');
      setWithdrawing(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const marketplace = getContract(signer);

      toast.loading(`Withdrawing ${pendingEth} ETH...`);
      const tx = await marketplace.withdraw();
      await tx.wait();
      toast.dismiss();
      toast.success(`Successfully withdrawn ${pendingEth} ETH`);
      setPendingEth('0');
    } catch (err) {
      toast.error(`Withdraw failed: ${(err as Error).message}`);
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <Grid container spacing={3} mb={3}>
      {mergedProducts.map((product) => {
        const idx = ownedProducts.findIndex((p) => p.id === product.id);
        const activities = allActivities[idx] ?? [];
        const isFrozen = product.isFreeze;

        // Determine if product is sold
        let isSold = false;
        if (isOwnedProduct(product)) {
          isSold =
            Number(product.totalInstock) === 0 ||
            soldList.some((sp) => sp.id === product.id);
        } else {
          isSold = true; // SoldProduct is always sold
        }

        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
            {/* <Card
              sx={{
                position: 'relative',
                bgcolor: 'rgba(255,255,255,0.03)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                },
              }}
            >
              <Link href={`/marketplace/${product.id}`} style={{ textDecoration: 'none' }}>
                {isSold && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
                      color: '#fff',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    SOLD
                  </Box>
                )}

                <CardMedia
                  component="img"
                  image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                  alt={product.name}
                  sx={{
                    height: 280,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />

                <CardContent sx={{ bgcolor: '#1a1a2e' }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
                      {product.name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label="Minted"
                      size="small"
                      sx={{ bgcolor: 'rgba(0,255,127,0.15)', color: '#00FA9A' }}
                    />
                    {isFrozen && (
                      <Chip
                        label="Frozen"
                        size="small"
                        sx={{ bgcolor: 'rgba(135,206,250,0.15)', color: '#1E90FF' }}
                      />
                    )}
                  </Stack>

                  <Typography sx={{ color: '#b78eff', mt: 1 }}>
                    Giá: {product.price ?? 'N/A'}
                  </Typography>

                  {walletMode && isOwnedProduct(product) && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      <Button
  size="small"
  variant="contained"
  onClick={(e) => {
    e.stopPropagation(); // NGĂN click lan sang Link
    openSellModal(product);
  }}
>
  Sell
</Button>

<Button
  size="small"
  variant="outlined"
  onClick={(e) => {
    e.stopPropagation();
    handleOpenEdit(product, activities);
  }}
>
  Update
</Button>

                    </Stack>
                  )}
                </CardContent>
              </Link>
            </Card> */}
            <Card sx={{ position: 'relative', cursor: 'pointer' }}>
              {isSold && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'linear-gradient(90deg,#ff3b3b,#c40000)',
                    color: '#fff',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                >
                  SOLD
                </Box>
              )}

              {/* CHỈ BỌC ẢNH + TÊN BẰNG LINK */}
              <Link
                href={`/marketplace/${product.id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardMedia
                  component="img"
                  image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
                  alt={product.name}
                  sx={{
                    height: 280,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent sx={{ bgcolor: '#1a1a2e' }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="subtitle1"
                      sx={{ color: '#fff', fontWeight: 700 }}
                    >
                      {product.name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip
                      label="Minted"
                      size="small"
                      sx={{ bgcolor: 'rgba(0,255,127,0.15)', color: '#00FA9A' }}
                    />
                    {isFrozen && (
                      <Chip
                        label="Frozen"
                        size="small"
                        sx={{
                          bgcolor: 'rgba(135,206,250,0.15)',
                          color: '#1E90FF',
                        }}
                      />
                    )}
                  </Stack>

                  <Typography sx={{ color: '#b78eff', mt: 1 }}>
                    Giá: {product.price ?? 'N/A'}
                  </Typography>
                </CardContent>
              </Link>

              {/* Các nút Sell / Update KHÔNG NẰM TRONG LINK */}
              {walletMode && isOwnedProduct(product) && (
                <Stack direction="row" spacing={1} sx={{ px: 2, bgcolor: '#1a1a2e', mt: -1.4, pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => openSellModal(product)}
                  >
                    Sell
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpenEdit(product, activities)}
                  >
                    Update
                  </Button>
                </Stack>
              )}
            </Card>
          </Grid>
        );
      })}

      {walletMode && Number(pendingEth) > 0 && (
        <Box mt={3} width="100%" display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="warning"
            onClick={handleWithdraw}
            disabled={withdrawing}
          >
            {withdrawing ? 'Đang rút...' : `Withdraw ${pendingEth} ETH`}
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default CreatedTab;
