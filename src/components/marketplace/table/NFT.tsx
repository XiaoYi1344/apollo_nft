// 'use client';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Button,
//   Box,
//   Stack,
//   FormControl,
//   Select,
//   MenuItem,
//   TextField,
//   InputAdornment,
// } from '@mui/material';
// import Image from 'next/image';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import SearchIcon from '@mui/icons-material/Search';
// import { useState } from 'react';
// import Link from 'next/link';
// import { nftData } from './data/nftData';
// import { useAllProducts } from '@/hooks/useAllProducts';
// import { Product } from '@/services/product_allService';

// const SORT_OPTIONS = ['Latest', 'Price: Low to High', 'Price: High to Low'];

// const NFTTable = () => {
//   const { data: products, isLoading, isError } = useAllProducts();

//   const [visibleCount, setVisibleCount] = useState(8); // số card hiển thị
//   const [expanded, setExpanded] = useState(false); // trạng thái xem tất cả

//   const handleToggle = () => {
//     if (!expanded) {
//       setVisibleCount(nftData.length); // hiển thị tất cả
//     } else {
//       setVisibleCount(8); // trở về mặc định
//     }
//     setExpanded(!expanded);
//   };

//   const [sort, setSort] = useState('Latest');
//   const [search, setSearch] = useState('');

//   if (isLoading) return <Typography>Loading...</Typography>;
//   if (isError)
//     return <Typography color="error">Failed to load products</Typography>;

//   // Filter + search + sort
//   let filteredProducts = products || [];
//   if (search) {
//     filteredProducts = filteredProducts.filter(
//       (p) =>
//         p.name.toLowerCase().includes(search.toLowerCase()) ||
//         p.creator.some((c) =>
//           c.userName.toLowerCase().includes(search.toLowerCase()),
//         ),
//     );
//   }

//   if (sort === 'Price: Low to High')
//     filteredProducts.sort((a, b) => a.price - b.price);
//   if (sort === 'Price: High to Low')
//     filteredProducts.sort((a, b) => b.price - a.price);

//   return (
//     <>
//       <Stack
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           mb: 1,
//         }}
//       >
//         <Box sx={{ flexBasis: { xs: '100%', md: '49%' } }}>
//           <TextField
//             variant="outlined"
//             placeholder="Search by name, collection, or creator"
//             fullWidth
//             size="small"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon
//                     fontSize="small"
//                     sx={{ color: 'rgba(255,255,255,0.6)' }}
//                   />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               mb: 1.5,
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 1.5,
//                 background: 'rgba(255,255,255,0.2)',
//                 input: { p: 0.8 },
//                 color: 'white',
//                 '& .MuiOutlinedInput-input::placeholder': {
//                   color: 'rgba(255,255,255,0.6)',
//                 },
//               },
//             }}
//           />
//         </Box>
//         <Box sx={{ flexBasis: { xs: '100%', md: '18%' } }}>
//           <FormControl fullWidth size="small">
//             <Select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               sx={{
//                 bgcolor: 'white',
//                 borderRadius: 1.5,
//                 textTransform: 'none',
//               }}
//             >
//               {SORT_OPTIONS.map((option) => (
//                 <MenuItem key={option} value={option}>
//                   {option}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//       </Stack>

//       <Grid container spacing={3} marginBottom={14}>
//         {/* {nftData.slice(0, visibleCount).map((nft, index) => ( */}
//         {filteredProducts.slice(0, visibleCount).map((nft: Product) => (
//           // <Grid size={{ xs: 12, sm: 6, md: 3 }} key={nft.id} key={index}>
//            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={nft.id}>
//             <Link
//               href={`/marketplace/${nft.id}`}
//               style={{ textDecoration: 'none' }}
//             >
//               <Card
//                 sx={{
//                   bgcolor: 'rgba(255,255,255)',
//                   borderRadius: 3,
//                   overflow: 'hidden',
//                   color: 'black',
//                   transition: '0.3s',
//                   '&:hover': {
//                     transform: 'translateY(-6px)',
//                     boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
//                   },
//                 }}
//               >
//                 {/* {Array.isArray(nft.img) ? (
//                   nft.img.map((file, index) => (
//                     <Image
//                       key={index}
//                       src={URL.createObjectURL(file)}
//                       alt={nft.name}
//                       width={400}
//                       height={300}
//                       style={{ width: '100%', height: 'auto' }}
//                     />
//                   ))
//                 ) : (
//                   <Image
//                     src={nft.img}
//                     alt={nft.name}
//                     width={400}
//                     height={300}
//                     style={{ width: 'auto', height: 'auto' }}
//                   />
//                 )}

//                 <CardContent>
//                   <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
//                     {nft.collection}
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                     {nft.name}
//                   </Typography>
//                   <Box
//                     sx={{
//                       mt: 1.2,
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{ fontWeight: 549.5, fontSize: '1.0rem' }}
//                     >
//                       {nft.price}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         fontWeight: 400,
//                         fontSize: '0.82rem',
//                         opacity: 0.5,
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: 0.3,
//                       }}
//                     >
//                       <FavoriteBorderIcon
//                         sx={{ fontSize: '0.85rem', strokeWidth: 1 }}
//                       />
//                       {nft.likes}
//                     </Typography>
//                   </Box>
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{ mt: 2, bgcolor: '#9230FF', textTransform: 'none' }}
//                   >
//                     Buy Now
//                   </Button>
//                 </CardContent> */}

//                 <Card
//   sx={{
//     bgcolor: 'rgba(255,255,255)',
//     borderRadius: 3,
//     overflow: 'hidden',
//     color: 'black',
//     transition: '0.3s',
//     '&:hover': {
//       transform: 'translateY(-6px)',
//       boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
//     },
//   }}
// >
//   <Image
//     src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
//     alt={nft.name}
//     width={400}
//     height={300}
//     style={{ width: '100%', height: 'auto' }}
//   />

//   <CardContent>
//     <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
//       {nft.properties.map((p) => p.type).join(', ')}
//     </Typography>
//     <Typography variant="h6" sx={{ fontWeight: 500 }}>
//       {nft.name}
//     </Typography>
//     <Box
//       sx={{
//         mt: 1.2,
//         display: 'flex',
//         justifyContent: 'space-between',
//       }}
//     >
//       <Typography
//         variant="body2"
//         sx={{ fontWeight: 549.5, fontSize: '1.0rem' }}
//       >
//         {nft.price} ETH
//       </Typography>
//       <Typography
//         variant="body2"
//         sx={{
//           fontWeight: 400,
//           fontSize: '0.82rem',
//           opacity: 0.5,
//           display: 'flex',
//           alignItems: 'center',
//           gap: 0.3,
//         }}
//       >
//         <FavoriteBorderIcon
//           sx={{ fontSize: '0.85rem', strokeWidth: 1 }}
//         />
//         {/* {nft.likes || 0} */}
//       </Typography>
//     </Box>
//     <Button
//       variant="contained"
//       fullWidth
//       sx={{ mt: 2, bgcolor: '#9230FF', textTransform: 'none' }}
//     >
//       Buy Now
//     </Button>
//   </CardContent>
// </Card>

//               </Card>
//             </Link>
//           </Grid>
//         ))}

//         {/* Load More / See Less */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             mt: 3,
//             width: '100%',
//           }}
//         >
//           <Button
//             variant="contained"
//             sx={{
//               p: '6px 12px',
//               borderRadius: 1.5,
//               bgcolor: '#232A33',
//               color: 'white',
//               width: 125,
//               textTransform: 'none',
//             }}
//             onClick={handleToggle}
//           >
//             {expanded ? 'See Less' : 'Load More'}
//           </Button>
//         </Box>
//       </Grid>
//     </>
//   );
// };

// export default NFTTable;
'use client';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Stack,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import Image from 'next/image';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import Link from 'next/link';
import { useAllProducts } from '@/hooks/useAllProducts';
import { Product } from '@/services/product_allService';

const SORT_OPTIONS = ['Latest', 'Price: Low to High', 'Price: High to Low'];

const NFTTable = () => {
  const { data: products, isLoading, isError } = useAllProducts();
  const [visibleCount, setVisibleCount] = useState(8);
  const [expanded, setExpanded] = useState(false);
  const [sort, setSort] = useState('Latest');
  const [search, setSearch] = useState('');

  const handleToggle = () => {
    if (!expanded) {
      setVisibleCount(products?.length || 8);
    } else {
      setVisibleCount(8);
    }
    setExpanded(!expanded);
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError)
    return <Typography color="error">Failed to load products</Typography>;

  // Filter + search
  let filteredProducts: Product[] = Array.isArray(products)
    ? [...products]
    : [];
  if (search) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (Array.isArray(p.creator) &&
          p.creator.some((c) =>
            c.userName.toLowerCase().includes(search.toLowerCase()),
          )),
    );
  }

  // Sort
  if (sort === 'Price: Low to High')
    filteredProducts.sort((a, b) => a.price - b.price);
  if (sort === 'Price: High to Low')
    filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <>
      {/* Search & Sort */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
        mb={2}
      >
        <Box sx={{ flexBasis: { xs: '100%', md: '49%' } }}>
          <TextField
            placeholder="Search by name or creator"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: 'rgba(255,255,255,0.6)' }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                background: 'rgba(255,255,255,0.2)',
                input: { p: 0.8, color: '#fff' },
                '& .MuiOutlinedInput-input::placeholder': {
                  color: 'rgba(255,255,255,0.6)',
                },
              },
            }}
          />
        </Box>
        <Box sx={{ flexBasis: { xs: '100%', md: '18%' } }}>
          <FormControl fullWidth size="small">
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              sx={{
                bgcolor: 'white',
                borderRadius: 1.5,
                textTransform: 'none',
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* NFT Cards */}
      <Grid container spacing={3} mb={14}>
        {filteredProducts.slice(0, visibleCount).map((nft) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={nft.id}>
            <Link
              href={`/marketplace/${nft.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card
                sx={{
                  bgcolor: 'rgba(255,255,255)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  color: 'black',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  },
                }}
              >
                <Image
                  src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
                  alt={nft.name}
                  width={450}
                  height={350}
                  style={{ width: '100%', height: 'auto' }}
                />
                <CardContent>
                  <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
                    {nft.properties.map((p) => p.type).join(', ')}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {nft.name}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1.2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, fontSize: '1rem' }}
                    >
                      {nft.price} ETH
                    </Typography>
                    <FavoriteBorderIcon
                      sx={{ fontSize: '0.85rem', opacity: 0.6 }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, bgcolor: '#9230FF', textTransform: 'none' }}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}

        {/* Load More / See Less */}
        <Box display="flex" justifyContent="center" mt={3} width="100%">
          <Button
            variant="contained"
            onClick={handleToggle}
            sx={{
              p: '6px 12px',
              borderRadius: 1.5,
              bgcolor: '#232A33',
              color: 'white',
              width: 125,
              textTransform: 'none',
            }}
          >
            {expanded ? 'See Less' : 'Load More'}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default NFTTable;
