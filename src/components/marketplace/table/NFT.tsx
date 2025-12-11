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
        {filteredProducts.slice(0, visibleCount).map((nft) => {
          const isAuctionExpired = nft.endTime
            ? Number(nft.endTime) * 1000 < Date.now()
            : false;

          return (
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
                      loading="lazy"
                      onError={(e) => {
                        // fallback 1: Pinata dedicated gateway (nếu bạn có)
                        e.currentTarget.src = `https://ipfs.io/ipfs/${nft.image}`;
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
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
                            {loadingIds.has(nft.id)
                              ? 'Processing...'
                              : 'Buy Now'}
                          </Button>
                        )}

                        {/* ===== PLACE BID ===== */}
                        {!isSeller && nft.auctionId && !nft.listingId && (
                          <Button
                            variant="contained"
                            sx={{
                              bgcolor: isAuctionExpired ? '#999' : '#FF8800',
                              textTransform: 'none',
                              px: 4.2,
                              cursor: isAuctionExpired
                                ? 'not-allowed'
                                : 'pointer',
                            }}
                            disabled={isAuctionExpired}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isAuctionExpired) handlePlaceBid(nft);
                            }}
                          >
                            {isAuctionExpired ? 'Auction Ended' : 'Place Bid'}
                          </Button>
                        )}
                      </>
                    );
                  })()}
                </Box>
              </Card>
            </Grid>
          );
        })}

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
