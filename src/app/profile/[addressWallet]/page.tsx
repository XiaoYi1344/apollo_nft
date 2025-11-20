// // 'use client';

// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Grid,
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Stack,
// //   Avatar,
// //   Tooltip,
// // } from "@mui/material";
// // import { useParams } from "next/navigation";
// // import { useUserProfileByWallet } from "@/hooks/useUser";
// // import { ContentCopy as ContentCopyIcon, Instagram, Twitter } from "@mui/icons-material";
// // import { useToggleFollow } from "@/hooks/useFollow";
// // import { getWallet } from "@/services/LikeFollowService";
// // import SellNFT from "@/components/creator/SellNFT";
// // import { ProductSummary, CollectionSummary } from "@/types/user";

// // type TabType = "owned" | "created";

// // const ProfilePage: React.FC = () => {
// //   const params = useParams<{ addressWallet: string }>();
// //   const addressWallet = params?.addressWallet;

// //   const { data: user, isLoading, isError } = useUserProfileByWallet(addressWallet!);

// //   const [selectedTab, setSelectedTab] = useState<TabType>("created");
// //   const [openBuyModal, setOpenBuyModal] = useState(false);
// //   const [selectedId, setSelectedId] = useState<number | null>(null);
// //   const [selectedPrice, setSelectedPrice] = useState<string>("0");
// //   const [bannerSrc, setBannerSrc] = useState(user?.background || "/creator_detail/banner.jpg");

// //   const { followed, loading: followLoading, toggleFollow } = useToggleFollow(user?.isFollow || false);

// //   useEffect(() => {
// //     if (user?.background) setBannerSrc(user.background);
// //   }, [user?.background]);

// //   const shortenAddress = (addr: string) => (addr ? addr.slice(0, 6) + "..." + addr.slice(-4) : "");

// //   if (isLoading)
// //     return <Typography sx={{ color: "#fff", textAlign: "center", py: 10 }}>Loading...</Typography>;
// //   if (isError || !user)
// //     return <Typography sx={{ color: "#fff", textAlign: "center", py: 10 }}>User not found</Typography>;

// //   const products = selectedTab === "owned" ? user.ownedProducts : user.collectionProducts?.flatMap(c => c.products) || [];
// //   const API_URL = process.env.NEXT_PUBLIC_API;
// //   const avatarUrl = user.avatar ? `${API_URL}/api/upload/${user.avatar}?t=${Date.now()}` : "/avatar-default.png";

// //   return (
// //     <Stack position="relative" sx={{ overflow: "hidden", minHeight: "100vh" }}>
// //       {/* Banner */}
// //       <Box
// //         sx={{
// //           width: "100%",
// //           height: 320,
// //           backgroundImage: `url(${bannerSrc})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           filter: "brightness(0.6)",
// //           zIndex: 12,
// //         }}
// //         onError={() => setBannerSrc("/banner-default.png")}
// //       />

// //       {/* Avatar + Info */}
// //       <Box sx={{ px: 4, mt: -10, position: "relative", zIndex: 14, textAlign: "center" }}>
// //         <Stack direction="row" spacing={4} alignItems="flex-start" sx={{ mt: -8, px: 7, position: "relative" }}>
// //           <Avatar
// //             src={avatarUrl}
// //             onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
// //               (e.currentTarget.src = "/avatar-default.png")
// //             }
// //             sx={{ width: 120, height: 120, border: "5px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 25px rgba(0,0,0,0.5)" }}
// //           />

// //           <Box>
// //             <Typography variant="h5" sx={{ fontWeight: 800, fontSize: "1.7rem", color: "#fff", mr: 50, mt: -1 }}>
// //               {user.fullName}
// //             </Typography>

// //             <Stack direction="row" spacing={1} alignItems="center">
// //               <Typography sx={{ color: "#A0A0C0", fontSize: "1rem" }}>{shortenAddress(user.addressWallet)}</Typography>
// //               <Tooltip title="Copy">
// //                 <ContentCopyIcon
// //                   sx={{ fontSize: 15, color: "#A0A0C0", cursor: "pointer", "&:hover": { color: "#fff" } }}
// //                   onClick={() => navigator.clipboard.writeText(user.addressWallet)}
// //                 />
// //               </Tooltip>
// //             </Stack>

// //             <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
// //               <Button
// //                 variant="contained"
// //                 sx={{
// //                   textTransform: "none",
// //                   background: followed ? "linear-gradient(90deg,#4b5563,#6b7280)" : "linear-gradient(90deg,#7a3bff,#b78eff)",
// //                 }}
// //                 disabled={followLoading || user.addressWallet === getWallet()}
// //                 onClick={() => {
// //                   if (user.addressWallet === getWallet()) {
// //                     alert("Bạn không thể theo dõi chính mình!");
// //                     return;
// //                   }
// //                   toggleFollow({ followingAddressWallet: user.addressWallet });
// //                 }}
// //               >
// //                 {followed ? "Following" : "Follow"}
// //               </Button>

// //               <Button variant="outlined" sx={{ borderColor: "rgba(255,255,255,0.1)", textTransform: "none", color: "#fff" }}>
// //                 Chia sẻ
// //               </Button>

// //               <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
// //                 <Twitter sx={{ color: "#cfcfff", cursor: "pointer" }} />
// //                 <Instagram sx={{ color: "#cfcfff", cursor: "pointer" }} />
// //               </Stack>
// //             </Stack>

// //             <Typography sx={{ color: "#CFCFFF", my: 5, maxWidth: 800, textAlign: "end", ml: -20 }}>{user.bio}</Typography>
// //           </Box>
// //         </Stack>

// //         {/* Stats */}
// //         <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
// //           <Grid>
// //             <Typography sx={{ fontSize: 18, fontWeight: 700 }}>{user.ownedProducts.length}</Typography>
// //             <Typography sx={{ color: "#8a8ab5" }}>Owned</Typography>
// //           </Grid>
// //           <Grid>
// //             <Typography sx={{ fontSize: 18, fontWeight: 700 }}>{user.collectionProducts?.length || 0}</Typography>
// //             <Typography sx={{ color: "#8a8ab5" }}>Collections</Typography>
// //           </Grid>
// //           <Grid>
// //             <Typography sx={{ fontSize: 18, fontWeight: 700 }}>0</Typography>
// //             <Typography sx={{ color: "#8a8ab5" }}>Total Sales</Typography>
// //           </Grid>
// //           <Grid>
// //             <Typography sx={{ fontSize: 18, fontWeight: 700 }}>0.00 ETH</Typography>
// //             <Typography sx={{ color: "#8a8ab5" }}>Volume</Typography>
// //           </Grid>
// //         </Grid>

// //         {/* Tabs */}
// //         <Stack direction="row" justifyContent="center" spacing={4} sx={{ mt: 6 }}>
// //           <Typography
// //             sx={{ cursor: "pointer", color: selectedTab === "owned" ? "#fff" : "#8a8ab5", fontWeight: selectedTab === "owned" ? 700 : 500 }}
// //             onClick={() => setSelectedTab("owned")}
// //           >
// //             Owned
// //           </Typography>
// //           <Typography
// //             sx={{ cursor: "pointer", color: selectedTab === "created" ? "#fff" : "#8a8ab5", fontWeight: selectedTab === "created" ? 700 : 500 }}
// //             onClick={() => setSelectedTab("created")}
// //           >
// //             Created
// //           </Typography>
// //         </Stack>
// //       </Box>

// //       {/* NFT Grid */}
// //       <Grid container spacing={3} sx={{ mt: 3, px: 4, position: "relative", zIndex: 14 }}>
// //         {products.map((product: ProductSummary) => (
// //           <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4}}>
// //             <Card sx={{ bgcolor: "rgba(255,255,255,0.03)", borderRadius: 3, overflow: "hidden", boxShadow: "0 0 20px rgba(0,0,0,0.4)" }}>
// //               <CardMedia
// //                 component="img"
// //                 height="250"
// //                 image={`https://gateway.pinata.cloud/ipfs/${product.image}`}
// //                 alt={product.name}
// //                 sx={{ objectFit: "cover" }}
// //                 loading="lazy"
// //               />
// //               <CardContent>
// //                 <Typography sx={{ color: "#fff", fontWeight: 600 }}>{product.name}</Typography>
// //                 <Typography sx={{ color: "#b78eff", mt: 1 }}>Price: {product.price} ETH</Typography>
// //                 <Typography sx={{ color: "#A0A0C0", mt: 0.5 }}>Likes: {product.likeCount} | {product.isLike ? "Liked" : "Not liked"}</Typography>
// //                 <Button
// //                   fullWidth
// //                   variant="contained"
// //                   sx={{ mt: 2, background: "linear-gradient(90deg,#8b5cf6,#7c3aed)", textTransform: "none", borderRadius: 2 }}
// //                   onClick={() => {
// //                     setSelectedId(product.id);
// //                     setSelectedPrice(String(product.price));
// //                     setOpenBuyModal(true);
// //                   }}
// //                 >
// //                   Buy
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* BUY MODAL */}
// //       {selectedId && <SellNFT open={openBuyModal} onClose={() => setOpenBuyModal(false)} productId={selectedId} defaultPrice={selectedPrice} />}
// //     </Stack>
// //   );
// // };

// // export default ProfilePage;

// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Grid,
// //   Stack,
// //   Tooltip,
// //   CircularProgress,
// //   Tabs,
// //   Tab,
// // } from '@mui/material';
// // import {
// //   ArrowBack,
// //   Instagram,
// //   Twitter,
// //   ContentCopy as ContentCopyIcon,
// // } from '@mui/icons-material';
// // import { useRouter, useParams } from 'next/navigation';
// // import Cookies from 'js-cookie';
// // import { useUserProfileByWallet } from '@/hooks/useUser';
// // import { useQueries } from '@tanstack/react-query';
// // import * as productService from '@/services/productService';
// // import UserHeader from '@/components/creator/UserHeader';
// // import CreatedTab from '@/components/creator/tab/CreatedTab';
// // import OwnedTab from '@/components/creator/tab/OwnedTab';
// // import CollectionTab from '@/components/creator/tab/collection/CollectionTab';
// // import EditNFTModal from '@/components/creator/EditNFTModal';
// // import SellNFT from '@/components/creator/SellNFT';
// // import EditProfileModal from '@/components/creator/EditProfileModal';
// // import { OwnedProduct, ProductActivity } from '@/types/product';
// // import { ProductSummary } from '@/types/user';

// // interface Props {
// //   onBack: () => void;
// // }

// // const CreatorDetail: React.FC<Props> = ({ onBack }) => {
// //   const router = useRouter();
// //   const params = useParams<{ addressWallet: string }>();
// //   const addressWallet = params?.addressWallet;

// //   const [tab, setTab] = useState(0);
// //   const [openEditDialog, setOpenEditDialog] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(
// //     null,
// //   );
// //   const [selectedProductIsMinted, setSelectedProductIsMinted] = useState(false);
// //   const [openSellModal, setOpenSellModal] = useState(false);
// //   const [sellProductId, setSellProductId] = useState<number | null>(null);
// //   const [sellProductPrice, setSellProductPrice] = useState<string>('0');
// //   const [openEditProfile, setOpenEditProfile] = useState(false);

// //   const {
// //     data: user,
// //     isLoading,
// //     isError,
// //     refetch,
// //   } = useUserProfileByWallet(addressWallet!);
// //   const ownedProducts = user?.ownedProducts || [];
// //   const ownedProductsConverted: OwnedProduct[] = ownedProducts.map((p) => ({
// //     id: p.id,
// //     name: p.name,
// //     description: p.description,
// //     image: p.image,
// //     externalLink: p.externalLink,
// //     properties: p.properties.map((prop) => ({
// //       type: prop.type,
// //       name: prop.name,
// //     })),
// //     tokenURI: p.properties[0]?.tokenURI || '', // tokenURI từ property đầu tiên
// //     isFreeze: p.properties[0]?.isFreeze || false,
// //     type: p.type || 'buyNow',
// //     price: p.price,
// //     likeCount: p.likeCount,
// //     isLike: p.isLike,
// //     listingId: p.listingId ?? null,
// //     creator: [], // API ProductSummary không có creator, để mặc định rỗng
// //     collections: [], // nếu muốn map bộ sưu tập
// //   }));

// //   // Activity queries
// //   const activitiesQueries = useQueries({
// //     queries:
// //       ownedProductsConverted?.map((product: OwnedProduct) => ({
// //         queryKey: ['productActivity', product.id],
// //         queryFn: () => productService.getProductActivity(product.id),
// //       })) || [],
// //   });

// //   const allActivities = activitiesQueries.map(
// //     (q) =>
// //       q.data?.map((a) => ({
// //         ...a,
// //         eventType: a.evenType ?? a.evenType,
// //       })) ?? [],
// //   );
// //   const activitiesLoading = activitiesQueries.some((q) => q.isLoading);

// //   // Convert ProductSummary[] => OwnedProduct[]

// //   const shortenAddress = (addr: string) =>
// //     addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';

// //   if (isLoading) return <CircularProgress />;
// //   if (isError || !user) return <Typography>User not found</Typography>;

// //   const stats = [
// //     {
// //       label: 'TOTAL REVENUE',
// //       value: ownedProducts.reduce(
// //         (sum: number, p: ProductSummary) => sum + Number(p.price || 0),
// //         0,
// //       ),
// //     },
// //     { label: 'FOLLOWERS', value: user.followCount },
// //     { label: 'NUMBER OF WORKS', value: ownedProducts.length },
// //     {
// //       label: 'FLOOR PRICE',
// //       value: ownedProducts.length
// //         ? Math.min(
// //             ...ownedProducts.map((p: ProductSummary) => Number(p.price || 0)),
// //           )
// //         : 0,
// //     },
// //   ];

// //   return (
// //     <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
// //       {/* Background */}
// //       <Box
// //         sx={{
// //           position: 'absolute',
// //           inset: 0,
// //           background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
// //           zIndex: 1,
// //           mt: 37.5,
// //           borderTopLeftRadius: 15,
// //           borderTopRightRadius: 15,
// //         }}
// //       />

// //       <Box sx={{ position: 'relative', width: '100%', color: '#fff' }}>
// //         {/* Banner */}
// //         <Box
// //           sx={{
// //             width: '100%',
// //             height: 320,
// //             backgroundSize: 'cover',
// //             backgroundPosition: 'center',
// //             filter: 'brightness(0.6)',
// //             zIndex: 12,
// //           }}
// //         >
// //           <UserHeader
// //             type="banner"
// //             src={
// //               user.background
// //                 ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
// //                 : null
// //             }
// //           />
// //         </Box>

// //         {/* Back button */}
// //         <Button
// //           onClick={onBack}
// //           sx={{
// //             position: 'absolute',
// //             top: 20,
// //             left: 20,
// //             background: 'rgba(0,0,0,0.4)',
// //             color: '#fff',
// //             textTransform: 'none',
// //             borderRadius: 2,
// //             zIndex: 14,
// //             '&:hover': { background: 'rgba(0,0,0,0.6)' },
// //           }}
// //         >
// //           <ArrowBack fontSize="small" sx={{ mr: 1 }} /> Quay lại
// //         </Button>

// //         {/* Info Section */}
// //         <Box sx={{ px: 6, mt: -10, position: 'relative', zIndex: 14 }}>
// //           <Stack
// //             direction="row"
// //             spacing={4}
// //             alignItems="flex-start"
// //             sx={{ mt: -8, px: 7, position: 'relative' }}
// //           >
// //             <UserHeader
// //               type="avatar"
// //               src={
// //                 user.avatar
// //                   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}`
// //                   : null
// //               }
// //               size={120}
// //             />

// //             <Box>
// //               <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff' }}>
// //                 {user.fullName}
// //               </Typography>

// //               <Stack direction="row" spacing={1} alignItems="center">
// //                 <Typography sx={{ color: '#A0A0C0', fontSize: '1rem' }}>
// //                   {shortenAddress(user.addressWallet)}
// //                 </Typography>
// //                 <Tooltip title="Copy Wallet Address">
// //                   <ContentCopyIcon
// //                     sx={{
// //                       fontSize: 15,
// //                       color: '#A0A0C0',
// //                       cursor: 'pointer',
// //                       '&:hover': { color: '#fff' },
// //                     }}
// //                     onClick={() =>
// //                       navigator.clipboard.writeText(user.addressWallet)
// //                     }
// //                   />
// //                 </Tooltip>
// //               </Stack>

// //               <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
// //                 <Button
// //                   variant="contained"
// //                   sx={{
// //                     textTransform: 'none',
// //                     background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
// //                   }}
// //                 >
// //                   Follow
// //                 </Button>
// //                 <Button
// //                   variant="outlined"
// //                   sx={{
// //                     borderColor: 'rgba(255,255,255,0.1)',
// //                     textTransform: 'none',
// //                     color: '#fff',
// //                   }}
// //                 >
// //                   Chia sẻ
// //                 </Button>
// //                 <Button
// //                   variant="outlined"
// //                   sx={{
// //                     borderColor: 'rgba(255,255,255,0.1)',
// //                     textTransform: 'none',
// //                     color: '#fff',
// //                   }}
// //                   onClick={() => setOpenEditProfile(true)}
// //                 >
// //                   Chỉnh sửa Profile
// //                 </Button>
// //                 <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
// //                   <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
// //                   <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
// //                 </Stack>
// //               </Stack>

// //               <Typography
// //                 sx={{ color: '#CFCFFF', my: 5, maxWidth: 800, ml: -25 }}
// //               >
// //                 {user.bio || 'No bio yet.'}
// //               </Typography>
// //             </Box>
// //           </Stack>

// //           {/* Stats */}
// //           <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
// //             {stats.map((stat) => (
// //               <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
// //                 <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
// //                   {stat.value}
// //                 </Typography>
// //                 <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>
// //                   {stat.label}
// //                 </Typography>
// //               </Grid>
// //             ))}
// //           </Grid>

// //           {/* Tabs */}
// //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
// //             <Tabs
// //               value={tab}
// //               onChange={(e, val) => setTab(val)}
// //               textColor="secondary"
// //               indicatorColor="secondary"
// //               sx={{
// //                 flex: 1,
// //                 '& .MuiTab-root': {
// //                   textTransform: 'none',
// //                   fontWeight: 600,
// //                   color: 'rgba(255,255,255,0.7)',
// //                 },
// //                 '& .Mui-selected': { color: 'secondary.main' },
// //               }}
// //             >
// //               <Tab label="Đã tạo" />
// //               <Tab label="Sở hữu" />
// //               <Tab label="Bộ sưu tập" />
// //               <Tab label="Yêu thích" />
// //             </Tabs>
// //             <Button
// //               variant="contained"
// //               sx={{ ml: 2 }}
// //               onClick={() => router.push('/upload')}
// //             >
// //               Tải thêm
// //             </Button>
// //           </Box>

// //           {/* Tab Content */}
// //           {tab === 0 && (
// //             <CreatedTab
// //               ownedProducts={ownedProductsConverted}
// //               allActivities={allActivities}
// //               activitiesLoading={activitiesLoading}
// //               handleOpenEdit={(
// //                 product: OwnedProduct,
// //                 activities: ProductActivity[],
// //               ) => {
// //                 // activities là mảng activity liên quan đến product
// //                 setSelectedProduct(product);
// //                 setSelectedProductIsMinted(activities.length > 0); // nếu có activity thì coi là đã mint
// //                 setOpenEditDialog(true);
// //               }}
// //               openSellModal={(productId: number, price: string) => {
// //                 setSellProductId(productId);
// //                 setSellProductPrice(price);
// //                 setOpenSellModal(true);
// //               }}
// //               walletMode={false}
// //             />
// //           )}
// //           {tab === 1 && (
// //             <OwnedTab
// //               ownedProducts={ownedProductsConverted}
// //               allActivities={allActivities}
// //               activitiesLoading={activitiesLoading}
// //               handleOpenEdit={(
// //                 product: OwnedProduct,
// //                 activities: ProductActivity[],
// //               ) => {
// //                 setSelectedProduct(product);
// //                 setSelectedProductIsMinted(activities.length > 0);
// //                 setOpenEditDialog(true);
// //               }}
// //               openSellModal={(productId: number, price: string) => {
// //                 setSellProductId(productId);
// //                 setSellProductPrice(price);
// //                 setOpenSellModal(true);
// //               }}
// //               walletMode={false}
// //             />
// //           )}
// //           {tab === 2 && (
// //             <CollectionTab
// //               mintedProducts={ownedProductsConverted}
// //               allActivities={allActivities}
// //             />
// //           )}
// //         </Box>
// //       </Box>

// //       {selectedProduct && (
// //         <EditNFTModal
// //           open={openEditDialog}
// //           onClose={() => setOpenEditDialog(false)}
// //           product={selectedProduct}
// //           onUpdate={refetch}
// //           isMinted={selectedProductIsMinted}
// //         />
// //       )}
// //       {sellProductId && (
// //         <SellNFT
// //           open={openSellModal}
// //           onClose={() => setOpenSellModal(false)}
// //           productId={sellProductId}
// //           defaultPrice={sellProductPrice}
// //         />
// //       )}
// //       {openEditProfile && user && (
// //         <EditProfileModal
// //           open={openEditProfile}
// //           onClose={() => setOpenEditProfile(false)}
// //           user={user}
// //         />
// //       )}
// //     </Stack>
// //   );
// // };

// // export default CreatorDetail;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Stack,
//   Tooltip,
//   CircularProgress,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import {
//   ArrowBack,
//   Instagram,
//   Twitter,
//   ContentCopy as ContentCopyIcon,
// } from '@mui/icons-material';
// import { useRouter, useParams } from 'next/navigation';
// import { useQueries } from '@tanstack/react-query';
// import * as productService from '@/services/productService';
// import UserHeader from '@/components/creator/UserHeader';
// import CreatedTab from '@/components/creator/tab/CreatedTab';
// import OwnedTab from '@/components/creator/tab/OwnedTab';
// import CollectionTab from '@/components/creator/tab/collection/CollectionTab';
// import EditNFTModal from '@/components/creator/EditNFTModal';
// import SellNFT from '@/components/creator/SellNFT';
// import EditProfileModal from '@/components/creator/EditProfileModal';
// import { OwnedProduct, ProductActivity } from '@/types/product';
// import { ProductSummary } from '@/types/user';
// import { useUserProfileByWallet } from '@/hooks/useUser';

// interface Props {
//   onBack: () => void;
// }

// const CreatorDetail: React.FC<Props> = ({ onBack }) => {
//   const router = useRouter();
//   const params = useParams<{ addressWallet: string }>();
//   const addressWallet = params?.addressWallet ?? '';

//   // === State ===
//   const [tab, setTab] = useState(0);
//   const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(null);
//   const [selectedProductIsMinted, setSelectedProductIsMinted] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [openSellModal, setOpenSellModal] = useState(false);
//   const [sellProductId, setSellProductId] = useState<number | null>(null);
//   const [sellProductPrice, setSellProductPrice] = useState<string>('0');
//   const [openEditProfile, setOpenEditProfile] = useState(false);

//     const [allActivities, setAllActivities] = useState<ProductActivity[][]>([]);
//   const [activitiesLoading, setActivitiesLoading] = useState(true);
//   // === Hooks ===
//   const { data: user, isLoading, isError, refetch } = useUserProfileByWallet(addressWallet);


//   // === Convert ProductSummary -> OwnedProduct ===
//   const ownedProducts = user?.ownedProducts ?? [];
// // Luôn gọi trước mọi return
// const ownedProductsConverted: OwnedProduct[] = (user?.ownedProducts || []).map((p) => ({
//     id: p.id,
//     name: p.name,
//     description: p.description,
//     image: p.image,
//     externalLink: p.externalLink,
//     properties: p.properties.map((prop) => ({ type: prop.type, name: prop.name })),
//     tokenURI: p.properties[0]?.tokenURI || '',
//     isFreeze: p.properties[0]?.isFreeze || false,
//     type: p.type || 'buyNow',
//     price: p.price,
//     likeCount: p.likeCount,
//     isLike: p.isLike,
//     listingId: p.listingId ?? null,
//     creator: [],
//     collections: [],
//   }));

//   // === Fetch activities with useEffect instead of useQueries ===
//   useEffect(() => {
//     let isMounted = true;

//     const fetchActivities = async () => {
//       setActivitiesLoading(true);
//       try {
//         const results = await Promise.all(
//           ownedProductsConverted.map(async (product) => {
//             const data = await productService.getProductActivity(product.id);
//             return data.map((a) => ({ ...a, eventType: a.evenType }));
//           })
//         );
//         if (isMounted) setAllActivities(results);
//       } catch (error) {
//         console.error(error);
//         if (isMounted) setAllActivities([]);
//       } finally {
//         if (isMounted) setActivitiesLoading(false);
//       }
//     };

//     if (ownedProductsConverted.length > 0) fetchActivities();

//     return () => {
//       isMounted = false;
//     };
//   }, [ownedProductsConverted]);
// // Chỉ sau khi khai báo tất cả hooks mới return JSX
// if (isLoading) return <CircularProgress />;
// if (isError || !user) return <Typography>User not found</Typography>;


// // Lọc các sản phẩm mà ví addressWallet là creator
// const ownedProductsOfUser = ownedProductsConverted.filter(
//   (p) => p.creator.some((c) => c.addressWallet.toLowerCase() === addressWallet.toLowerCase())
// );


//   // === Utils ===
//   const shortenAddress = (addr: string) =>
//     addr ? addr.slice(0, 6) + '...' + addr.slice(-4) : '';

//   const stats = [
//     {
//       label: 'TOTAL REVENUE',
//       value: ownedProducts.reduce((sum: number, p: ProductSummary) => sum + Number(p.price || 0), 0),
//     },
//     { label: 'FOLLOWERS', value: user.followCount },
//     { label: 'NUMBER OF WORKS', value: ownedProducts.length },
//     {
//       label: 'FLOOR PRICE',
//       value: ownedProducts.length
//         ? Math.min(...ownedProducts.map((p: ProductSummary) => Number(p.price || 0)))
//         : 0,
//     },
//   ];

//   return (
//     <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
//       {/* Background */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
//           zIndex: 1,
//           mt: 37.5,
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//         }}
//       />

//       <Box sx={{ position: 'relative', width: '100%', color: '#fff' }}>
//         {/* Banner */}
//         <Box
//           sx={{
//             width: '100%',
//             height: 320,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             filter: 'brightness(0.6)',
//             zIndex: 12,
//           }}
//         >
//           <UserHeader
//             type="banner"
//             src={user.background ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}` : null}
//           />
//         </Box>

//         {/* Back button */}
//         <Button
//           onClick={onBack}
//           sx={{
//             position: 'absolute',
//             top: 20,
//             left: 20,
//             background: 'rgba(0,0,0,0.4)',
//             color: '#fff',
//             textTransform: 'none',
//             borderRadius: 2,
//             zIndex: 14,
//             '&:hover': { background: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowBack fontSize="small" sx={{ mr: 1 }} /> Quay lại
//         </Button>

//         {/* Info Section */}
//         <Box sx={{ px: 6, mt: -10, position: 'relative', zIndex: 14 }}>
//           <Stack direction="row" spacing={4} alignItems="flex-start" sx={{ mt: -8, px: 7, position: 'relative' }}>
//             <UserHeader type="avatar" src={user.avatar ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}` : null} size={120} />
//             <Box>
//               <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff' }}>{user.fullName}</Typography>
//               <Stack direction="row" spacing={1} alignItems="center">
//                 <Typography sx={{ color: '#A0A0C0', fontSize: '1rem' }}>{shortenAddress(user.addressWallet)}</Typography>
//                 <Tooltip title="Copy Wallet Address">
//                   <ContentCopyIcon sx={{ fontSize: 15, color: '#A0A0C0', cursor: 'pointer', '&:hover': { color: '#fff' } }} onClick={() => navigator.clipboard.writeText(user.addressWallet)} />
//                 </Tooltip>
//               </Stack>

//               <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
//                 <Button variant="contained" sx={{ textTransform: 'none', background: 'linear-gradient(90deg,#7a3bff,#b78eff)' }}>Follow</Button>
//                 <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', textTransform: 'none', color: '#fff' }}>Chia sẻ</Button>
//                 <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', textTransform: 'none', color: '#fff' }} onClick={() => setOpenEditProfile(true)}>Chỉnh sửa Profile</Button>
//                 <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                   <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
//                   <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
//                 </Stack>
//               </Stack>

//               <Typography sx={{ color: '#CFCFFF', my: 5, maxWidth: 800, ml: -25 }}>{user.bio || 'No bio yet.'}</Typography>
//             </Box>
//           </Stack>

//           {/* Stats */}
//           <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
//             {stats.map((stat) => (
//               <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
//                 <Typography sx={{ fontSize: 24, fontWeight: 700 }}>{stat.value}</Typography>
//                 <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>{stat.label}</Typography>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Tabs */}
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//             <Tabs value={tab} onChange={(e, val) => setTab(val)} textColor="secondary" indicatorColor="secondary" sx={{ flex: 1, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }, '& .Mui-selected': { color: 'secondary.main' } }}>
//               <Tab label="Đã tạo" />
//               <Tab label="Sở hữu" />
//               <Tab label="Bộ sưu tập" />
//               <Tab label="Yêu thích" />
//             </Tabs>
//             <Button variant="contained" sx={{ ml: 2 }} onClick={() => router.push('/upload')}>Tải thêm</Button>
//           </Box>

//           {/* Tab Content */}
//           {tab === 0 && (
//             <CreatedTab
//               ownedProducts={ownedProductsOfUser}
//               allActivities={allActivities}
//               activitiesLoading={activitiesLoading}
//               handleOpenEdit={(product, activities) => {
//                 setSelectedProduct(product);
//                 setSelectedProductIsMinted(activities.length > 0);
//                 setOpenEditDialog(true);
//               }}
//               openSellModal={(productId, price) => {
//                 setSellProductId(productId);
//                 setSellProductPrice(price);
//                 setOpenSellModal(true);
//               }}
//               walletMode={false}
//             />

            
//           )}
//           {tab === 1 && (
//             <OwnedTab
//               ownedProducts={ownedProductsOfUser}
//               allActivities={allActivities}
//               activitiesLoading={activitiesLoading}
//               handleOpenEdit={(product, activities) => {
//                 setSelectedProduct(product);
//                 setSelectedProductIsMinted(activities.length > 0);
//                 setOpenEditDialog(true);
//               }}
//               openSellModal={(productId, price) => {
//                 setSellProductId(productId);
//                 setSellProductPrice(price);
//                 setOpenSellModal(true);
//               }}
//               walletMode={false}
//             />
//           )}
//           {tab === 2 && (
//             <CollectionTab
//               mintedProducts={ownedProductsOfUser}
//               allActivities={allActivities}
//             />
//           )}
//         </Box>
//       </Box>

//       {/* Modals */}
//       {selectedProduct && (
//         <EditNFTModal
//           open={openEditDialog}
//           onClose={() => setOpenEditDialog(false)}
//           product={selectedProduct}
//           onUpdate={refetch}
//           isMinted={selectedProductIsMinted}
//         />
//       )}
//       {sellProductId && (
//         <SellNFT
//           open={openSellModal}
//           onClose={() => setOpenSellModal(false)}
//           productId={sellProductId}
//           defaultPrice={sellProductPrice}
//         />
//       )}
//       {openEditProfile && user && (
//         <EditProfileModal
//           open={openEditProfile}
//           onClose={() => setOpenEditProfile(false)}
//           user={user}
//         />
//       )}
//     </Stack>
//   );
// };

// export default CreatorDetail;
'use client';

import CreatorDetail from '@/components/creator/CreatorDetail';
import { useRouter, useParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const params = useParams<{ addressWallet: string }>();
  const addressWallet = params?.addressWallet ?? '';

  const handleBack = () => router.push('/profile');

  return (
    <CreatorDetail onBack={handleBack} addressWallet={addressWallet} />
  );
}
