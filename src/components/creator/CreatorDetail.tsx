// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import { Creator } from './data/creatorsData';
// import toast from 'react-hot-toast';
// import { ArrowBack, Instagram, Twitter } from '@mui/icons-material';
// import { useSearchParams } from 'next/navigation';

// interface Props {
//   creator: Creator | null;
//   onBack: () => void;
//   isWalletMode?: boolean; // ✅ thêm prop mới
// }

// const CreatorDetail: React.FC<Props> = ({ creator, onBack, isWalletMode }) => {
//   const [tab, setTab] = useState(0);

//   const searchParams = useSearchParams();
//   const walletMode = isWalletMode ?? searchParams?.get('walletMode') === 'true';

//   if (!creator) return null;

//   const handleExport = () => {
//     if (!creator) return;

//     const csvHeader = [
//       'Name',
//       'Total Revenue',
//       'Followers',
//       'Number of Works',
//       'Floor Price',
//     ];
//     const csvRow = [
//       creator.name,
//       creator.totalVolume,
//       creator.followers,
//       creator.works,
//       creator.floorPrice,
//     ];

//     const csvContent =
//       'data:text/csv;charset=utf-8,' +
//       [csvHeader.join(','), csvRow.join(',')].join('\n');

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.href = encodedUri;
//     link.download = `creator_stats.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // const handleExport = () => {
//   //   const csvHeader = ['Name', 'Total Revenue', 'Followers', 'Number of Works', 'Floor Price'];
//   //   const csvRow = [creator.name, creator.totalVolume, creator.followers, creator.works, creator.floorPrice];
//   //   const csvContent = 'data:text/csv;charset=utf-8,' + [csvHeader.join(','), csvRow.join(',')].join('\n');
//   //   const encodedUri = encodeURI(csvContent);
//   //   const link = document.createElement('a');
//   //   link.href = encodedUri;
//   //   link.download = `creator_stats.csv`;
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // };

//   return (
//     // <Stack position="relative">

//     //   <Box
//     //     component="img"
//     //     src={creator.banner}
//     //     alt="banner"
//     //     sx={{
//     //       width: '100%',
//     //       height: 300,
//     //       objectFit: 'cover',
//     //       filter: 'brightness(0.5)',
//     //       display: 'block',
//     //       zIndex: 10,
//     //     }}
//     //   />

//     // </Stack>

//     <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
//       {/* 👇 Box nền gradient + glow */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0, // top:0; right:0; bottom:0; left:0
//           background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
//           overflow: 'hidden',
//           zIndex: 1, // nằm dưới nội dung
//           mt: 37.5,
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//         }}
//       >
//         <Box
//           className="glow"
//           sx={{
//             '--glow-top': '-1%',
//             '--glow-left': '-20%',
//             '--glow-width': '500px',
//             '--glow-height': '500px',
//             '--glow-radius': '20%',
//             '--glow-color1': 'rgba(214,34,218,0.6)',
//             '--glow-color2': 'rgba(214,34,218,0.4)',
//             '--glow-blur': '100px',
//             '--glow-opacity': '1',
//             transform: 'rotate(200deg)',
//             position: 'absolute',
//             pointerEvents: 'none',
//           }}
//         />
//       </Box>

//       {/* 👇 Toàn bộ nội dung nằm trên nền */}
//       <Box
//         sx={{
//           position: 'relative',
//           zIndex: 10,
//           // px: 7,
//           // pb: 6,
//         }}
//       >
//         {/* 👉 Banner */}
//         <Box
//           component="img"
//           src={creator.banner}
//           alt="banner"
//           sx={{
//             width: '100%',
//             height: 300,
//             objectFit: 'cover',
//             filter: 'brightness(0.5)',

//             display: 'block',
//             zIndex: 10,
//           }}
//         />
//         {/* 👉 Các phần còn lại của bạn */}
//         <Box
//           sx={{
//             px: 7,
//             pb: 6,
//             // zIndex: 3,
//             position: 'relative',
//           }}
//         >
//           <Box
//             sx={{
//               position: 'relative',
//               mb: { xs: 6, md: 10 },
//               mt: { xs: -6, md: -10 },
//             }}
//           >
//             {/* Avatar nổi ra khỏi banner */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: { xs: 130, md: -90 },
//                 left: { xs: '50%', md: 60 },
//                 transform: { xs: 'translateX(-50%)', md: 'none' }, // căn giữa avatar trên mobile
//                 zIndex: 10,
//               }}
//             >
//               <Avatar
//                 src={creator.avatar}
//                 alt={creator.name}
//                 sx={{
//                   width: { xs: 80, md: 96 },
//                   height: { xs: 80, md: 96 },
//                   border: '4px solid rgba(255,255,255,0.12)',
//                   boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
//                 }}
//               />
//             </Box>

//             {/* Thông tin và nút */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 left: { xs: '50%', md: 175 },
//                 bottom: { xs: 40, md: -90 },
//                 transform: { xs: 'translateX(-50%)', md: 'none' },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: { xs: 'center', md: 'flex-start' },
//                 gap: 1.5,
//                 textAlign: { xs: 'center', md: 'left' },
//                 zIndex: 10,
//               }}
//             >
//               {/* Tên và ví */}
//               <Box>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     color: '#fff',
//                     fontWeight: 800,
//                     fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
//                   }}
//                 >
//                   {creator.name}
//                 </Typography>
//                 <Typography
//                   sx={{ color: '#9b9bbf', fontSize: { xs: 12, sm: 13 } }}
//                 >
//                   {creator.username}
//                 </Typography>
//               </Box>

//               {/* Hàng nút + icon */}
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: { xs: 1, sm: 1.5 },
//                   mt: 0.5,
//                   // flexWrap: 'wrap', // cho phép xuống dòng nếu hẹp
//                   justifyContent: { xs: 'center', md: 'flex-start' },
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   sx={{
//                     textTransform: 'none',
//                     background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
//                     fontSize: { xs: 12, sm: 13 },
//                     px: { xs: 2, sm: 2.5 },
//                     py: { xs: 0.4, sm: 0.5 },
//                   }}
//                 >
//                   Follow
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   sx={{
//                     color: '#cfcfff',
//                     borderColor: 'rgba(255,255,255,0.1)',
//                     textTransform: 'none',
//                     fontSize: { xs: 12, sm: 13 },
//                     px: { xs: 2, sm: 2.5 },
//                     py: { xs: 0.4, sm: 0.5 },
//                     whiteSpace: 'nowrap', // 👈 đảm bảo không xuống dòng
//                     minWidth: 'auto', // 👈 cho phép co giãn vừa nội dung
//                   }}
//                 >
//                   Chia sẻ
//                 </Button>

//                 {/* Icon mạng xã hội */}
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 1,
//                     ml: { xs: 0.5, sm: 1 },
//                   }}
//                 >
//                   <Twitter sx={{ color: '#cfcfff' }} />
//                   <Instagram sx={{ color: '#cfcfff' }} />
//                 </Box>
//               </Box>
//             </Box>

//             <Button
//               variant="outlined"
//               onClick={onBack}
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 color: '#cfcfff',
//                 border: 'none',
//                 textTransform: 'none',
//                 fontSize: { xs: 12, sm: 13 },
//                 px: { xs: 2, sm: 2.5 },
//                 py: { xs: 0.4, sm: 0.5 },
//                 ml: { xs: -6, sm: 1, md: -6 },
//                 mt: { xs: 0.5, sm: 0 },
//                 minWidth: 'auto',
//                 zIndex: 10,
//               }}
//             >
//               <ArrowBack fontSize="small" /> Quay lại
//             </Button>
//           </Box>

//           {/* Bio */}
//           <Typography
//             sx={{
//               color: '#cfcfff',
//               mb: { xs: 2, md: 3 },
//               pt: { xs: 3, md: 10 },
//               textAlign: { xs: 'left', md: 'left' },
//               px: { md: 0 },
//               mx: { xs: -3 },
//             }}
//           >
//             {creator.bio}
//           </Typography>

//           {/* Stats */}
//           <Box
//             sx={{
//               display: 'grid',
//               gridTemplateColumns: {
//                 xs: 'repeat(2, 1fr)', // 👈 2 cột trên mobile
//                 sm: 'repeat(4, 1fr)', // 👈 4 cột từ sm trở lên
//               },
//               gap: { xs: 2, sm: 3 },
//               mb: { xs: 3, md: 4 },
//               px: { sm: 6, md: 15 },
//               mx: { xs: -6 },
//               justifyItems: 'center', // căn giữa nội dung trong từng ô
//               textAlign: { xs: 'center', md: 'left' },
//             }}
//           >
//             {[
//               { label: 'TOTAL REVENUE', value: creator.totalVolume },
//               { label: 'FOLLOWERS', value: creator.followers },
//               { label: 'NUMBER OF WORKS', value: creator.works },
//               { label: 'FLOOR PRICE', value: creator.floorPrice },
//             ].map((stat) => (
//               <Box key={stat.label}>
//                 <Typography
//                   sx={{
//                     color: '#9b9bbf',
//                     fontWeight: 700,
//                     fontSize: { xs: 14, md: 16 },
//                   }}
//                 >
//                   {stat.value}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: '#9b9bbf',
//                     fontSize: { xs: 11, md: 12 },
//                   }}
//                 >
//                   {stat.label}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>

//           {/* Button giữa màn hình */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '100%',
//               my: 4,
//               px: { xs: 2, md: 0 },
//             }}
//           >
//             <Button
//               variant="text"
//               onClick={handleExport}
//               sx={{
//                 color: '#fff',
//                 textTransform: 'none',
//                 fontSize: { xs: 13, sm: 14 },
//                 '&:hover': { color: '#b78eff' },
//               }}
//             >
//               Xuất sang Trang tính
//             </Button>
//           </Box>

//           <Box sx={{ mt: 6, mb: 4, px: { xs: 1, md: 0 } }}>
//             <Tabs
//               value={tab}
//               onChange={(e, val) => setTab(val)}
//               sx={{
//                 '.MuiTab-root': {
//                   color: '#9b9bbf',
//                   textTransform: 'none',
//                   fontWeight: 600,
//                 },
//                 '.Mui-selected': { color: '#fff' },
//                 '.MuiTabs-indicator': { background: '#9b5cff' },
//               }}
//             >
//               <Tab label="Đã tạo" />
//               <Tab label="Sở hữu" />
//               <Tab label="Bộ sưu tập" />
//               <Tab label="Yêu thích" />
//             </Tabs>
//           </Box>

//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             {(tab === 0 ? creator.items : []).map((it) => (
//               <Grid size={{ xs: 12, sm: 6, md: 3 }} key={it.id}>
//                 <Card
//                   sx={{
//                     bgcolor: 'rgba(255,255,255,0.03)',
//                     borderRadius: 3,
//                     overflow: 'hidden',
//                     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                     '&:hover': {
//                       transform: 'translateY(-6px)',
//                       boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
//                     },
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     image={it.img}
//                     alt={it.title}
//                     sx={{
//                       height: 300,
//                       objectFit: 'cover',
//                     }}
//                   />
//                   <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{ color: '#fff', fontWeight: 700 }}
//                     >
//                       {it.title}
//                     </Typography>
//                     <Typography
//                       component="div"
//                       sx={{
//                         fontSize: 15,
//                         color: '#fff',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 1,
//                       }}
//                     >
//                       Giá:{' '}
//                       <Typography
//                         component="span"
//                         sx={{ color: '#b78eff', ml: 0.5, fontWeight: 600 }}
//                       >
//                         {it.price}
//                       </Typography>
//                       {isWalletMode ? (
//                         <>
//                           <Button
//                             size="small"
//                             variant="contained"
//                             onClick={() =>
//                               toast.success('Sản phẩm đã được rao bán')
//                             }
//                             sx={{
//                               textTransform: 'none',
//                               fontSize: 13,
//                               ml: 3,
//                               borderRadius: 2,
//                               background: '#05F509',
//                               boxShadow: 'none',
//                               '&:hover': { opacity: 0.9 },
//                               color: '#FFF',
//                             }}
//                           >
//                             Sell
//                           </Button>
//                           <Button
//                             size="small"
//                             variant="contained"
//                             onClick={() =>
//                               toast.success('Sản phẩm đã được rao bán')
//                             }
//                             sx={{
//                               textTransform: 'none',
//                               fontSize: 13,

//                               borderRadius: 2,
//                               background: '#05F500',
//                               boxShadow: 'none',
//                               '&:hover': { opacity: 0.9 },
//                               color: '#000',
//                             }}
//                           >
//                             Aution
//                           </Button>
//                         </>
//                       ) : (
//                         <Button
//                           size="small"
//                           variant="contained"
//                           onClick={() => toast.success('Đã thêm vào giỏ hàng')}
//                           sx={{
//                             textTransform: 'none',
//                             fontSize: 13,
//                             ml: -1,
//                             borderRadius: 2,
//                             background: 'transparent',
//                             boxShadow: 'none',
//                             '&:hover': { opacity: 0.9 },
//                             color: '#05F500',
//                           }}
//                         >
//                           (Mua ngay)
//                         </Button>
//                       )}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           <Box sx={{ textAlign: 'center', mt: 4 }}>
//             <Button
//               variant="outlined"
//               sx={{ textTransform: 'none', color: '#cfcfff' }}
//               href="/upload"
//             >
//               Tải Thêm
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Stack>
//   );
// };

// export default CreatorDetail;

// ================== CreatorDetail.tsx ==================
// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Tabs,
//   Tab,
//   CircularProgress,
// } from '@mui/material';
// import { ArrowBack, Instagram, Twitter } from '@mui/icons-material';
// import { useSearchParams } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { Creator } from './data/creatorsData';
// import {
//   useOwnedProducts,
//   usePostProductForSale,
//   useUpdateProduct,
// } from '@/hooks/useProduct';
// import EditProductDialog from './EditProductDialog';
// import { OwnedProduct, UpdateProductPayload } from '@/types/product';

// interface Props {
//   creator: Creator | null;
//   onBack: () => void;
//   isWalletMode?: boolean;
// }

// const CreatorDetail: React.FC<Props> = ({ creator, onBack, isWalletMode }) => {
//   const [tab, setTab] = useState(0);
//   const searchParams = useSearchParams();
//   const walletMode = isWalletMode ?? searchParams?.get('walletMode') === 'true';

//   // Query data
//   const {
//     data: ownedProducts,
//     isLoading,
//     isError,
//     refetch,
//   } = useOwnedProducts();

//   // Mutations
//   const postProductMutation = usePostProductForSale();
//   const updateProductMutation = useUpdateProduct();

//   // Dialog state
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(
//     null,
//   );

//   const handleOpenEdit = (product: OwnedProduct) => {
//     // Chỉ mapping type và name trong properties
//     const mappedProduct: OwnedProduct = {
//       ...product,
//       externalLink: product.externalLink || '',
//       properties: product.properties.map((prop) => ({
//         type: prop.type || '',
//         name: prop.name || '',
//       })),
//     };
//     setSelectedProduct(mappedProduct);
//     setOpenEditDialog(true);
//   };

//   if (!creator) return null;

//   // Export CSV
//   const handleExport = () => {
//     const csvHeader = [
//       'Name',
//       'Total Revenue',
//       'Followers',
//       'Number of Works',
//       'Floor Price',
//     ];
//     const csvRow = [
//       creator.name,
//       creator.totalVolume,
//       creator.followers,
//       creator.works,
//       creator.floorPrice,
//     ];
//     const csvContent =
//       'data:text/csv;charset=utf-8,' +
//       [csvHeader.join(','), csvRow.join(',')].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.href = encodedUri;
//     link.download = `creator_stats.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
//       {/* Background gradient */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
//           overflow: 'hidden',
//           zIndex: 1,
//           mt: 37.5,
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//         }}
//       />

//       <Box sx={{ position: 'relative', zIndex: 10 }}>
//         {/* Banner */}
//         <Box
//           component="img"
//           src={creator.banner}
//           alt="banner"
//           sx={{
//             width: '100%',
//             height: 300,
//             objectFit: 'cover',
//             filter: 'brightness(0.5)',
//           }}
//         />

//         {/* Info */}
//         <Box sx={{ px: 7, pb: 6, position: 'relative' }}>
//           <Button variant="outlined" onClick={onBack} sx={{ mt: 1 }}>
//             <ArrowBack fontSize="small" /> Quay lại
//           </Button>

//           <Avatar
//             src={creator.avatar}
//             alt={creator.name}
//             sx={{
//               width: { xs: 80, sm: 60, md: 96 },
//               height: { xs: 80, sm: 60, md: 96 },
//               border: '4px solid rgba(255,255,255,0.12)',
//               boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
//               mt: 3,
//             }}
//           />
//           <Typography
//             variant="h5"
//             sx={{ color: '#fff', fontWeight: 800, mt: 2 }}
//           >
//             {creator.name}
//           </Typography>
//           <Typography sx={{ color: '#9b9bbf' }}>{creator.username}</Typography>
//           <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//             <Button
//               variant="contained"
//               sx={{
//                 textTransform: 'none',
//                 background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
//               }}
//             >
//               Follow
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{
//                 color: '#cfcfff',
//                 borderColor: 'rgba(255,255,255,0.1)',
//                 textTransform: 'none',
//               }}
//             >
//               Chia sẻ
//             </Button>
//             <Twitter sx={{ color: '#cfcfff' }} />
//             <Instagram sx={{ color: '#cfcfff' }} />
//           </Stack>

//           {/* Stats */}
//           <Grid container spacing={2} sx={{ my: 4 }}>
//             {[
//               { label: 'TOTAL REVENUE', value: creator.totalVolume },
//               { label: 'FOLLOWERS', value: creator.followers },
//               { label: 'NUMBER OF WORKS', value: creator.works },
//               { label: 'FLOOR PRICE', value: creator.floorPrice },
//             ].map((stat) => (
//               <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
//                 <Typography sx={{ color: '#9b9bbf', fontWeight: 700 }}>
//                   {stat.value}
//                 </Typography>
//                 <Typography sx={{ color: '#9b9bbf' }}>{stat.label}</Typography>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Export */}
//           <Box sx={{ textAlign: 'center', my: 4 }}>
//             <Button
//               variant="text"
//               onClick={handleExport}
//               sx={{ color: '#fff', textTransform: 'none' }}
//             >
//               Xuất sang Trang tính
//             </Button>
//           </Box>

//           {/* Tabs */}
//           <Box sx={{ mt: 6, mb: 4 }}>
//             <Tabs value={tab} onChange={(e, val) => setTab(val)}>
//               <Tab label="Đã tạo" />
//               <Tab label="Sở hữu" />
//               <Tab label="Bộ sưu tập" />
//               <Tab label="Yêu thích" />
//             </Tabs>
//           </Box>

//           {/* Tab content */}
//           {tab === 1 && (
//             <Grid container spacing={3}>
//               {isLoading && (
//                 <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
//                   <CircularProgress />
//                 </Grid>
//               )}
//               {isError && (
//                 <Grid size={{ xs: 12 }}>
//                   <Typography color="error">Lỗi tải sản phẩm sở hữu</Typography>
//                 </Grid>
//               )}
//               {ownedProducts?.map((it) => (
//                 <Grid key={it.id} size={{ xs: 12, sm: 6, md: 3 }}>
//                   <Card
//                     sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3 }}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={`https://gateway.pinata.cloud/ipfs/${it.image}`}
//                       alt={it.name}
//                       sx={{ height: 300, objectFit: 'cover' }}
//                     />
//                     <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ color: '#fff', fontWeight: 700 }}
//                       >
//                         {it.name}
//                       </Typography>
//                       <Typography sx={{ color: '#b78eff', mt: 1 }}>
//                         Giá: {it.price ?? 'N/A'}
//                       </Typography>

//                       {walletMode && (
//                         <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                           <Button
//                             size="small"
//                             variant="contained"
//                             onClick={() =>
//                               postProductMutation.mutate(
//                                 {
//                                   id: it.id,
//                                   price: it.price ?? 0,
//                                   status: 'buyNow',
//                                 },
//                                 {
//                                   onSuccess: () =>
//                                     toast.success('Product posted for sale!'),
//                                 },
//                               )
//                             }
//                           >
//                             Sell
//                           </Button>
//                           <Button
//                             size="small"
//                             variant="contained"
//                             onClick={() => handleOpenEdit(it)}
//                           >
//                             Update
//                           </Button>
//                         </Stack>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>
//       </Box>

//       {/* Dialog sửa sản phẩm */}
//       {selectedProduct && (
//         <EditProductDialog
//           open={openEditDialog}
//           onClose={() => setOpenEditDialog(false)}
//           product={selectedProduct}
//           onSave={(data: OwnedProduct) => {
//             const fileImage =
//               typeof data.image === 'object' && data.image !== null
//                 ? (data.image as File)
//                 : undefined;

//             const payload: UpdateProductPayload = {
//               id: String(data.id),
//               name: data.name,
//               description: data.description,
//               properties: data.properties,
//               price: data.price,
//               externalLink: data.externalLink,
//               ...(fileImage ? { image: fileImage } : {}),
//             };

//             updateProductMutation.mutate(payload, {
//               onSuccess: () => {
//                 toast.success('Product updated successfully!');
//                 setOpenEditDialog(false);
//                 refetch();
//               },
//               onError: (err: unknown) => {
//                 if (err instanceof Error) toast.error(err.message);
//                 else toast.error('Failed to update product');
//               },
//             });
//           }}
//         />
//       )}
//     </Stack>
//   );
// };

// export default CreatorDetail;

// CreatorDetail.tsx

'use client';

import React, { useState } from 'react';
import {
  Box,
  // Avatar,
  Typography,
  Button,
  Grid,
  // Card,
  // CardMedia,
  // CardContent,
  Stack,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
  Tooltip,
} from '@mui/material';
import { ArrowBack, Instagram, Twitter } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
// import toast from 'react-hot-toast';
import { useOwnedProducts, usePostProductForSale } from '@/hooks/useProduct';
import {
  OwnedProduct,
  ProductActivity,
  ProductProperty,
} from '@/types/product';
import { useQueries } from '@tanstack/react-query';
import * as productService from '@/services/productService';
import EditNFTModal from './EditNFTModal';
import SellNFT from './SellNFT';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { UserProfile } from '@/types/user';
import EditProfileModal from './EditProfileModal';
import { useUserProfile } from '@/hooks/useUser';
// import Image from 'next/image';
import UserHeader from './UserHeader';
import OwnedTab from './tab/OwnedTab';
import CreatedTab from './tab/CreatedTab';
import CollectionTab from './tab/collection/CollectionTab';

import Cookies from 'js-cookie';
// import { UserProfile } from '@/types/user';
interface Props {
  onBack: () => void;
  isWalletMode?: boolean;
}

const CreatorDetail: React.FC<Props> = ({ onBack, isWalletMode }) => {
  const [tab, setTab] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(
    null,
  );
  const [selectedProductIsMinted, setSelectedProductIsMinted] = useState(false);

  const [openSellModal, setOpenSellModal] = useState(false);
  const [sellProductId, setSellProductId] = useState<number | null>(null);
  const [sellProductPrice, setSellProductPrice] = useState<string>('0');
  const [openEditProfile, setOpenEditProfile] = useState(false);

  // const [bannerError, setBannerError] = useState(false);

  const router = useRouter();

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  const searchParams = useSearchParams();
  const walletMode = isWalletMode ?? searchParams?.get('walletMode') === 'true';

  const accessToken = Cookies.get('accessToken') || '';
  const account = Cookies.get('account') ?? '';
  // Queries
  const {
    data: ownedProducts,
    isLoading: ownedLoading,
    isError: ownedError,
    refetch,
  } = useOwnedProducts();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUserProfile();

  // Mutations
  // const postProductMutation = usePostProductForSale();

  // Activity queries
  // const activitiesQueries = useQueries({
  //   queries:
  //     ownedProducts?.map((product) => ({
  //       queryKey: ['productActivity', product.id],
  //       queryFn: () => productService.getProductActivity(product.id),
  //       staleTime: 1000 * 60,
  //     })) || [],
  // });
  const activitiesQueries = useQueries({
    queries:
      ownedProducts?.map((product) => ({
        queryKey: ['productActivity', product.id],
        queryFn: () => productService.getProductActivity(product.id),
      })) || [],
  });

  const allActivities = activitiesQueries.map(
    (q) =>
      q.data?.map((a) => ({
        ...a,
        eventType: a.evenType ?? a.evenType,
      })) ?? [],
  );
  const activitiesLoading = activitiesQueries.some((q) => q.isLoading);

  // Open modal
  const handleOpenEdit = (
    product: OwnedProduct,
    activities: ProductActivity[],
  ) => {
    const parsedProperties: ProductProperty[] = Array.isArray(
      product.properties,
    )
      ? product.properties
      : (JSON.parse(product.properties || '[]') as ProductProperty[]);

    const mappedProduct = {
      ...product,
      properties: parsedProperties.map((p) => ({
        type: p.type || '',
        name: p.name || '',
      })),
      isFreeze: Boolean(product.isFreeze),
      externalLink: product.externalLink || '',
    };

    // Tính isMinted dựa trên activity
    const selectedProductIsMinted = activities.some(
      (a) => a.evenType === 'Mint',
    );

    setSelectedProduct(mappedProduct);
    setOpenEditDialog(true);

    // Lưu isMinted vào state nếu muốn
    setSelectedProductIsMinted(selectedProductIsMinted);
  };

  if (!user) return null;

  const handleExport = () => {
    const stats = [
      {
        label: 'TOTAL REVENUE',
        value:
          user?.ownedProducts?.reduce(
            (sum, p) => sum + Number(p.price || 0),
            0,
          ) ?? 0,
      },
      { label: 'FOLLOWERS', value: user?.followCount ?? 0 },
      { label: 'NUMBER OF WORKS', value: user?.ownedProducts?.length ?? 0 },
      {
        label: 'FLOOR PRICE',
        value: user?.ownedProducts?.length
          ? Math.min(...user.ownedProducts.map((p) => Number(p.price || 0)))
          : 0,
      },
    ];

    const csvHeader = [
      'Name',
      'Total Revenue',
      'Followers',
      'Number of Works',
      'Floor Price',
    ];
    const csvRow = [
      user?.fullName ?? '',
      stats[0].value,
      stats[1].value,
      stats[2].value,
      stats[3].value,
    ];
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [csvHeader.join(','), csvRow.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `creator_stats.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    {
      label: 'TOTAL REVENUE',
      value: user.ownedProducts.reduce(
        (sum, p) => sum + Number(p.price || 0),
        0,
      ),
    },
    { label: 'FOLLOWERS', value: user.followCount },
    { label: 'NUMBER OF WORKS', value: user.ownedProducts.length },
    {
      label: 'FLOOR PRICE',
      value: user.ownedProducts.length
        ? Math.min(...user.ownedProducts.map((p) => Number(p.price || 0)))
        : 0,
    },
  ];

  const shortenAddress = (addr: string) => {
    if (!addr) return '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
  };

  // const avatarUrl = user?.avatar
  //   ? `${API_URL}/api/upload/${user.avatar}?t=${Date.now()}`
  //   : '/avatar-default.png';

  // Loading / Error
  if (ownedLoading || userLoading) return <CircularProgress />;
  if (ownedError || userError || !user)
    return <Typography>User not found</Typography>;

  // const bannerUrl =
  //   !bannerError && user?.background
  //     ? `${API_URL}/api/upload/${user.background}`
  //     : '/creator_detail/banner.jpg';

  //   const avatarUrl = user?.avatar
  //   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}`
  //   : '/avatar-default.png';

  // const bannerUrl = user?.background
  //   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
  //   : '/avatar-default.png';

  // console.log('Avatar URL:', avatarUrl);
  // console.log('Banner URL:', bannerUrl);

  return (
    <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
      {/* Background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
          overflow: 'hidden',
          zIndex: 1,
          mt: 37.5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />

      <Box sx={{ position: 'relative', width: '100%', color: '#fff' }}>
        {/* Banner */}
        {/* <Box
          component="img"
          src={creator.banner}
          alt="banner"
          sx={{
            width: '100%',
            height: 320,
            objectFit: 'cover',
            filter: 'brightness(0.4)',
            zIndex: 12,
          }}
        /> */}
        <Box
          sx={{
            width: '100%',
            height: 320,
            // backgroundImage: `url(${bannerUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
            zIndex: 12,
          }}
        >
          {/* UserHeader hiển thị banner + avatar */}
          <UserHeader
            type="banner"
            src={
              user.background
                ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
                : null
            }
          />
          {/* <Image
            src={
              // user?.background
              //   ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.background}`
              //   : '/avatar-default.png'
              bannerUrl
            }
            width={3200} // chỉ để Next.js biết tỉ lệ, không hiển thị
            height={320} // chỉ để Next.js biết tỉ lệ, không hiển thị
            style={{ display: 'none' }}
            onError={() => setBannerError(true)}
            alt="check-banner"
          /> */}
        </Box>

        {/* Back button */}
        <Button
          onClick={onBack}
          sx={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'rgba(0,0,0,0.4)',
            color: '#fff',
            textTransform: 'none',
            borderRadius: 2,
            zIndex: 14,
            '&:hover': { background: 'rgba(0,0,0,0.6)' },
          }}
        >
          <ArrowBack fontSize="small" sx={{ mr: 1 }} /> Quay lại
        </Button>

        {/* Info Section */}
        <Box
          sx={{
            px: 6,
            mt: -10, // avatar nổi lên từ banner
            position: 'relative',
            zIndex: 14,
          }}
        >
          {/* INFO SECTION */}
          <Stack
            direction="row"
            spacing={4}
            alignItems="flex-start"
            sx={{ mt: -8, px: 7, position: 'relative' }}
          >
            <UserHeader
              type="avatar"
              src={
                user.avatar
                  ? `${process.env.NEXT_PUBLIC_API}/api/upload/${user.avatar}`
                  : null
              }
              size={120}
            />

            {/* Right Content */}
            <Box>
              {/* Full Name */}
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff' }}>
                {user.fullName}
              </Typography>

              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ color: '#A0A0C0', fontSize: '1rem' }}>
                  {shortenAddress(user.addressWallet)}
                </Typography>
                <Tooltip title="Copy Wallet Address">
                  <ContentCopyIcon
                    sx={{
                      fontSize: 15,
                      color: '#A0A0C0',
                      cursor: 'pointer',
                      '&:hover': { color: '#fff' },
                    }}
                    onClick={() =>
                      navigator.clipboard.writeText(user.addressWallet)
                    }
                  />
                </Tooltip>
              </Stack>

              {/* Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    background: 'linear-gradient(90deg,#7a3bff,#b78eff)',
                  }}
                  disabled={user.addressWallet === account} // disable nếu là chính mình
                >
                  Follow
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    textTransform: 'none',
                    color: '#fff',
                  }}
                >
                  Chia sẻ
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    textTransform: 'none',
                    color: '#fff',
                  }}
                  onClick={() => setOpenEditProfile(true)}
                >
                  Chỉnh sửa Profile
                </Button>

                {/* Social icons */}
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Twitter sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                  <Instagram sx={{ color: '#cfcfff', cursor: 'pointer' }} />
                </Stack>
              </Stack>

              {/* Bio */}
              <Typography
                sx={{
                  color: '#CFCFFF',
                  my: 5,
                  maxWidth: 800,
                  ml: -25,
                }}
              >
                {user.bio || 'No bio yet.'}
              </Typography>
            </Box>
          </Stack>

          {/* Stats */}
          <Grid container spacing={4} sx={{ mt: 6, mb: 4 }}>
            {stats.map((stat) => (
              <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
                <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ color: '#9b9bbf', fontSize: 14 }}>
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>

          {/* Export */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="text"
              onClick={handleExport}
              sx={{
                textTransform: 'none',
                color: '#fff',
                '&:hover': { color: '#b78eff' },
              }}
            >
              Xuất sang Trang tính
            </Button>
          </Box>

          {/* Tabs */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Tabs
              value={tab}
              onChange={(e, val) => setTab(val)}
              textColor="secondary"
              indicatorColor="secondary"
              sx={{
                flex: 1, // chiếm hết không gian còn lại
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                },
                '& .Mui-selected': {
                  color: 'secondary.main',
                },
              }}
            >
              <Tab label="Đã tạo" />
              <Tab label="Sở hữu" />
              <Tab label="Bộ sưu tập" />
              <Tab label="Yêu thích" />
            </Tabs>

            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => handleTabClick('/upload')}
            >
              Tải thêm
            </Button>
          </Box>

          {/* Tab Content */}
          {tab === 0 && (
            <CreatedTab
              ownedProducts={ownedProducts ?? []}
              allActivities={allActivities}
              activitiesLoading={activitiesLoading}
              walletMode={walletMode}
              handleOpenEdit={handleOpenEdit}
              openSellModal={(id, price) => {
                setSellProductId(id);
                setSellProductPrice(price);
                setOpenSellModal(true);
              }}
            />
          )}

          {tab === 1 && (
            <OwnedTab
              ownedProducts={ownedProducts ?? []}
              allActivities={allActivities}
              activitiesLoading={activitiesLoading}
              walletMode={walletMode}
              handleOpenEdit={handleOpenEdit}
              openSellModal={(id, price) => {
                setSellProductId(id);
                setSellProductPrice(price);
                setOpenSellModal(true);
              }}
            />
          )}

          {tab === 2 && (
            <CollectionTab
              mintedProducts={ownedProducts ?? []} // NFT đã mint
              allActivities={allActivities}
            />
          )}
        </Box>
      </Box>

      {/* Modal Edit/Create NFT */}
      {selectedProduct && (
        <EditNFTModal
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          product={selectedProduct}
          onUpdate={refetch}
          isMinted={selectedProductIsMinted} // tính từ activity
        />
      )}

      {sellProductId && (
        <SellNFT
          open={openSellModal}
          onClose={() => setOpenSellModal(false)}
          productId={sellProductId}
          defaultPrice={sellProductPrice}
        />
      )}

      {openEditProfile && user && (
        <EditProfileModal
          open={openEditProfile}
          onClose={() => setOpenEditProfile(false)}
          user={user}
        />
      )}
    </Stack>
  );
};

export default CreatorDetail;

// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Avatar,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Stack,
//   Tabs,
//   Tab,
//   CircularProgress,
// } from '@mui/material';
// import { ArrowBack, Instagram, Twitter } from '@mui/icons-material';
// import { useSearchParams } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { Creator } from './data/creatorsData';
// import { useOwnedProducts } from '@/hooks/useOwnedProducts';
// import { usePostProductForSale, useUpdateProduct } from '@/hooks/useProductHooks';
// import EditProductDialog from './EditProductDialog';

// interface Props {
//   creator: Creator | null;
//   onBack: () => void;
//   isWalletMode?: boolean;
// }

// export interface Product {
//   id: number;
//   name: string;
//   image: string;
//   price?: number | string;
//   description?: string;
//   freeze?: boolean;
//   tokenId?: string;
//   contractAddress?: string;
//   blockchain?: string;
//   [key: string]: unknown; // fallback nếu BE có thêm field
// }

// const CreatorDetail: React.FC<Props> = ({ creator, onBack, isWalletMode }) => {
//   const [tab, setTab] = useState(0);
//   const searchParams = useSearchParams();
//   const walletMode = isWalletMode ?? searchParams?.get('walletMode') === 'true';

//   const { data: rawProducts, isLoading, isError, refetch } = useOwnedProducts();

// const ownedProducts: Product[] = rawProducts?.map(p => ({
//   id: p.id,
//   name: p.name,
//   image: p.image,
//   price: p.price,
//   description: p.description,
//   // freeze: p.freeze,
//   tokenId: p.tokenId ?? undefined,
//   contractAddress: p.contractAddress ?? undefined,
//   // blockchain: (p as any).blockchain ?? undefined, // ❌ ép tạm any nếu field này không có
// })) || [];

//   const updateProductMutation = useUpdateProduct();
//   const postProductMutation = usePostProductForSale();

//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [openEditDialog, setOpenEditDialog] = useState(false);

//   const handleOpenEdit = (product: Product) => {
//     setSelectedProduct(product);
//     setOpenEditDialog(true);
//   };

//   if (!creator) return null;

//   const handleExport = () => {
//     const csvHeader = ['Name', 'Total Revenue', 'Followers', 'Number of Works', 'Floor Price'];
//     const csvRow = [creator.name, creator.totalVolume, creator.followers, creator.works, creator.floorPrice];
//     const csvContent = 'data:text/csv;charset=utf-8,' + [csvHeader.join(','), csvRow.join(',')].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.href = encodedUri;
//     link.download = `creator_stats.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <Stack position="relative" sx={{ overflow: 'hidden', minHeight: '100vh' }}>
//       {/* Gradient background */}
//       <Box
//         sx={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(120deg,#12192b,#182858,#341a57)',
//           overflow: 'hidden',
//           zIndex: 1,
//           mt: 37.5,
//           borderTopLeftRadius: 15,
//           borderTopRightRadius: 15,
//         }}
//       >
//         <Box
//           className="glow"
//           sx={{
//             '--glow-top': '-1%',
//             '--glow-left': '-20%',
//             '--glow-width': '500px',
//             '--glow-height': '500px',
//             '--glow-radius': '20%',
//             '--glow-color1': 'rgba(214,34,218,0.6)',
//             '--glow-color2': 'rgba(214,34,218,0.4)',
//             '--glow-blur': '100px',
//             '--glow-opacity': '1',
//             transform: 'rotate(200deg)',
//             position: 'absolute',
//             pointerEvents: 'none',
//           }}
//         />
//       </Box>

//       <Box sx={{ position: 'relative', zIndex: 10 }}>
//         {/* Banner */}
//         <Box
//           component="img"
//           src={creator.banner}
//           alt="banner"
//           sx={{ width: '100%', height: 300, objectFit: 'cover', filter: 'brightness(0.5)' }}
//         />

//         {/* Info */}
//         <Box sx={{ px: 7, pb: 6, position: 'relative' }}>
//           <Box sx={{ position: 'relative', mb: { xs: 6, md: 10 }, mt: { xs: -6, md: -10 } }}>
//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: { xs: 130, md: -90 },
//                 left: { xs: '50%', md: 60 },
//                 transform: { xs: 'translateX(-50%)', md: 'none' },
//                 zIndex: 10,
//               }}
//             >
//               <Avatar
//                 src={creator.avatar}
//                 alt={creator.name}
//                 sx={{
//                   width: { xs: 80, md: 96 },
//                   height: { xs: 80, md: 96 },
//                   border: '4px solid rgba(255,255,255,0.12)',
//                   boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
//                 }}
//               />
//             </Box>

//             <Box
//               sx={{
//                 position: 'absolute',
//                 left: { xs: '50%', md: 175 },
//                 bottom: { xs: 40, md: -90 },
//                 transform: { xs: 'translateX(-50%)', md: 'none' },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: { xs: 'center', md: 'flex-start' },
//                 gap: 1.5,
//                 textAlign: { xs: 'center', md: 'left' },
//                 zIndex: 10,
//               }}
//             >
//               <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800 }}>
//                 {creator.name}
//               </Typography>
//               <Typography sx={{ color: '#9b9bbf' }}>{creator.username}</Typography>

//               <Stack direction="row" spacing={1}>
//                 <Button
//                   variant="contained"
//                   sx={{ textTransform: 'none', background: 'linear-gradient(90deg,#7a3bff,#b78eff)' }}
//                 >
//                   Follow
//                 </Button>
//                 <Button variant="outlined" sx={{ color: '#cfcfff', borderColor: 'rgba(255,255,255,0.1)', textTransform: 'none' }}>
//                   Chia sẻ
//                 </Button>
//                 <Twitter sx={{ color: '#cfcfff' }} />
//                 <Instagram sx={{ color: '#cfcfff' }} />
//               </Stack>
//             </Box>

//             <Button variant="outlined" onClick={onBack} sx={{ mt: 1 }}>
//               <ArrowBack fontSize="small" /> Quay lại
//             </Button>
//           </Box>

//           {/* Bio */}
//           <Typography sx={{ color: '#cfcfff', mb: 3, pt: 3 }}>{creator.bio}</Typography>

//           {/* Stats */}
//           <Grid container spacing={2} sx={{ mb: 4 }}>
//             {[
//               { label: 'TOTAL REVENUE', value: creator.totalVolume },
//               { label: 'FOLLOWERS', value: creator.followers },
//               { label: 'NUMBER OF WORKS', value: creator.works },
//               { label: 'FLOOR PRICE', value: creator.floorPrice },
//             ].map((stat) => (
//               <Grid size={{ xs: 6, sm: 3}} key={stat.label}>
//                 <Typography sx={{ color: '#9b9bbf', fontWeight: 700 }}>{stat.value}</Typography>
//                 <Typography sx={{ color: '#9b9bbf' }}>{stat.label}</Typography>
//               </Grid>
//             ))}
//           </Grid>

//           {/* Export button */}
//           <Box sx={{ textAlign: 'center', my: 4 }}>
//             <Button variant="text" onClick={handleExport} sx={{ color: '#fff', textTransform: 'none' }}>
//               Xuất sang Trang tính
//             </Button>
//           </Box>

//           {/* Tabs */}
//           <Box sx={{ mt: 6, mb: 4 }}>
//             <Tabs value={tab} onChange={(e, val) => setTab(val)}>
//               <Tab label="Đã tạo" />
//               <Tab label="Sở hữu" />
//               <Tab label="Bộ sưu tập" />
//               <Tab label="Yêu thích" />
//             </Tabs>
//           </Box>

//           {/* Tab content */}
//           <Grid container spacing={3}>
//             {tab === 1 && (
//               <>
//                 {isLoading && (
//                   <Grid size={{ xs: 12 }} sx={{ textAlign: 'center' }}>
//                     <CircularProgress />
//                   </Grid>
//                 )}
//                 {isError && (
//                   <Grid size={{ xs: 12 }}>
//                     <Typography color="error">Lỗi tải sản phẩm sở hữu</Typography>
//                   </Grid>
//                 )}

//                 {ownedProducts.map((it: Product) => (
//                   <Grid size={{ xs: 12, sm: 6, md: 3 }} key={it.id}>
//                     <Card sx={{ bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 3 }}>
//                       <CardMedia
//                         component="img"
//                         image={`https://gateway.pinata.cloud/ipfs/${it.image}`}
//                         alt={it.name}
//                         sx={{ height: 300, objectFit: 'cover' }}
//                       />
//                       <CardContent sx={{ bgcolor: '#1a1a2e' }}>
//                         <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700 }}>
//                           {it.name}
//                         </Typography>
//                         <Typography sx={{ color: '#b78eff', mt: 1 }}>
//                           Giá: {it.price ?? 'N/A'}
//                         </Typography>

//                         {walletMode && (
//                           <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
//                             <Button
//   size="small"
//   variant="contained"
//   onClick={() => {
//     if (it.price === undefined || it.price === null) {
//       toast.error('Product chưa có giá!');
//       return;
//     }

//     postProductMutation.mutate(
//       { id: it.id, price: Number(it.price) }, // ✅ convert sang number
//       {
//         onSuccess: (res) => {
//           console.log('✅ Blockchain info:', {
//             blockchain: res.blockchain,
//             tokenId: res.tokenId,
//             contractAddress: res.contractAddress,
//           });
//           toast.success('Product posted for sale successfully!');
//         },
//       }
//     );
//   }}
// >
//   Sell
// </Button>

//                             <Button
//                               size="small"
//                               variant="contained"
//                               onClick={() => handleOpenEdit(it)}
//                             >
//                               Update
//                             </Button>
//                           </Stack>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </>
//             )}
//           </Grid>
//         </Box>
//       </Box>

//       {/* Edit Dialog */}
//       <EditProductDialog
//         open={openEditDialog}
//         onClose={() => setOpenEditDialog(false)}
//         product={selectedProduct}
//         onSave={(data) => {
//           if (!selectedProduct) return;
//           updateProductMutation.mutate(
//             { id: selectedProduct.id, ...data },
//             {
//               onSuccess: () => {
//                 toast.success('Product updated successfully!');
//                 setOpenEditDialog(false);
//                 refetch();
//               },
//             }
//           );
//         }}
//       />
//     </Stack>
//   );
// };

// export default CreatorDetail;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Grid, Typography, Stack, Tabs, Tab, Card, CardMedia, CardContent, Button, CircularProgress
// } from '@mui/material';
// import { useSearchParams } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { motion } from 'framer-motion';
// import EditProductDialog from './EditProductDialog';
// import { getAllOwnedProducts, OwnedProduct } from '@/services/product_ownedService';

// const CreatorDetail: React.FC = () => {
//   const [tab, setTab] = useState(0);
//   const [products, setProducts] = useState<OwnedProduct[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<OwnedProduct | null>(null);

//   const searchParams = useSearchParams();
//   const walletAddress = searchParams.get('address') || undefined;

//   useEffect(() => {
//     if (!walletAddress) return;
//     setLoading(true);
//     getAllOwnedProducts()
//       .then(setProducts)
//       .catch(() => toast.error('Failed to fetch products'))
//       .finally(() => setLoading(false));
//   }, [walletAddress]);

//   const openEditDialog = (product: OwnedProduct) => {
//     setSelectedProduct(product);
//     setEditDialogOpen(true);
//   };
//   const closeEditDialog = () => {
//     setSelectedProduct(null);
//     setEditDialogOpen(false);
//   };

//   return (
//     <Box sx={{ px: 6, py: 8 }}>
//       <Typography sx={{ fontWeight: 700, fontSize: '3rem', mb: 2 }}>
//         Creator Dashboard
//       </Typography>

//       <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 4 }}>
//         <Tab label="Owned NFTs" />
//         <Tab label="Created NFTs" />
//       </Tabs>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid container spacing={4}>
//           {products.map((product) => (
//             <Grid size={{ xs: 12, sm: 6, md: 4}} key={product.id}>
//               <motion.div whileHover={{ scale: 1.03 }}>
//                 <Card
//                   sx={{ borderRadius: 3, overflow: 'hidden', cursor: 'pointer' }}
//                   onClick={() => openEditDialog(product)}
//                 >
//                   <CardMedia component="img" height="240" image={product.image} alt={product.name} />
//                   <CardContent sx={{ backgroundColor: '#12192b', color: '#fff' }}>
//                     <Typography variant="h6">{product.name}</Typography>
//                     <Typography variant="body2" sx={{ color: '#8A91C5' }}>
//                       {product.description}
//                     </Typography>
//                     <Stack direction="row" justifyContent="space-between" mt={2}>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         sx={{ borderColor: '#01FFCA', color: '#01FFCA' }}
//                         onClick={() => openEditDialog(product)}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="contained"
//                         size="small"
//                         sx={{ background: 'linear-gradient(90deg,#8D1CFE,#01FFCA)' }}
//                       >
//                         Sell
//                       </Button>
//                     </Stack>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {selectedProduct && (
//         <EditProductDialog
//           open={editDialogOpen}
//           onClose={closeEditDialog}
//           product={selectedProduct}
//           onSave={() => {
//             toast.success('Product updated!');
//             closeEditDialog();
//             getAllOwnedProducts().then(setProducts);
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default CreatorDetail;
