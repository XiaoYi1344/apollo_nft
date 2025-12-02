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
// components/NFTTable.tsx
// 'use client';

// import React, { useState } from 'react';
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
// import { ethers } from 'ethers';

// import { useAllProducts } from '@/hooks/useProduct';
// import { Product } from '@/types/product';
// import { marketplaceNFTService } from '@/services/marketplaceService';
// import { useWallet } from '@/hooks/useWallet';

// const SORT_OPTIONS = [
//   'Latest',
//   'Price: Low to High',
//   'Price: High to Low',
// ] as const;

// const NFTTable = () => {
//   const { data: products, isLoading, isError } = useAllProducts();
//   const [visibleCount, setVisibleCount] = useState(8);
//   const [expanded, setExpanded] = useState(false);
//   const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Latest');
//   const [search, setSearch] = useState('');

//   const { signer } = useWallet();

//   const handleToggle = () => {
//     setVisibleCount(expanded ? 8 : products?.length || 8);
//     setExpanded(!expanded);
//   };

//   if (isLoading) return <Typography>Loading...</Typography>;
//   if (isError)
//     return <Typography color="error">Failed to load products</Typography>;

//   // Filter + Search
//   let filteredProducts: Product[] = Array.isArray(products)
//     ? [...products]
//     : [];

//   if (search.trim()) {
//     const q = search.toLowerCase();
//     filteredProducts = filteredProducts.filter(
//       (p) =>
//         p.name.toLowerCase().includes(q) ||
//         (Array.isArray(p.creator) &&
//           p.creator.some((c) => c.userName.toLowerCase().includes(q))),
//     );
//   }

//   // Sort
//   if (sort === 'Price: Low to High')
//     filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
//   if (sort === 'Price: High to Low')
//     filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));

//   // ==== BUY NFT ====
//   const handleBuy = async (nft: Product) => {
//     if (!signer) return alert('Wallet not connected!');
//     if (!nft.listingId) return alert('Listing ID missing!');

//     try {
//       // Convert price string → wei bigint
//       const priceWei = ethers.parseUnits(nft.price.toString(), 18);

//       const tx = await marketplaceNFTService.buyItem(
//         signer,
//         nft.listingId,
//         priceWei
//       );

//       console.log('TX SENT:', tx);
//       alert('Buy successful!');
//     } catch (err) {
//       console.error(err);
//       alert(
//         err instanceof Error
//           ? 'Transaction failed: ' + err.message
//           : 'Transaction failed'
//       );
//     }
//   };

//   return (
//     <Stack>
//       {/* Search / Sort */}
//       <Stack
//         direction={{ xs: 'column', md: 'row' }}
//         justifyContent="space-between"
//         gap={2}
//         mb={3}
//       >
//         <Box sx={{ flexBasis: { xs: '100%', md: '40%' } }}>
//           <TextField
//             placeholder="Search by name or creator"
//             size="small"
//             fullWidth
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
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 1.5,
//                 background: 'rgba(255,255,255,0.2)',
//                 input: { p: 0.8, color: '#fff' },
//                 '& .MuiOutlinedInput-input::placeholder': {
//                   color: 'rgba(255,255,255,0.6)',
//                 },
//               },
//             }}
//           />
//         </Box>

//         <Box sx={{ flexBasis: { xs: '100%', md: '20%' } }}>
//           <FormControl fullWidth size="small">
//             <Select
//               value={sort}
//               onChange={(e) =>
//                 setSort(e.target.value as (typeof SORT_OPTIONS)[number])
//               }
//               sx={{
//                 bgcolor: 'white',
//                 borderRadius: 1.5,
//                 textTransform: 'none',
//               }}
//             >
//               {SORT_OPTIONS.map((opt) => (
//                 <MenuItem key={opt} value={opt}>
//                   {opt}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//       </Stack>

//       {/* NFT Cards */}
//       <Grid container spacing={3}>
//         {filteredProducts.slice(0, visibleCount).map((nft) => (
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} key={nft.id}>
//             <Card
//               sx={{
//                 bgcolor: 'white',
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 color: 'black',
//                 transition: '0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-6px)',
//                   boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
//                 },
//               }}
//             >
//               <Image
//                 src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
//                 alt={nft.name}
//                 width={450}
//                 height={350}
//                 style={{ width: '100%', height: 'auto' }}
//               />
//               <CardContent>
//                 <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
//                   {nft.properties?.map((p) => p.type).join(', ')}
//                 </Typography>

//                 <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                   {nft.name}
//                 </Typography>

//                 <Box
//                   sx={{
//                     mt: 1,
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     sx={{ fontWeight: 500, fontSize: '1rem' }}
//                   >
//                     {nft.price} PZO
//                   </Typography>

//                   <FavoriteBorderIcon
//                     sx={{ fontSize: '0.85rem', opacity: 0.6 }}
//                   />
//                 </Box>

//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{ mt: 2, bgcolor: '#9230FF', textTransform: 'none' }}
//                   onClick={() => handleBuy(nft)}
//                 >
//                   Buy Now
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Load More / See Less */}
//       <Box display="flex" justifyContent="center" mt={3} width="100%">
//         <Button
//           variant="contained"
//           onClick={handleToggle}
//           sx={{
//             p: '6px 12px',
//             borderRadius: 1.5,
//             bgcolor: '#232A33',
//             color: 'white',
//             width: 125,
//             textTransform: 'none',
//           }}
//         >
//           {expanded ? 'See Less' : 'Load More'}
//         </Button>
//       </Box>
//     </Stack>
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
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { BrowserProvider, ethers } from 'ethers';
import { marketplaceNFTService } from '@/services/marketplaceService';
import { useAllProducts } from '@/hooks/useProduct';
import { Product } from '@/types/product';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';

const SORT_OPTIONS = [
  'Latest',
  'Price: Low to High',
  'Price: High to Low',
] as const;

interface NFTTableProps {
  statusSelected: string[];
}

const NFTTable = ({ statusSelected }: NFTTableProps) => {
  const { data: products = [], isLoading, isError } = useAllProducts();

  const [visibleCount, setVisibleCount] = useState(8);
  const [expanded, setExpanded] = useState(false);
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Latest');
  const [search, setSearch] = useState('');

  // BUY STATES
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());

  const addressWallet = Cookies.get('account')?.toLowerCase();

  const handleToggle = () => {
    setVisibleCount(expanded ? 8 : products?.length || 8);
    setExpanded(!expanded);
  };
  let filteredProducts: Product[] = Array.isArray(products)
    ? [...products]
    : [];

  // Filter by status
  if (statusSelected.length > 0) {
    filteredProducts = filteredProducts.filter((p) => {
      const hasListing = p.listingId != null && p.listingId > 0;
      const hasAuction = p.auctionId != null && p.auctionId > 0;

      if (statusSelected.includes('Buy Now') && hasListing) return true;
      if (statusSelected.includes('Has Offers') && hasListing) return true;
      if (statusSelected.includes('On Auction') && hasAuction) return true;

      return false;
    });
  }

  // Filter by search
  if (search.trim()) {
    const query = search.toLowerCase();
    filteredProducts = filteredProducts.filter((p) => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchCreator =
        Array.isArray(p.creator) &&
        p.creator.some((c) => c.userName?.toLowerCase().includes(query));
      return matchName || matchCreator;
    });
  }

  // SORT
  const sortMap: Record<
    (typeof SORT_OPTIONS)[number],
    (a: Product, b: Product) => number
  > = {
    'Price: Low to High': (a, b) => Number(a.price) - Number(b.price),
    'Price: High to Low': (a, b) => Number(b.price) - Number(a.price),
    Latest: () => 0,
  };
  filteredProducts.sort(sortMap[sort]);

  // BUY NFT
  const handleBuy = useCallback(async (nft: Product) => {
    if (!nft.listingId) return alert('Cannot buy this NFT');
    if (!window.ethereum) return alert('MetaMask not installed');

    setLoadingIds((prev) => new Set(prev).add(nft.id));

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Lấy giá trực tiếp từ contract
      const listing = await marketplaceNFTService.getListing(nft.listingId);
      const priceWei = BigInt(listing.price);

      const tx = await marketplaceNFTService.buyItem(
        signer,
        nft.listingId,
        priceWei,
      );
      await tx.wait();

      setTxHash(tx.hash);
      window.location.reload();
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(nft.id);
        return newSet;
      });
    }
  }, []);

  // PLACE BID
  const handlePlaceBid = useCallback(async (nft: Product) => {
    if (!nft.auctionId) return alert('This NFT is not on auction');
    if (!window.ethereum) return alert('MetaMask not installed');

    // const bidAmountInput = prompt("Enter bid amount in ETH:");
    // if (!bidAmountInput) return;

    // const bidAmount = Number(bidAmountInput);
    // if (bidAmount <= 0) return alert("Invalid bid amount");
    const bidAmountInput = prompt('Enter bid amount in ETH:');
    if (!bidAmountInput) return;

    const bidAmount = Number(bidAmountInput);
    if (bidAmount <= 0) return;

    const bidInWei = ethers.parseEther(bidAmount.toString()); // BigInt
    // const tx = await marketplaceNFTService.placeBid(signer, nft.auctionId, bidInWei);

    try {
      setLoading(true);

      // 1️⃣ Kết nối signer
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const bidderAddress = await signer.getAddress();

      // 2️⃣ Convert bid ETH -> wei (BigInt)
      const bidInWei = ethers.parseEther(bidAmount.toString());

      // 3️⃣ Gọi blockchain placeBid
      const receipt = await marketplaceNFTService.placeBid(
        signer,
        nft.auctionId,
        bidInWei,
      );
      // receipt đã là TransactionReceipt, mined xong
      console.log('Bid receipt:', receipt);

      // 4️⃣ Lưu vào Supabase (BigInt -> string)
      const { error } = await supabase.from('auction_bids').insert([
        {
          auction_id: nft.auctionId,
          bidder: bidderAddress,
          bid_amount: bidInWei.toString(),
        },
      ]);
      if (error) console.error('Failed to save bid history:', error);

      alert('Bid placed successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Error placing bid');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCancelListing = async (listingId: number) => {
    try {
      if (!window.ethereum) return alert('MetaMask not installed');

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const receipt = await marketplaceNFTService.cancelListing(
        signer,
        listingId,
      );
      console.log('Receipt:', receipt);
      toast.success('Listing canceled successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel listing');
    }
  };

  const handleCancelAuction = async (auctionId: number) => {
    try {
      if (!window.ethereum) return alert('MetaMask not installed');

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const receipt = await marketplaceNFTService.cancelAuction(
        signer,
        auctionId,
      );
      console.log('Receipt:', receipt);
      toast.success('Auction canceled successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error('Failed to cancel auction');
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError)
    return <Typography color="error">Failed to load products</Typography>;

  return (
    <Stack>
      {/* Search & Sort */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          mb={4}
          width="100%"
          p={2}
        >
          {/* Search */}
          <Box sx={{ flexBasis: { xs: '100%', sm: '50%' } }}>
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
                  '& input::placeholder': { color: 'rgba(255,255,255,0.6)' },
                },
              }}
            />
          </Box>

          {/* Sort */}
          <Box
            sx={{
              flexBasis: { xs: '100%', sm: '20%' },
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <FormControl fullWidth size="small">
              <Select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value as (typeof SORT_OPTIONS)[number])
                }
                sx={{
                  bgcolor: { xs: 'rgba(255,255,255,0.2)', md: 'white' },
                  borderRadius: 1.5,
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <MenuItem value={opt} key={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Box>

      {/* NFT GRID */}
      <Grid container spacing={3} mb={14} px={{ xs: 2, sm: 3, md: 1 }}>
        {filteredProducts.slice(0, visibleCount).map((nft) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={nft.id}>
            <Card
              sx={{
                bgcolor: 'white',
                borderRadius: 3,
                overflow: 'hidden',
                color: 'black',
                transition: '0.3s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                },
                width: '105%',
                height: '100%',
              }}
            >
              <Link
                href={`/marketplace/${nft.id}`}
                style={{ textDecoration: 'none' }}
              >
                {/* <Image
                  src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
                  alt={nft.name}
                  width={470}
                  height={900}
                  style={{ width: '100%', height: 'auto' }}
                /> */}

               <Box
  sx={{
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderRadius: 2,
  }}
>
  <Image
    src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
    alt={nft.name}
    width={470}
    height={200}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center', // ✅ lấy trung tâm ảnh
    }}
  />
</Box>


                <CardContent sx={{ height: '90%' }}>
                  {/* <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
                    {nft.properties?.map((p) => p.type).join(', ')}
                  </Typography> */}
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
                </CardContent>
              </Link>
              <Box
                sx={{
                  p: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  mt: -2.0,
                  gap: 1.0,
                }}
              >
                {(() => {
                  const sellerArray = Array.isArray(nft.seller)
                    ? nft.seller
                    : nft.seller
                      ? [nft.seller]
                      : [];
                  const isSeller = sellerArray.some(
                    (s) =>
                      s.addressWallet.toLowerCase() ===
                      addressWallet?.toLowerCase(),
                  );

                  return (
                    <>
                      {/* ===== SELLER ACTIONS ===== */}
                      {isSeller && (
                        <>
                          {nft.listingId != null && (
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: '#d32f2f',
                                textTransform: 'none',
                                px: 4.2,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancelListing(nft.listingId!); // ✅ dấu ! để TS biết chắc chắn là number
                              }}
                            >
                              Cancel Buy
                            </Button>
                          )}

                          {nft.auctionId != null && (
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: '#d32f2f',
                                textTransform: 'none',
                                px: 4.2,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancelAuction(nft.auctionId!);
                              }}
                            >
                              Cancel Auction
                            </Button>
                          )}
                        </>
                      )}

                      {/* ===== BUY NOW ===== */}
                      {!isSeller && nft.listingId && !nft.auctionId && (
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: '#9230FF',
                            textTransform: 'none',
                            px: 4.2,
                          }}
                          disabled={loadingIds.has(nft.id)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuy(nft);
                          }}
                        >
                          {loadingIds.has(nft.id) ? 'Processing...' : 'Buy Now'}
                        </Button>
                      )}

                      {/* ===== PLACE BID ===== */}
                      {!isSeller && nft.auctionId && !nft.listingId && (
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: '#FF8800',
                            textTransform: 'none',
                            px: 4.2,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlaceBid(nft);
                          }}
                        >
                          Place Bid
                        </Button>
                      )}
                    </>
                  );
                })()}
              </Box>
            </Card>
          </Grid>
        ))}

        {/* Load more */}
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

      {/* ERROR */}
      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default NFTTable;

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
// import { useAllProducts } from '@/hooks/useProduct';
// import { Product } from '@/types/product';
// // import { marketplaceNFTService } from '@/services/marketplaceService';
// import { ethers } from 'ethers';
// import toast from 'react-hot-toast';
// // import { marketplaceAddress } from '@/constants/addresses';
// // import Marketplace from '@/abis/Marketplace.json';

// import { pzoAddress, ERC20_ABI } from '@/constants/erc20';
// import { CONTRACT_ADDRESS, getContract } from '@/services/getContract';
// import { updateListing } from '@/services/productService';
// import MARKETPLACE_ABI from "@/abis/Marketplace.json";
// const SORT_OPTIONS = [
//   'Latest',
//   'Price: Low to High',
//   'Price: High to Low',
// ] as const;

// // declare global {
// //   interface Window {
// //     ethereum?: EthereumProvider;
// //   }
// // }

// const NFTTable = () => {
//   const { data: products, isLoading, isError } = useAllProducts();

//   const [visibleCount, setVisibleCount] = useState(8);
//   const [expanded, setExpanded] = useState(false);
//   const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Latest');
//   const [search, setSearch] = useState('');

//   // Track loading / error / txHash per NFT
//   const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
//   const [errorMap, setErrorMap] = useState<Record<number, string>>({});
//   const [txMap, setTxMap] = useState<Record<number, string>>({});

//   const handleToggle = () => {
//     setVisibleCount(expanded ? 8 : products?.length || 8);
//     setExpanded(!expanded);
//   };

//   // ================================
//   // Filter + Search
//   // ================================
//   let filteredProducts: Product[] = Array.isArray(products)
//     ? [...products]
//     : [];
//   if (search.trim()) {
//     const query = search.toLowerCase();
//     filteredProducts = filteredProducts.filter((p) => {
//       const matchName = p.name.toLowerCase().includes(query);
//       const matchCreator =
//         Array.isArray(p.creator) &&
//         p.creator.some((c) => c.userName?.toLowerCase().includes(query));
//       return matchName || matchCreator;
//     });
//   }

//   // ================================
//   // Sort
//   // ================================
//   const sortMap: Record<
//     (typeof SORT_OPTIONS)[number],
//     (a: Product, b: Product) => number
//   > = {
//     'Price: Low to High': (a, b) => Number(a.price) - Number(b.price),
//     'Price: High to Low': (a, b) => Number(b.price) - Number(a.price),
//     Latest: () => 0,
//   };
//   filteredProducts.sort(sortMap[sort]);

//   // ================================
//   // Buy NFT Handler
//   // ================================
//   //   const handleBuy = async (nft: Product, payWithPZO: boolean = false) => {
//   //   if (!nft.listingId && nft.listingId !== 0) {
//   //     toast.error('Listing ID không tồn tại!');
//   //     return;
//   //   }

//   //   setLoadingMap((prev) => ({ ...prev, [nft.id]: true }));

//   //   try {
//   //     if (!window.ethereum) throw new Error('MetaMask chưa cài đặt');

//   //     const provider = new ethers.BrowserProvider(window.ethereum);
//   //     const signer = await provider.getSigner();
//   //     const marketplace = new ethers.Contract(
//   //       marketplaceAddress,
//   //       Marketplace,
//   //       signer
//   //     );

//   //     const listing = await marketplace.getListing(nft.listingId);
//   //     if (!listing.active) throw new Error('Listing chưa active!');

//   //     let tx;

//   //     if (payWithPZO) {
//   //       // Trường hợp thanh toán bằng PZO
//   //       const pzoContract = new ethers.Contract(pzoAddress, ERC20_ABI, signer);
//   //       const price = ethers.parseUnits(nft.price.toString(), 18); // giả sử PZO 18 decimals

//   //       // Bước 1: approve marketplace chi tiêu PZO
//   //       const approveTx = await pzoContract.approve(marketplaceAddress, price);
//   //       await approveTx.wait();

//   //       // Bước 2: gọi hàm mua NFT bằng token PZO
//   //       tx = await marketplace.buyItemWithToken(nft.listingId, price);
//   //     } else {
//   //       // Thanh toán bằng ETH
//   //       tx = await marketplace.buyItem(nft.listingId, {
//   //         value: ethers.parseEther(nft.price.toString()),
//   //       });
//   //     }

//   //     setTxMap((prev) => ({ ...prev, [nft.id]: tx.hash }));
//   //     await tx.wait();

//   //     toast.success('Mua NFT thành công!');
//   //   } catch (err: unknown) {
//   //     let message = 'Lỗi không xác định';
//   //     if (err instanceof Error) message = err.message;

//   //     setErrorMap((prev) => ({ ...prev, [nft.id]: message }));
//   //     toast.error(message);
//   //   } finally {
//   //     setLoadingMap((prev) => ({ ...prev, [nft.id]: false }));
//   //   }
//   // };

// const NETWORKS: Record<number, string> = {
//   1: "Ethereum Mainnet",
//   137: "Polygon",
//   56: "BSC",
//   5080: "PZO Chain", // custom
// };

// const handleBuyNFT = async (nft: Product) => {
//   if (!nft.listingId) {
//     toast.error("Listing ID không tồn tại!");
//     return;
//   }

//   if (!window.ethereum) {
//     toast.error("MetaMask chưa cài đặt!");
//     return;
//   }

//   setLoadingMap(prev => ({ ...prev, [nft.id]: true }));
//   setErrorMap(prev => ({ ...prev, [nft.id]: "" }));

//   try {
//     // Kết nối MetaMask
//     const [userAddress] = (await window.ethereum.request({
//       method: "eth_requestAccounts",
//     })) as string[];

//     const provider = new ethers.BrowserProvider(window.ethereum);
//     const signer = await provider.getSigner();

//     // Contract PZO
//     const pzoContract = new ethers.Contract(pzoAddress, ERC20_ABI, signer);
//     const decimals: number = await pzoContract.decimals();

//     // Số PZO cần thanh toán (ví dụ 210.57 PZO)
//     const pzoAmount = ethers.parseUnits("210.57", decimals);

//     // Kiểm tra balance + allowance
//     const balance: bigint = await pzoContract.balanceOf(userAddress);
//     const allowance: bigint = await pzoContract.allowance(userAddress, CONTRACT_ADDRESS);

//     if (balance < pzoAmount) throw new Error("Không đủ PZO để thanh toán");

//     // Approve nếu allowance < cần dùng
//     if (allowance < pzoAmount) {
//       toast.loading("Đang approve PZO...");
//       const approveTx = await pzoContract.approve(CONTRACT_ADDRESS, pzoAmount);
//       await approveTx.wait();
//       toast.dismiss();
//       toast.success("Approve PZO thành công!");
//     }

//     // Contract Marketplace
//     const marketplaceContract = new ethers.Contract(CONTRACT_ADDRESS, MARKETPLACE_ABI, signer);

//     // DEBUG: callStatic để kiểm tra trước khi gửi transaction
//     try {
//       await marketplaceContract.callStatic.buyItemWithToken(nft.listingId, pzoAmount);
//     } catch (err: any) {
//       throw new Error(`Transaction sẽ revert: ${err?.reason || "Unknown reason"}`);
//     }

//     // Gửi transaction thực tế
//     toast.loading("Đang xử lý giao dịch...");
//     const tx = await marketplaceContract.buyItemWithToken(nft.listingId, pzoAmount);
//     setTxMap(prev => ({ ...prev, [nft.id]: tx.hash }));
//     await tx.wait();
//     toast.dismiss();
//     toast.success(`Mua NFT thành công! Trả ${ethers.formatUnits(pzoAmount, decimals)} PZO`);

//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : "Lỗi không xác định";
//     setErrorMap(prev => ({ ...prev, [nft.id]: message }));
//     toast.error(message);
//     console.error(err);
//   } finally {
//     setLoadingMap(prev => ({ ...prev, [nft.id]: false }));
//   }
// };

//   if (isLoading) return <Typography>Loading...</Typography>;
//   if (isError)
//     return <Typography color="error">Failed to load products</Typography>;

//   return (
//     <Stack>
//       {/* Search & Sort */}
//       <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           justifyContent="space-between"
//           alignItems="center"
//           gap={1}
//           mb={4}
//           width="100%"
//           p={2}
//         >
//           <Box sx={{ flexBasis: { xs: '100%', sm: '50%' } }}>
//             <TextField
//               placeholder="Search by name or creator"
//               variant="outlined"
//               size="small"
//               fullWidth
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon
//                       fontSize="small"
//                       sx={{ color: 'rgba(255,255,255,0.6)' }}
//                     />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 1.5,
//                   background: 'rgba(255,255,255,0.2)',
//                   input: { p: 0.8, color: '#fff' },
//                   '& .MuiOutlinedInput-input::placeholder': {
//                     color: 'rgba(255,255,255,0.6)',
//                   },
//                 },
//               }}
//             />
//           </Box>

//           <Box
//             sx={{
//               flexBasis: { xs: '100%', sm: '20%' },
//               display: 'flex',
//               justifyContent: 'flex-end',
//             }}
//           >
//             <FormControl fullWidth size="small">
//               <Select
//                 value={sort}
//                 onChange={(e) =>
//                   setSort(e.target.value as (typeof SORT_OPTIONS)[number])
//                 }
//                 sx={{
//                   bgcolor: { xs: 'rgba(255,255,255,0.2)', md: 'white' },
//                   borderRadius: 1.5,
//                   textTransform: 'none',
//                 }}
//               >
//                 {SORT_OPTIONS.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Stack>
//       </Box>

//       {/* NFT Cards */}
//       <Grid container spacing={3} mb={14} px={{ xs: 2, sm: 4 }}>
//         {filteredProducts.slice(0, visibleCount).map((nft) => (
//           <Grid size={{ xs: 12, sm: 6, md: 4 }} key={nft.id}>
//             <Card
//               sx={{
//                 bgcolor: 'white',
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 color: 'black',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 transition: '0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-6px)',
//                   boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
//                 },
//               }}
//             >
//               <Link
//                 href={`/marketplace/${nft.id}`}
//                 style={{ textDecoration: 'none' }}
//               >
//                 {/* <Image
//                   src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
//                   alt={nft.name}
//                   width={460}
//                   height={360}
//                   style={{ width: '100%', height: 'auto' }}
//                 /> */}
//                 <Image
//                   src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
//                   alt={nft.name}
//                   width={460}
//                   height={360}
//                   style={{ width: '100%', height: 'auto' }}
//                   unoptimized // <<< bỏ qua cảnh báo Next.js
//                 />
//                 <CardContent>
//                   <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
//                     {nft.properties?.map((p) => p.type).join(', ')}
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                     {nft.name}
//                   </Typography>
//                   <Box
//                     sx={{
//                       mt: 1.2,
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Typography
//                       variant="body2"
//                       sx={{ fontWeight: 500, fontSize: '1rem' }}
//                     >
//                       {nft.price} ETH
//                     </Typography>
//                     <FavoriteBorderIcon
//                       sx={{ fontSize: '0.85rem', opacity: 0.6 }}
//                     />
//                   </Box>
//                 </CardContent>
//               </Link>

//               <Box
//                 sx={{
//                   p: 2,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   mt: -2.5,
//                 }}
//               >
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: '#9230FF', textTransform: 'none', px: 4.2 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleBuyNFT(nft);
//                   }}
//                   disabled={loadingMap[nft.id]}
//                 >
//                   {loadingMap[nft.id] ? 'Processing...' : 'Buy Now'}
//                 </Button>
//               </Box>

//               {txMap[nft.id] && (
//                 <Typography sx={{ mt: 1, fontSize: '0.85rem' }}>
//                   Transaction sent:{' '}
//                   <a
//                     href={`https://etherscan.io/tx/${txMap[nft.id]}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {txMap[nft.id]}
//                   </a>
//                 </Typography>
//               )}
//               {errorMap[nft.id] && (
//                 <Typography color="error">{errorMap[nft.id]}</Typography>
//               )}
//             </Card>
//           </Grid>
//         ))}

//         <Box display="flex" justifyContent="center" mt={3} width="100%">
//           <Button
//             variant="contained"
//             onClick={handleToggle}
//             sx={{
//               p: '6px 12px',
//               borderRadius: 1.5,
//               bgcolor: '#232A33',
//               color: 'white',
//               width: 125,
//               textTransform: 'none',
//             }}
//           >
//             {expanded ? 'See Less' : 'Load More'}
//           </Button>
//         </Box>
//       </Grid>
//     </Stack>
//   );
// };

// export default NFTTable;
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
// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { ethers } from 'ethers';

// import { useAllProducts } from '@/hooks/useProduct';
// import { useWallet } from '@/hooks/useWallet';
// import { useMarketplaceNFT } from '@/hooks/useMarketplaceNFT';
// import { Product } from '@/types/product';
// import ERC20_ABI from '@/abis/ERC20.json';

// const SORT_OPTIONS = ['Latest', 'Price: Low to High', 'Price: High to Low'] as const;

// const NFTTable = () => {
//   const { data: products, isLoading, isError } = useAllProducts();
//   const { account, connectWallet, pzoAddress } = useWallet();
//   const marketplace = useMarketplaceNFT();

//   const [visibleCount, setVisibleCount] = useState(8);
//   const [expanded, setExpanded] = useState(false);
//   const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('Latest');
//   const [search, setSearch] = useState('');

//   const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});
//   const [errorMap, setErrorMap] = useState<Record<number, string>>({});
//   const [txMap, setTxMap] = useState<Record<number, string>>({});

//   const [balancePZO, setBalancePZO] = useState<bigint | null>(null);
//   const [ethBalance, setEthBalance] = useState<bigint | null>(null);

//   const handleToggle = () => {
//     setVisibleCount(expanded ? 8 : products?.length || 8);
//     setExpanded(!expanded);
//   };

//   // 🔹 Fetch ETH balance
//   const fetchEthBalance = useCallback(async (acc: string) => {
//     if (!window.ethereum) return;
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const bal = await provider.getBalance(acc);
//       setEthBalance(bal);
//       console.log('ETH balance:', bal.toString());
//     } catch (err) {
//       console.error('Fetch ETH balance error:', err);
//     }
//   }, []);

//   // 🔹 Fetch PZO balance
//   const fetchPzoBalance = useCallback(async (acc: string) => {
//     if (!window.ethereum || !pzoAddress) return;
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const pzoContract = new ethers.Contract(pzoAddress, ERC20_ABI, signer);
//       const bal: bigint = await pzoContract.balanceOf(acc);
//       setBalancePZO(bal);
//       console.log('PZO balance raw:', bal.toString());
//     } catch (err) {
//       console.error('Fetch PZO balance error:', err);
//     }
//   }, [pzoAddress]);

//   // 🔹 Update balances when account changes
//   useEffect(() => {
//     if (account) {
//       fetchEthBalance(account);
//       fetchPzoBalance(account);
//     } else {
//       setEthBalance(null);
//       setBalancePZO(null);
//     }
//   }, [account, fetchEthBalance, fetchPzoBalance]);

//   // 🔹 Filter + Search
//   let filteredProducts: typeof products = Array.isArray(products) ? [...products] : [];
//   if (search.trim()) {
//     const query = search.toLowerCase();
//     filteredProducts = filteredProducts.filter((p) => {
//       const matchName = p.name.toLowerCase().includes(query);
//       const matchCreator =
//         Array.isArray(p.creator) &&
//         p.creator.some((c) => c.userName?.toLowerCase().includes(query));
//       return matchName || matchCreator;
//     });
//   }

//   // 🔹 Sort
//   if (!products) return <Typography>Loading...</Typography>;
//   const sortMap: Record<(typeof SORT_OPTIONS)[number], (a: Product, b: Product) => number> = {
//     'Price: Low to High': (a, b) => Number(a.price) - Number(b.price),
//     'Price: High to Low': (a, b) => Number(b.price) - Number(a.price),
//     Latest: () => 0,
//   };
//   filteredProducts.sort(sortMap[sort]);

//   // 🔹 Buy NFT
//   const handleBuyNFT = async (nft: Product) => {
//     if (!account) {
//       connectWallet();
//       return;
//     }
//     setLoadingMap((prev) => ({ ...prev, [nft.id]: true }));
//     setErrorMap((prev) => ({ ...prev, [nft.id]: '' }));
//     try {
//       const provider = new ethers.BrowserProvider(window.ethereum!);
//       const signer = await provider.getSigner();
//       const tx = await marketplace.buyItem(signer, nft.id, Number(nft.price));
//       setTxMap((prev) => ({ ...prev, [nft.id]: tx.transactionHash }));
//     } catch (err: unknown) {
//       console.error(err);
//       setErrorMap((prev) => ({
//         ...prev,
//         [nft.id]: err instanceof Error ? err.message : 'Transaction failed',
//       }));
//     } finally {
//       setLoadingMap((prev) => ({ ...prev, [nft.id]: false }));
//     }
//   };

//   if (isLoading) return <Typography>Loading...</Typography>;
//   if (isError) return <Typography color="error">Failed to load products</Typography>;

//   return (
//     <Stack>
//       {/* Wallet & Balance */}
//       <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%', mb: 4 }}>
//         <Stack direction="row" alignItems="center" gap={2}>
//           <Button variant="contained" onClick={connectWallet}>
//             {account ? 'Wallet Connected' : 'Connect Wallet'}
//           </Button>
//           {account && (
//             <Typography>
//               ETH: {ethBalance !== null ? ethers.formatEther(ethBalance) : '...'} |{' '}
//               PZO: {balancePZO !== null ? ethers.formatUnits(balancePZO, 18) : '...'}
//             </Typography>
//           )}
//         </Stack>
//       </Box>

//       {/* Search & Sort */}
//       <Box sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
//         <Stack
//           direction={{ xs: 'column', sm: 'row' }}
//           justifyContent="space-between"
//           alignItems="center"
//           gap={1}
//           mb={4}
//           width="100%"
//           p={2}
//         >
//           <Box sx={{ flexBasis: { xs: '100%', sm: '50%' } }}>
//             <TextField
//               placeholder="Search by name or creator"
//               variant="outlined"
//               size="small"
//               fullWidth
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.6)' }} />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   borderRadius: 1.5,
//                   background: 'rgba(255,255,255,0.2)',
//                   input: { p: 0.8, color: '#fff' },
//                   '& .MuiOutlinedInput-input::placeholder': {
//                     color: 'rgba(255,255,255,0.6)',
//                   },
//                 },
//               }}
//             />
//           </Box>

//           <Box
//             sx={{
//               flexBasis: { xs: '100%', sm: '20%' },
//               display: 'flex',
//               justifyContent: 'flex-end',
//             }}
//           >
//             <FormControl fullWidth size="small">
//               <Select
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value as (typeof SORT_OPTIONS)[number])}
//                 sx={{
//                   bgcolor: { xs: 'rgba(255,255,255,0.2)', md: 'white' },
//                   borderRadius: 1.5,
//                   textTransform: 'none',
//                 }}
//               >
//                 {SORT_OPTIONS.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Stack>
//       </Box>

//       {/* NFT Cards */}
//       <Grid container spacing={3} mb={14} px={{ xs: 2, sm: 4 }}>
//         {filteredProducts.slice(0, visibleCount).map((nft) => (
//           <Grid item xs={12} sm={6} md={4} key={nft.id}>
//             <Card
//               sx={{
//                 bgcolor: 'white',
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 color: 'black',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 transition: '0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-6px)',
//                   boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
//                 },
//               }}
//             >
//               <Link href={`/marketplace/${nft.id}`} style={{ textDecoration: 'none' }}>
//                 <Image
//                   src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
//                   alt={nft.name}
//                   width={460}
//                   height={360}
//                   style={{ width: '100%', height: 'auto' }}
//                   unoptimized
//                 />
//                 <CardContent>
//                   <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
//                     {nft.properties?.map((p) => p.type).join(', ')}
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                     {nft.name}
//                   </Typography>
//                   <Box
//                     sx={{
//                       mt: 1.2,
//                       display: 'flex',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                     }}
//                   >
//                     <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '1rem' }}>
//                       {nft.price} ETH
//                     </Typography>
//                     <FavoriteBorderIcon sx={{ fontSize: '0.85rem', opacity: 0.6 }} />
//                   </Box>
//                 </CardContent>
//               </Link>

//               <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', mt: -2.5 }}>
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: '#9230FF', textTransform: 'none', px: 4.2 }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleBuyNFT(nft);
//                   }}
//                   disabled={loadingMap[nft.id]}
//                 >
//                   {loadingMap[nft.id] ? 'Processing...' : 'Buy Now'}
//                 </Button>
//               </Box>

//               {txMap[nft.id] && (
//                 <Typography sx={{ mt: 1, fontSize: '0.85rem' }}>
//                   Transaction sent:{' '}
//                   <a
//                     href={`https://etherscan.io/tx/${txMap[nft.id]}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {txMap[nft.id]}
//                   </a>
//                 </Typography>
//               )}
//               {errorMap[nft.id] && <Typography color="error">{errorMap[nft.id]}</Typography>}
//             </Card>
//           </Grid>
//         ))}

//         <Box display="flex" justifyContent="center" mt={3} width="100%">
//           <Button
//             variant="contained"
//             onClick={handleToggle}
//             sx={{
//               p: '6px 12px',
//               borderRadius: 1.5,
//               bgcolor: '#232A33',
//               color: 'white',
//               width: 125,
//               textTransform: 'none',
//             }}
//           >
//             {expanded ? 'See Less' : 'Load More'}
//           </Button>
//         </Box>
//       </Grid>
//     </Stack>
//   );
// };

// export default NFTTable;
