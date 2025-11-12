// 'use client';

// import { useEffect, useState } from 'react';
// import { Box, Typography, Button, Card, Stack, Chip } from '@mui/material';
// import Image from 'next/image';
// import { useParams } from 'next/navigation';
// import { NFT, nftData } from './data/nftData';
// import { ArrowBack } from '@mui/icons-material';

// export default function NFTDetail() {
//   const { id } = useParams();
//   const [imgUrls, setImgUrls] = useState<string[]>([]);

//   const nft = nftData.find((item) => item.id === Number(id));

//   useEffect(() => {
//     if (!nft) return;
//     if (Array.isArray(nft.img)) {
//       const urls = nft.img.map((file) => URL.createObjectURL(file));
//       setImgUrls(urls);
//       return () => urls.forEach((url) => URL.revokeObjectURL(url));
//     } else {
//       setImgUrls([nft.img]);
//     }
//   }, [nft]);

//   if (!nft) return <Typography>Not found</Typography>;

//   return (
//     <Box sx={{ color: 'white', px: 4, py: 10, maxWidth: 1400, mx: 'auto' }}>
//       <Typography
//         sx={{
//           color: '#9333ea',
//           display: 'flex',
//           alignItems: 'center',
//           gap: 0.8,
//           mb: 2,
//           ml: 'auto',
//           transform: 'translateX(49%)',
//         }}
//       >
//         <ArrowBack />
//         Cyber Punks Collection
//       </Typography>

//       <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
//         {/* Image */}
//         <Card
//           sx={{
//             boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
//             border:'2px solid #1f2937',
//             bgcolor:'#101027',
//             borderRadius: 3,
//             overflow: 'hidden',
//             width: { xs: '100%', md: '45%' },
//           }}
//         >
//           {imgUrls.map((src, idx) => (
//             <Image
//               key={idx}
//               src={src}
//               alt={nft.name}
//               width={800}
//               height={800}
//               style={{ width: '100%', height: 'auto', padding:'1.3rem', borderRadius:'32px' }}
//             />
//           ))}
//         </Card>

//         {/* Right Content */}
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h4" fontWeight={700}>
//             {nft.name}
//           </Typography>

//           {/* Price */}
//           <Box
//             sx={{
//               bgcolor: '#1A1A2E',
//               p: 2.5,
//               borderRadius: 2,
//               mt: 2,
//             }}
//           >
//             <Typography sx={{ opacity: 0.7 }}>Current Price</Typography>
//             <Typography variant="h5" fontWeight={700}>
//               {nft.price}
//             </Typography>

//             <Stack direction="row" spacing={2} mt={2}>
//               <Button variant="contained" sx={{ bgcolor: '#9230FF' }}>
//                 Buy Now
//               </Button>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderColor: '#9230FF',
//                   color: '#9230FF',
//                   textTransform: 'none',
//                 }}
//               >
//                 Make Offer
//               </Button>
//             </Stack>
//           </Box>

//           {/* Description */}
//           <Box mt={4}>
//             <Typography variant="h6" fontWeight={700}>
//               Description
//             </Typography>
//             <Typography sx={{ opacity: 0.8, mt: 1 }}>
//               A cyberpunk guardian from the neon-lit streets of Neo Tokyo...
//             </Typography>
//           </Box>

//           {/* Properties */}
//           <Box mt={4}>
//             <Typography variant="h6" fontWeight={700} mb={2}>
//               Properties
//             </Typography>
//             <Stack direction="row" flexWrap="wrap" gap={1}>
//               <Chip
//                 label="Neon City"
//                 sx={{ bgcolor: '#251C37', color: '#B983FF' }}
//               />
//               <Chip
//                 label="Cyber Glow"
//                 sx={{ bgcolor: '#251C37', color: '#B983FF' }}
//               />
//               <Chip
//                 label="Neural Crown"
//                 sx={{ bgcolor: '#251C37', color: '#B983FF' }}
//               />
//               <Chip
//                 label="Legendary"
//                 sx={{ bgcolor: '#251C37', color: '#B983FF' }}
//               />
//             </Stack>
//           </Box>

//           {/* Activity */}
//           <Box mt={4}>
//             <Typography variant="h6" fontWeight={700}>
//               Activity
//             </Typography>
//             <Typography sx={{ opacity: 0.6, mt: 1 }}>
//               Listed 1 day ago • Sold 3 days ago
//             </Typography>
//           </Box>
//         </Box>
//       </Stack>

//       {/* More from this Collection */}
//       <Box mt={8}>
//         <Typography variant="h5" fontWeight={700} mb={3}>
//           More from this Collection
//         </Typography>

//         <Stack direction="row" spacing={3} overflow="auto">
//           {nftData.slice(0, 4).map((item) => {
//             // Xử lý imgUrls cho từng item
//             const itemImgs = Array.isArray(item.img)
//               ? item.img.map((f) => URL.createObjectURL(f))
//               : [item.img];

//             return (
//               <Card
//                 key={item.id}
//                 sx={{ width: 230, bgcolor: '#1A1A2E', borderRadius: 2 }}
//               >
//                 {itemImgs.map((src, idx) => (
//                   <Image
//                     key={idx}
//                     src={src}
//                     alt={item.name}
//                     width={230}
//                     height={230}
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                 ))}
//                 <Box p={1.5}>
//                   <Typography fontSize={14}>{item.name}</Typography>
//                   <Typography sx={{ fontSize: 12, opacity: 0.6 }}>
//                     {item.price}
//                   </Typography>
//                 </Box>
//               </Card>
//             );
//           })}
//         </Stack>
//       </Box>
//     </Box>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { Box, Typography, Button, Card, Stack, Divider } from '@mui/material';
// import Image from 'next/image';
// import { useParams, useRouter } from 'next/navigation';
// import { nftData } from './data/nftData';
// import {
//   ArrowBack,
//   Favorite,
//   FavoriteBorder,
//   Fullscreen,
//   Share,
// } from '@mui/icons-material';

// import { ExpandLess, ExpandMore } from '@mui/icons-material';
// import { Collapse } from '@mui/material';
// import { useEthPrice } from '@/hooks/useEthPrice';

// export default function NFTDetail() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [imgUrls, setImgUrls] = useState<string[]>([]);

//   const nft = nftData.find((item) => item.id === Number(id));

//   const ethPrice = useEthPrice();

//   const [openSections, setOpenSections] = useState({
//     description: true,
//     details: true,
//     properties: true,
//     activity: true,
//   });

//   const toggleSection = (section: keyof typeof openSections) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     if (!nft) return;
//     if (Array.isArray(nft.img)) {
//       const urls = nft.img.map((file) => URL.createObjectURL(file));
//       setImgUrls(urls);
//       return () => urls.forEach((url) => URL.revokeObjectURL(url));
//     } else {
//       setImgUrls([nft.img]);
//     }
//   }, [nft]);

//   if (!nft)
//     return (
//       <Box sx={{ textAlign: 'center', color: '#fff', py: 10 }}>
//         <Typography>Not found</Typography>
//       </Box>
//     );

//   // chuyển đổi tỉ giá

//   const priceNumber = nft.price
//     ? Number(nft.price.toUpperCase().replace('ETH', '').trim())
//     : 0;

//   const ethAmount = Number(nft.price.replace(' ETH', ''));

//   const usdPrice =
//     ethPrice !== null
//       ? (ethAmount * ethPrice).toLocaleString('en-US', {
//           style: 'currency',
//           currency: 'USD',
//         })
//       : '...';

//   return (
//     <>
//       <Box
//         sx={{
//           color: 'white',
//           px: { xs: 2, md: 6 },
//           py: { xs: 6, md: 10 },
//           maxWidth: 1400,
//           mx: 'auto',
//           fontFamily: '"Orbitron", sans-serif',
//           position: 'relative', // để glow nằm dưới
//           zIndex: 1,
//           // background: 'linear-gradient(180deg, #0d012b 0%, #120038 100%)',
//           minHeight: '100vh',
//         }}
//       >
//         {/* ✨ Glow Effects */}
//         <Box
//           className="glow"
//           sx={{
//             // '--glow-top': '-4%',
//             // '--glow-left': '2%',
//             '--glow-size': '50px',
//             '--glow-color1': 'rgba(214,34,218,0.6)',
//             '--glow-color2': 'rgba(214,34,218,0.4)',
//             '--glow-blur': '140px',
//             '--glow-opacity': '1',
//             position: 'absolute',
//             top: '-3%',
//             left: '86%',
//             width: '35%',
//             height: '35%',
//             zIndex: 0, // glow phía sau
//             display: { xs: 'none', md: 'block' },
//           }}
//         />

//         <Box
//           className="glow"
//           sx={{
//             // '--glow-top': '-4%',
//             // '--glow-left': '2%',
//             '--glow-size': '50px',
//             '--glow-color1': 'rgba(214,34,218,0.6)',
//             '--glow-color2': 'rgba(214,34,218,0.4)',
//             '--glow-blur': '140px',
//             '--glow-opacity': '1',
//             position: 'absolute',
//             top: '65%',
//             left: '-20%',
//             width: '30%',
//             height: '40%',
//             zIndex: 0, // glow phía sau
//             display: { xs: 'none', md: 'block' },
//           }}
//         />

//         <Stack
//           direction={{ xs: 'column', md: 'row' }}
//           spacing={{ xs: 4, md: 8 }}
//           alignItems="flex-start"
//           mb={14}
//         >
//           {/* Left Image */}
//           <Box sx={{ flex: 1, width: '100%' }}>
//             <Card
//               sx={{
//                 flexShrink: 0,
//                 width: { xs: '100%', md: '100%' },
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 position: 'relative',
//                 // boxShadow: '0 0 40px #9230FF55',
//                 border: '2px solid #2A145A',
//                 bgcolor: 'rgba(17,24,39,0.5)', // 👈 chỉ nền mờ 30%
//               }}
//             >
//               {imgUrls.map((src, idx) => (
//                 <Image
//                   key={idx}
//                   src={src}
//                   alt={nft.name}
//                   width={800}
//                   height={800}
//                   style={{
//                     width: '100%',
//                     height: 'auto',
//                     borderRadius: '25px',
//                     objectFit: 'cover',
//                     padding: '1.1rem',
//                   }}
//                   priority={true}
//                 />
//               ))}
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   top: 20,
//                   right: 20,
//                   cursor: 'pointer',
//                   bgcolor: liked ? '#fff' : 'rgba(31, 41, 55, 0.6)', // nền mờ khi chưa like, nền trắng khi like
//                   p: 1.2,
//                   borderRadius: '50%',
//                   boxShadow: '0 0 10px rgba(0,0,0,0.3)',
//                   transition: 'all 0.3s ease',
//                   backdropFilter: 'blur(4px)',
//                   '&:hover': {
//                     bgcolor: liked ? '#fff' : 'rgba(255,76,253,0.8)', // khi hover đổi sang màu hồng mờ
//                     transform: 'scale(1.05)',
//                   },
//                 }}
//                 onClick={() => setLiked(!liked)}
//               >
//                 {liked ? (
//                   <Favorite
//                     sx={{
//                       fontSize: 25,
//                       color: '#FF4CFD', // màu hồng neon khi like
//                       transition: 'color 0.3s',
//                     }}
//                   />
//                 ) : (
//                   <FavoriteBorder
//                     sx={{
//                       fontSize: 25,
//                       color: '#fff', // viền trắng khi chưa like
//                       transition: 'color 0.3s',
//                     }}
//                   />
//                 )}
//               </Box>
//             </Card>

//             <Box>
//               <Stack direction="row" spacing={2} mt={2} justifyContent="center">
//                 {[
//                   { icon: <Fullscreen />, label: 'View Fullscreen' },
//                   { icon: <Share />, label: 'Share' },
//                 ].map((btn, idx) => (
//                   <Button
//                     key={idx}
//                     sx={{
//                       flex: 1,
//                       color: '#fff',
//                       bgcolor: 'rgba(31,41,55,1)',
//                       borderRadius: 2,
//                       display: 'flex',
//                       flexDirection: 'row', // ngang
//                       alignItems: 'center', // canh giữa theo trục dọc
//                       justifyContent: 'center',
//                       py: 0.8,
//                       textTransform: 'none',
//                       '&:hover': {
//                         bgcolor: '#19212c',
//                       },
//                     }}
//                   >
//                     {btn.icon}
//                     <Typography sx={{ ml: 1 }}>{btn.label}</Typography>
//                   </Button>
//                 ))}
//               </Stack>
//             </Box>

//             {/* Properties */}
//             {nft.properties && (
//               <Box
//                 mt={4}
//                 sx={{
//                   bgcolor: 'rgba(17,24,39,0.5)',
//                   p: 3,
//                   borderRadius: 3,
//                   mt: 7,
//                   border: '1px solid #2D155A',
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => toggleSection('properties')}
//                 >
//                   <Typography variant="h6">Properties</Typography>
//                   {openSections.properties ? (
//                     <ExpandLess sx={{ color: '#B983FF' }} />
//                   ) : (
//                     <ExpandMore sx={{ color: '#B983FF' }} />
//                   )}
//                 </Box>

//                 <Collapse in={openSections.properties}>
//                   <Stack
//                     direction="column"
//                     // flexWrap="wrap"
//                     gap={1}
//                     sx={{
//                       // bgcolor: '#0F0F25',
//                       // p: 2,
//                       borderRadius: 2,
//                       mt: 2,
//                     }}
//                   >
//                     {nft.properties.map((prop, i) => (
//                       <Box
//                         key={i}
//                         sx={{
//                           display: 'flex',
//                           justifyContent: 'space-between',
//                           alignItems: 'center',
//                           bgcolor: 'rgba(31,41,55,0.5)',
//                           borderRadius: 2,
//                           py: 3,
//                           pr: {xs:1, md: 6},
//                           pl: {xs:1, md: 9},
//                           minWidth: { xs:160, md: 140},
//                           flex: '1 1 70px',
//                           border: '1.2px solid #2A2A4A',
//                         }}
//                       >
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: '#fff5',
//                             // textTransform: 'uppercase',
//                             letterSpacing: 0.5,
//                           }}
//                         >
//                           {prop.trait_type}
//                         </Typography>
//                         <Typography color="white">{prop.value}</Typography>
//                         <Typography variant="caption" sx={{ color: '#9333EA' }}>
//                           {prop.rarity}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Stack>
//                 </Collapse>
//               </Box>
//             )}
//           </Box>

//           {/* Right Content */}
//           <Box sx={{ flex: 1, width: '100%' }}>
//             {/* Breadcrumb: sẽ dẫn đến trang collection và Cyber Punks Collection thì là tên collection */}
//             <Typography
//               onClick={() => router.push('/marketplace')}
//               sx={{
//                 color: '#B983FF',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 0.8,
//                 mb: 4,
//                 cursor: 'pointer',
//                 fontSize: 14,
//                 // textTransform: 'uppercase',
//                 letterSpacing: 1,
//                 transition: 'color 0.3s',
//                 '&:hover': { color: '#E0AFFF' },
//                 // ml: 'auto',
//                 // transform: 'translateX(50%)',
//               }}
//             >
//               <ArrowBack sx={{ fontSize: 20 }} />
//               Cyber Punks Collection
//             </Typography>

//             <Typography
//               variant="h4"
//               fontWeight={600}
//               sx={{ fontSize: { xs: 26, md: 40 } }}
//             >
//               {nft.name}
//             </Typography>

//             <Box
//               sx={{
//                 mt: 1,
//                 fontSize: 14,
//                 display: 'flex',
//                 flexDirection: 'column',
//               }}
//             >
//               {['Created by', 'Owned by'].map((label) => (
//                 <Typography
//                   key={label}
//                   component="div" // thay vì mặc định là <p>
//                   sx={{ color: 'rgba(255, 255, 255, 0.4)' }}
//                 >
//                   {label}{' '}
//                   <Typography
//                     component="span"
//                     sx={{ color: '#fff', fontWeight: 'bold' }}
//                   >
//                     {label === 'Created by'
//                       ? nft.creator || '@Unknown'
//                       : nft.owner || '@Unknown'}
//                   </Typography>
//                 </Typography>
//               ))}
//             </Box>

//             {/* Price */}
//             <Box
//               sx={{
//                 bgcolor: 'rgba(17,24,39,0.5)',
//                 p: 3,
//                 borderRadius: 3,
//                 mt: 3,
//                 border: '1px solid #2D155A',
//               }}
//             >
//               <Typography sx={{ opacity: 0.6, mb: 1.5 }}>
//                 Current Price
//               </Typography>

//               <Typography
//                 variant="h4"
//                 fontWeight={700}
//                 sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}
//               >
//                 {priceNumber} ETH {/* đảm bảo là number */}
//                 <Typography
//                   component="span"
//                   sx={{ fontSize: 15, opacity: 0.6 }}
//                 >
//                   ({usdPrice})
//                 </Typography>
//               </Typography>

//               <Stack
//                 direction={{ xs: 'column', sm: 'row' }}
//                 spacing={2}
//                 mt={2}
//                 width="100%"
//               >
//                 <Button
//                   variant="contained"
//                   sx={{
//                     bgcolor: '#9333ea',
//                     textTransform: 'none',
//                     fontWeight: 700,
//                     width: { xs: '100%', sm: 'auto', md: '50%' },
//                     transition: 'all 0.3s',
//                     boxShadow: '0 0 12px #9230FF88',
//                     p: 1.2,
//                     '&:hover': {
//                       bgcolor: '#A248FF',
//                       boxShadow: '0 0 25px #A248FFAA',
//                       transform: 'translateY(-2px)',
//                     },
//                   }}
//                 >
//                   Buy Now
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   sx={{
//                     borderColor: '#9333ea',
//                     color: '#9333ea',
//                     textTransform: 'none',
//                     fontWeight: 700,
//                     width: { xs: '100%', sm: 'auto', md: '50%' },
//                     '&:hover': {
//                       borderColor: '#A248FF',
//                       color: '#A248FF',
//                       boxShadow: '0 0 15px #A248FF66',
//                       transform: 'translateY(-2px)',
//                     },
//                   }}
//                 >
//                   Make Offer
//                 </Button>
//               </Stack>
//             </Box>

//             {/* Description */}
//             <Box
//               // mt={4}
//               sx={{
//                 bgcolor: 'rgba(17,24,39,0.5)',
//                 p: 3,
//                 borderRadius: 3,
//                 mt: 3,
//                 border: '1px solid #2D155A',
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   cursor: 'pointer',
//                   mb: 1.5,
//                 }}
//                 onClick={() => toggleSection('description')}
//               >
//                 <Typography variant="h6">Description</Typography>
//                 {openSections.description ? (
//                   <ExpandLess sx={{ color: '#B983FF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#B983FF' }} />
//                 )}
//               </Box>

//               <Collapse in={openSections.description}>
//                 <Typography sx={{ opacity: 0.8, mt: 1, lineHeight: 1.6 }}>
//                   A cyberpunk guardian from the neon-lit streets of Neo Tokyo.
//                   This piece represents the fusion of humanity and technology in
//                   a dystopian future where digital consciousness meets physical
//                   reality.
//                 </Typography>
//               </Collapse>
//             </Box>

//             {/* Details */}
//             <Box
//               mt={4}
//               sx={{
//                 bgcolor: 'rgba(17,24,39,0.5)',
//                 p: 3,
//                 borderRadius: 3,
//                 mt: 3,
//                 border: '1px solid #2D155A',
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   cursor: 'pointer',
//                   mb: 3.2,
//                 }}
//                 onClick={() => toggleSection('description')}
//               >
//                 <Typography variant="h6">Details</Typography>
//                 {openSections.description ? (
//                   <ExpandLess sx={{ color: '#B983FF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#B983FF' }} />
//                 )}
//               </Box>

//               <Collapse in={openSections.details}>
//                 <Box sx={{ opacity: 0.8, mt: 1, lineHeight: 1.8 }}>
//                   {[
//                     { label: 'Contract Address', value: nft.contract },
//                     { label: 'Token ID', value: nft.tokenId },
//                     { label: 'Token Standard', value: 'ERC-721' },
//                     { label: 'Blockchain', value: nft.blockchain },
//                   ].map((field) => (
//                     <Box
//                       key={field.label}
//                       sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         mb: 0.5,
//                       }}
//                     >
//                       <Typography sx={{ opacity: 0.5 }}>
//                         {field.label}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color:
//                             field.value === nft.contract ? '#9333ea' : '#fff',
//                           // fontWeight: field.value === nft.contract ? 700 : 400,
//                         }}
//                       >
//                         {field.value || 'N/A'}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Box>
//               </Collapse>
//             </Box>

//             {/* Activity */}
//             <Box
//               mt={5}
//               sx={{
//                 bgcolor: 'rgba(17,24,39,0.5)',
//                 p: 3,
//                 borderRadius: 3,
//                 mt: 3,
//                 border: '1px solid #2D155A',
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   cursor: 'pointer',
//                   mb: 3.2,
//                 }}
//                 onClick={() => toggleSection('activity')}
//               >
//                 <Typography variant="h6">Activity</Typography>
//                 {openSections.activity ? (
//                   <ExpandLess sx={{ color: '#B983FF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#B983FF' }} />
//                 )}
//               </Box>

//               <Collapse in={openSections.activity}>
//                 <Box sx={{ mt: 2, opacity: 0.8, fontSize: 12 }}>
//                   {nft.activity?.map((act, idx) => {
//                     const images: Record<string, string> = {
//                       listed: '/marketplace/listed.png',
//                       sold: '/marketplace/sold.png',
//                       minted: '/marketplace/minted.png',
//                     };
//                     const title =
//                       act.type === 'listed'
//                         ? `Listed for ${act.price}`
//                         : act.type === 'sold'
//                           ? `Sold for ${act.price}`
//                           : 'Minted';
//                     const subtitle =
//                       act.type === 'listed'
//                         ? `by ${act.actor || '@Unknown'} • ${act.time}`
//                         : act.type === 'sold'
//                           ? `from ${act.actor || '@Unknown'} to ${act.target || '@Unknown'} • ${act.time}`
//                           : `by ${act.actor || '@Unknown'} • ${act.time}`;

//                     return (
//                       <Box key={idx}>
//                         <Box
//                           sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: 1,
//                             py: 1,
//                           }}
//                         >
//                           <Image
//                             src={images[act.type]}
//                             alt={act.type}
//                             width={15}
//                             height={15}
//                             style={{
//                               width: '15px',
//                               height: 'auto',
//                               objectFit: 'cover',
//                             }}
//                             priority
//                           />
//                           <Box>
//                             <Typography sx={{ color: '#fff', fontWeight: 700 }}>
//                               {title}
//                             </Typography>
//                             <Typography sx={{ color: '#fff6' }}>
//                               {subtitle}
//                             </Typography>
//                           </Box>
//                         </Box>

//                         {/* Divider giữa các activity, trừ item cuối cùng */}
//                         {idx < (nft.activity?.length || 0) - 1 && (
//                           <Divider sx={{ bgcolor: '#2D155A', my: 1 }} />
//                         )}
//                       </Box>
//                     );
//                   })}
//                 </Box>
//               </Collapse>
//             </Box>
//           </Box>
//         </Stack>

//         {/* Divider */}
//         {/* <Divider sx={{ my: 6, bgcolor: '#2D155A' }} /> */}

//         {/* More from this Collection */}
//         <Box>
//           <Typography
//             variant="h5"
//             fontWeight={700}
//             mb={1}
//             sx={{ textAlign: { xs: 'center', md: 'left' } }}
//           >
//             More from this Collection
//           </Typography>

//           <Stack
//             direction="row"
//             spacing={3}
//             overflow="auto"
//             sx={{ py: 3, justifyContent: { xs: 'center', md: 'center' } }}
//           >
//             {nftData
//               .filter(
//                 (item) =>
//                   item.collection === 'Cyber Punks' && item.id !== Number(id),
//               ) // skip NFT đang chọn
//               .slice(0, 4)
//               .map((item) => {
//                 const itemImgs = Array.isArray(item.img)
//                   ? item.img.map((f) => URL.createObjectURL(f))
//                   : [item.img];
//                 return (
//                   <Card
//                     key={item.id}
//                     sx={{
//                       width: 300,
//                       // bgcolor: '#1A1A2E',
//                       borderRadius: 3,
//                       border: '2px solid #2A145A',
//                       bgcolor: 'rgba(17,24,39,0.5)',
//                       overflow: 'hidden',
//                       cursor: 'pointer',
//                       transition: '0.3s',
//                       flexShrink: 0,
//                       '&:hover': {
//                         // transform: 'translateY(-6px)',
//                         boxShadow: '0 0 15px #A248FFAA',
//                       },
//                     }}
//                   >
//                     {itemImgs.map((src, idx) => (
//                       <Image
//                         key={idx}
//                         src={src}
//                         alt={item.name}
//                         width={230}
//                         height={230}
//                         style={{
//                           width: '100%',
//                           height: 'auto',
//                           borderRadius: '25px',
//                           objectFit: 'cover',
//                           padding: '1.1rem',
//                         }}
//                       />
//                     ))}
//                     <Box px={2} pb={2.2}>
//                       <Typography
//                         fontSize={14}
//                         fontWeight={600}
//                         color="#fff"
//                         pb={1.5}
//                       >
//                         {item.name}
//                       </Typography>
//                       <Typography
//                         sx={{ fontSize: 15, color: '#9333EA', fontWeight: 600 }}
//                       >
//                         {item.price}
//                       </Typography>
//                     </Box>
//                   </Card>
//                 );
//               })}
//           </Stack>
//         </Box>
//       </Box>
//     </>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   Stack,
//   Divider,
//   Collapse,
// } from '@mui/material';
// import Image from 'next/image';
// import {
//   ArrowBack,
//   Favorite,
//   FavoriteBorder,
//   Fullscreen,
//   Share,
//   ExpandLess,
//   ExpandMore,
// } from '@mui/icons-material';
// import { useAllProducts } from '@/hooks/useAllProducts';
// import { useProductActivity } from '@/hooks/useProductActivity';
// import { Product } from '@/services/product_allService';

// export default function NFTDetail() {
//   const { id } = useParams();
//   const router = useRouter();
//   const { data: products } = useAllProducts();
//   const nft: Product | undefined = products?.find((p) => p.id === Number(id));

//    const { data: activity = [] } = useProductActivity(nft.id);

//   const [liked, setLiked] = useState(false);
//   const [openSections, setOpenSections] = useState({
//     description: true,
//     details: true,
//     properties: true,
//     activity: true,
//   });

//   const toggleSection = (section: keyof typeof openSections) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   if (!nft)
//     return (
//       <Box sx={{ textAlign: 'center', color: '#fff', py: 10 }}>
//         <Typography>NFT not found</Typography>
//         <Button onClick={() => router.push('/marketplace')}>Back</Button>
//       </Box>
//     );

//   // Lấy giá ETH -> USD nếu có hook
//   const ethAmount = nft.price || 0;
//   const usdPrice = ethAmount ? `$${(ethAmount * 2000).toLocaleString()}` : '...'; // tạm hardcode 1 ETH = 2000 USD

//   return (
//     <Box
//       sx={{
//         color: 'white',
//         px: { xs: 2, md: 6 },
//         py: { xs: 6, md: 10 },
//         maxWidth: 1400,
//         mx: 'auto',
//         fontFamily: '"Orbitron", sans-serif',
//         position: 'relative',
//         minHeight: '100vh',
//       }}
//     >
//       {/* Breadcrumb */}
//       <Typography
//         onClick={() => router.push('/marketplace')}
//         sx={{
//           color: '#B983FF',
//           display: 'flex',
//           alignItems: 'center',
//           gap: 0.8,
//           mb: 4,
//           cursor: 'pointer',
//           fontSize: 14,
//           letterSpacing: 1,
//           transition: 'color 0.3s',
//           '&:hover': { color: '#E0AFFF' },
//         }}
//       >
//         <ArrowBack sx={{ fontSize: 20 }} /> Cyber Punks Collection
//       </Typography>

//       <Stack
//         direction={{ xs: 'column', md: 'row' }}
//         spacing={{ xs: 4, md: 8 }}
//         alignItems="flex-start"
//         mb={14}
//       >
//         {/* Left: Image & properties */}
//         <Box sx={{ flex: 1 }}>
//           <Card
//             sx={{
//               borderRadius: 3,
//               overflow: 'hidden',
//               position: 'relative',
//               border: '2px solid #2A145A',
//               bgcolor: 'rgba(17,24,39,0.5)',
//             }}
//           >
//             <Image
//               src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
//               alt={nft.name}
//               width={800}
//               height={800}
//               style={{ width: '100%', height: 'auto', borderRadius: '25px' }}
//               priority
//             />

//             {/* Like button */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 top: 20,
//                 right: 20,
//                 cursor: 'pointer',
//                 bgcolor: liked ? '#fff' : 'rgba(31, 41, 55, 0.6)',
//                 p: 1.2,
//                 borderRadius: '50%',
//                 boxShadow: '0 0 10px rgba(0,0,0,0.3)',
//                 transition: 'all 0.3s ease',
//                 backdropFilter: 'blur(4px)',
//                 '&:hover': {
//                   bgcolor: liked ? '#fff' : 'rgba(255,76,253,0.8)',
//                   transform: 'scale(1.05)',
//                 },
//               }}
//               onClick={() => setLiked(!liked)}
//             >
//               {liked ? (
//                 <Favorite sx={{ fontSize: 25, color: '#FF4CFD' }} />
//               ) : (
//                 <FavoriteBorder sx={{ fontSize: 25, color: '#fff' }} />
//               )}
//             </Box>
//           </Card>

//           {/* Properties */}
//           {nft.properties?.length > 0 && (
//             <Box
//               mt={4}
//               sx={{
//                 bgcolor: 'rgba(17,24,39,0.5)',
//                 p: 3,
//                 borderRadius: 3,
//                 mt: 7,
//                 border: '1px solid #2D155A',
//               }}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   cursor: 'pointer',
//                 }}
//                 onClick={() => toggleSection('properties')}
//               >
//                 <Typography variant="h6">Properties</Typography>
//                 {openSections.properties ? (
//                   <ExpandLess sx={{ color: '#B983FF' }} />
//                 ) : (
//                   <ExpandMore sx={{ color: '#B983FF' }} />
//                 )}
//               </Box>

//               <Collapse in={openSections.properties}>
//                 <Stack direction="column" gap={1} mt={2}>
//                   {nft.properties.map((prop, i) => (
//                     <Box
//                       key={i}
//                       sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         bgcolor: 'rgba(31,41,55,0.5)',
//                         borderRadius: 2,
//                         py: 3,
//                         px: 3,
//                         border: '1.2px solid #2A2A4A',
//                       }}
//                     >
//                       <Typography variant="caption" sx={{ color: '#fff5' }}>
//                         {prop.type}
//                       </Typography>
//                       <Typography>{prop.name}</Typography>
//                       <Typography variant="caption" sx={{ color: '#9333EA' }}>
//                         {prop.supply}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Stack>
//               </Collapse>
//             </Box>
//           )}
//         </Box>

//         {/* Right: Info */}
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="h4" fontWeight={600}>
//             {nft.name}
//           </Typography>

//           <Box mt={1} fontSize={14}>
//             <Typography>
//   Created by:{' '}
//   <strong>
//     {(Array.isArray(nft.creator) ? nft.creator : [nft.creator])
//       .filter(Boolean)
//       .map((c) => c.userName)
//       .join(', ') || '@Unknown'}
//   </strong>
// </Typography>

// <Typography>
//   Owned by:{' '}
//   <strong>
//     {(Array.isArray(nft.ownedBy) ? nft.ownedBy : [nft.ownedBy])
//       .filter(Boolean)
//       .map((o) => o.userName)
//       .join(', ') || '@Unknown'}
//   </strong>
// </Typography>

//           </Box>

//           {/* Price */}
//           <Box
//             sx={{
//               bgcolor: 'rgba(17,24,39,0.5)',
//               p: 3,
//               borderRadius: 3,
//               mt: 3,
//               border: '1px solid #2D155A',
//             }}
//           >
//             <Typography sx={{ opacity: 0.6, mb: 1.5 }}>
//               Current Price
//             </Typography>
//             <Typography variant="h4" fontWeight={700}>
//               {ethAmount} ETH ({usdPrice})
//             </Typography>

//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
//               <Button
//                 variant="contained"
//                 sx={{
//                   bgcolor: '#9333ea',
//                   textTransform: 'none',
//                   fontWeight: 700,
//                   width: { xs: '100%', sm: '50%' },
//                 }}
//               >
//                 Buy Now
//               </Button>
//               <Button
//                 variant="outlined"
//                 sx={{
//                   borderColor: '#9333ea',
//                   color: '#9333ea',
//                   textTransform: 'none',
//                   fontWeight: 700,
//                   width: { xs: '100%', sm: '50%' },
//                 }}
//               >
//                 Make Offer
//               </Button>
//             </Stack>
//           </Box>

//           {/* Activity */}
//           <Box
//             mt={5}
//             sx={{
//               bgcolor: 'rgba(17,24,39,0.5)',
//               p: 3,
//               borderRadius: 3,
//               border: '1px solid #2D155A',
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 cursor: 'pointer',
//               }}
//               onClick={() => toggleSection('activity')}
//             >
//               <Typography variant="h6">Activity</Typography>
//               {openSections.activity ? (
//                 <ExpandLess sx={{ color: '#B983FF' }} />
//               ) : (
//                 <ExpandMore sx={{ color: '#B983FF' }} />
//               )}
//             </Box>

//             <Collapse in={openSections.activity}>
//   <Stack mt={2} gap={2}>
//     {(Array.isArray(activity) ? activity : []).map((act) => (
//       <Box key={act.id}>
//         <Box display="flex" gap={1} alignItems="center">
//           <Typography fontWeight={700}>{act.eventType}</Typography>
//                     </Box>
//                     <Divider sx={{ bgcolor: '#2D155A', my: 1 }} />
//                   </Box>
//                 ))}
//               </Stack>
//             </Collapse>
//           </Box>
//         </Box>
//       </Stack>
//     </Box>
//   );
// }

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Divider,
  Collapse,
} from '@mui/material';
import Image from 'next/image';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useAllProducts } from '@/hooks/useAllProducts';
import { useProductActivity } from '@/hooks/useProductActivity';
import { Product, ProductOwner } from '@/services/product_allService';
import { ProductActivity } from '@/services/activityService';

export default function NFTDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: products } = useAllProducts();
  const nft: Product | undefined = products?.find((p) => p.id === Number(id));
  const { data: activity = [] } = useProductActivity(nft?.id ?? 0);

  const [liked, setLiked] = useState(false);
  const [openSections, setOpenSections] = useState({
    properties: true,
    activity: true,
    details: true,
    description: true,
  });

  const toggleSection = (section: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  if (!nft)
    return (
      <Box sx={{ textAlign: 'center', color: '#fff', py: 10 }}>
        <Typography>NFT not found</Typography>
        <Button onClick={() => router.push('/marketplace')}>Back</Button>
      </Box>
    );

  // const blockchain = nft.properties[0]?.blockchain || 'N/A';
  const ethAmount = nft.price || 0;
  const usdPrice = `$${(ethAmount * 2000).toLocaleString()}`;
  const creators = Array.isArray(nft.creator)
    ? nft.creator
    : nft.creator
      ? [nft.creator]
      : [];
  const owners: ProductOwner[] = Array.isArray(nft.ownedBy)
    ? nft.ownedBy
    : nft.ownedBy
      ? [nft.ownedBy]
      : [];
  const safeActivity: ProductActivity[] = Array.isArray(activity)
    ? activity
    : [];

  return (
    <Box
      sx={{
        color: 'white',
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        maxWidth: 1400,
        mx: 'auto',
        fontFamily: '"Orbitron", sans-serif',
      }}
    >
      {/* Breadcrumb */}
      <Typography
        onClick={() => router.push('/marketplace')}
        sx={{
          color: '#B983FF',
          display: 'flex',
          alignItems: 'center',
          gap: 0.8,
          mb: 4,
          cursor: 'pointer',
          fontSize: 14,
          '&:hover': { color: '#E0AFFF' },
        }}
      >
        <ArrowBack sx={{ fontSize: 20 }} /> Cyber Punks Collection
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={{ xs: 4, md: 8 }}
        alignItems="flex-start"
      >
        {/* Left: Image + Properties */}
        <Box sx={{ flex: 1 }}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              border: '2px solid #2A145A',
              bgcolor: 'rgba(17,24,39,0.5)',
            }}
          >
            <Image
              src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
              alt={nft.name}
              width={800}
              height={800}
              style={{ width: '100%', height: 'auto', borderRadius: '25px' }}
              priority
            />
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                cursor: 'pointer',
                bgcolor: liked ? '#fff' : 'rgba(31,41,55,0.6)',
                p: 1.2,
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: liked ? '#fff' : 'rgba(255,76,253,0.8)',
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <Favorite sx={{ fontSize: 25, color: '#FF4CFD' }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 25, color: '#fff' }} />
              )}
            </Box>
          </Card>

          {/* Properties */}
          {nft.properties?.length > 0 && (
            <Box
              mt={4}
              sx={{
                bgcolor: 'rgba(17,24,39,0.5)',
                p: 3,
                borderRadius: 3,
                border: '1px solid #2D155A',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
                onClick={() => toggleSection('properties')}
              >
                <Typography variant="h6">Properties</Typography>
                {openSections.properties ? (
                  <ExpandLess sx={{ color: '#B983FF' }} />
                ) : (
                  <ExpandMore sx={{ color: '#B983FF' }} />
                )}
              </Box>
              <Collapse in={openSections.properties}>
                <Stack mt={2} gap={1}>
                  {nft.properties.map((prop, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        bgcolor: 'rgba(31,41,55,0.5)',
                        p: 2,
                        borderRadius: 2,
                        border: '1.2px solid #2A2A4A',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#fff5' }}>
                        {prop.type}
                      </Typography>
                      <Typography>{prop.name}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Collapse>
            </Box>
          )}
        </Box>

        {/* Right: Info */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            {nft.name}
          </Typography>

          {/* Creator / Owner */}
          <Box mt={1} fontSize={14}>
            <Typography sx={{ color: '#9CA3AF' }}>
              Created by:{' '}
              <strong style={{ color: '#FFF', fontWeight: 500 }}>
                @{nft.creator?.userName || 'Unknown'}
              </strong>
            </Typography>
            <Typography sx={{ color: '#9CA3AF' }}>
              Owned by:{' '}
              <strong style={{ color: '#FFF', fontWeight: 500 }}>
                @{nft.ownedBy?.map((o) => o.userName).join(', ') || 'Unknown'}
              </strong>
            </Typography>
          </Box>

          {/* Price */}
          <Box
            sx={{
              bgcolor: 'rgba(17,24,39,0.5)',
              p: 3,
              borderRadius: 3,
              mt: 3,
              border: '1px solid #2D155A',
            }}
          >
            <Typography sx={{ opacity: 0.6, mb: 1.5, color: '#E5E7EB' }}>
              Current Price
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              {ethAmount} ETH{' '}
              <Typography sx={{ opacity: 0.6, mb: 1.5, color: '#E5E7EB' }}>
                ({usdPrice})
              </Typography>
            </Typography>
            {/* {nft.isForSale && <Typography sx={{ mt: 1, color: '#fff6' }}>For Sale</Typography>} */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#9333ea',
                  textTransform: 'none',
                  fontWeight: 700,
                  width: '100%',
                }}
              >
                Buy Now
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#9333ea',
                  color: '#9333ea',
                  textTransform: 'none',
                  fontWeight: 700,
                  width: '100%',
                }}
              >
                Make Offer
              </Button>
            </Stack>
          </Box>

          {/* Description */}
          <Box
            mt={4}
            sx={{
              bgcolor: 'rgba(17,24,39,0.5)',
              p: 3,
              borderRadius: 3,
              border: '1px solid #2D155A',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('description')}
            >
              <Typography variant="h6" color="#FFF" sx={{ fontWeight: 400 }}>
                Description
              </Typography>
              {openSections.description ? (
                <ExpandLess sx={{ color: '#FFF' }} />
              ) : (
                <ExpandMore sx={{ color: '#FFF' }} />
              )}
            </Box>
            <Collapse in={openSections.description}>
              <Stack mt={2} spacing={1}>
                <Typography sx={{ color: '#D1D5DB', fontWeight: 300 }}>
                  Description: {nft.description}
                </Typography>
              </Stack>
            </Collapse>
          </Box>

          {/* Details */}
          <Box
            mt={4}
            sx={{
              bgcolor: 'rgba(17,24,39,0.5)',
              p: 3,
              borderRadius: 3,
              border: '1px solid #2D155A',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('details')}
            >
              <Typography variant="h6" color='#FFF' sx={{ fontWeight: 400}}>Details</Typography>
              {openSections.details ? (
                <ExpandLess sx={{ color: '#FFF' }} />
              ) : (
                <ExpandMore sx={{ color: '#FFF' }} />
              )}
            </Box>
            <Collapse in={openSections.details}>
              <Stack mt={2} spacing={1} sx={{ color: '#D1D5DB', fontWeight: 300 }}>
                <Typography sx={{ color: '#9CA3AF'}}>
                  Contract Address: <strong style={{ color:'#9333ea'}}>{nft.contractAddress}</strong>
                </Typography>
                <Typography sx={{ color: '#9CA3AF'}}>Token ID: {nft.tokenId}</Typography>
                <Typography sx={{ color: '#9CA3AF'}}>Supply: {nft.supply}</Typography>
                <Typography sx={{ color: '#9CA3AF'}}>Blockchain: {nft.blockchain}</Typography>
                {/* <Typography>Supply: {nft.supply}</Typography> */}
              </Stack>
            </Collapse>
          </Box>

          {/* Activity */}
          <Box
            mt={5}
            sx={{
              bgcolor: 'rgba(17,24,39,0.5)',
              p: 3,
              borderRadius: 3,
              border: '1px solid #2D155A',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
              onClick={() => toggleSection('activity')}
            >
              <Typography variant="h6">Activity</Typography>
              {openSections.activity ? (
                <ExpandLess sx={{ color: '#B983FF' }} />
              ) : (
                <ExpandMore sx={{ color: '#B983FF' }} />
              )}
            </Box>
            <Collapse in={openSections.activity}>
              <Stack mt={2} gap={2}>
                {safeActivity.length > 0 ? (
                  safeActivity.map((act) => (
                    <Box key={act.id}>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        <Typography fontWeight={700}>
                          {act.eventType}
                        </Typography>
                        <Typography>Price: {act.price}</Typography>
                        <Typography>Qty: {act.quantity}</Typography>
                        <Typography>From: {act.fromAddress}</Typography>
                        <Typography>To: {act.toAddress}</Typography>
                        <Typography>
                          Date: {new Date(act.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                      <Divider sx={{ bgcolor: '#2D155A', my: 1 }} />
                    </Box>
                  ))
                ) : (
                  <Typography>No activity yet.</Typography>
                )}
              </Stack>
            </Collapse>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
