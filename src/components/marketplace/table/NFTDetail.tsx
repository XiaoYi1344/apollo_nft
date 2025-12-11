
'use client';

import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Divider,
  Collapse,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useProductAndOwned } from '@/hooks/useProduct';
import { useProductActivity } from '@/hooks/useProduct';
import { ProductActivity } from '@/types/product';
import { useToggleLike } from '@/hooks/useLike';
import { useUserNameByWallet } from '@/hooks/useUser';
import { marketplaceNFTService } from '@/services/marketplaceService';
import { ethers } from 'ethers';
import { buyProduct } from '@/services/productService';
import { supabase } from '@/lib/supabaseClient';
import AuctionPanel from './Auction/AuctionPanel';

export default function NFTDetail() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const productId = Number(id);
  const [, setIsLoading] = useState(false);

  // ✅ Fetch product by ID
  const { data: nft, isLoading, isError } = useProductAndOwned(productId);

  // ✅ Fetch product activity
  const { data: activity = [] } = useProductActivity(productId);

  const { mutate: toggleLike, isPending: liking } = useToggleLike();

  const [openSections, setOpenSections] = useState({
    properties: false,
    activity: false,
    details: false,
    description: false,
    auction: false, // ✅ thêm auction
  });

  // ====================== HOOKS & STATE ======================
  const toggleSection = (section: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const safeActivity: ProductActivity[] = Array.isArray(activity)
    ? activity
    : [];

  const latestSaleActivity = safeActivity
    .filter((a) => a.evenType === 'Sale' && !!a.toAddress)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];

  const { data: latestBuyerUsername } = useUserNameByWallet(
    latestSaleActivity?.toAddress || '',
  );

  const creators = Array.isArray(nft?.creator)
    ? nft.creator
    : nft?.creator
      ? [nft.creator]
      : [];

  const owners = Array.isArray(nft?.seller)
    ? nft.seller
    : nft?.seller
      ? [nft.seller]
      : [];

  const ethAmount = nft?.price ? Number(nft.price) : 0;
  const usdPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(ethAmount * 2000);

  const [topBidders, setTopBidders] = useState<
    { address: string; amount: number }[]
  >([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // ====================== EFFECTS ======================
  useEffect(() => {
    if (!nft?.auctionId || !nft?.endTime) return;

    const end = new Date(nft.endTime).getTime();
    const updateTime = () => setTimeLeft(Math.max(end - Date.now(), 0));

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [nft?.auctionId, nft?.endTime]);

  useEffect(() => {
    if (!nft?.auctionId) return;

    const top = safeActivity
      .filter((a) => a.evenType === 'Bid')
      .sort((a, b) => Number(b.price) - Number(a.price))
      .slice(0, 5)
      .map((a) => ({ address: a.fromAddress, amount: Number(a.price) }));

    setTopBidders(top);
  }, [safeActivity, nft?.auctionId]);

  // ====================== ACTIONS ======================
  const handlePlaceBid = async () => {
    if (!window.ethereum) return alert('Cần kết nối ví Web3!');
    if (!nft?.auctionId || !nft.price) return alert('Auction chưa sẵn sàng');

    const bidAmountInput = prompt(
      `Enter your bid (ETH). Min: ${nft.price} ETH`,
    );
    if (!bidAmountInput) return;

    const bidAmount = Number(bidAmountInput);
    if (bidAmount <= 0) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const bidderAddress = await signer.getAddress();
    const sellerAddress = nft.seller?.[0]?.addressWallet || '';
    if (bidderAddress.toLowerCase() === sellerAddress.toLowerCase()) {
      alert('Bạn là seller, không thể bid');
      return;
    }

    const minBid = Number(nft.price || 0);
    if (bidAmount < minBid) {
      alert(`Bid quá thấp! Giá tối thiểu hiện tại: ${minBid} ETH`);
      return;
    }

    try {
      setIsLoading(true);

      // convert ETH -> wei
      const bidInWei = ethers.parseEther(bidAmount.toString());

      // place bid trên blockchain
      await marketplaceNFTService.placeBid(signer, nft.auctionId, bidInWei);

      // lưu vào Supabase
      const { error } = await supabase.from('auction_bids').insert([
        {
          auction_id: nft.auctionId,
          bidder: bidderAddress,
          bid_amount: bidInWei.toString(), // string để tránh BigInt error
        },
      ]);

      if (error) console.error('Failed to save bid history:', error);

      alert('Bid placed thành công!');
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      alert(message || 'Failed to place bid');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCountdown = () => {
    const h = Math.floor(timeLeft / 1000 / 3600);
    const m = Math.floor(((timeLeft / 1000) % 3600) / 60);
    const s = Math.floor((timeLeft / 1000) % 60);
    return `${h}h ${m}m ${s}s`;
  };

  // ====================== LOADING & ERROR ======================
  if (isLoading)
    return (
      <Box sx={{ textAlign: 'center', color: '#fff', py: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );

  if (isError || !nft)
    return (
      <Box sx={{ textAlign: 'center', color: '#fff', py: 10 }}>
        <Typography>NFT not found</Typography>
        <Button onClick={() => router.push('/marketplace')}>Back</Button>
      </Box>
    );

  return (
    <Box
      sx={{
        color: 'white',
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, sm: 3, md: 10 },
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
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={{ xs: 3, sm: 4, md: 8 }}
        alignItems={{ xs: 'center', sm: 'center', md: 'flex-start' }}
      >
        {/* Left */}
        <Box
          sx={{
            flex: { xs: 'unset', sm: 1, md: 1 },
            width: { xs: '100%', sm: '90%', md: '50%' },
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
              border: '2px solid #2A145A',
              bgcolor: 'rgba(17,24,39,0.5)',
            }}
          >
            {/* <Image
              src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
              alt={nft.name}
              width={800}
              height={800}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '25px',
                objectFit: 'cover',
              }}
              priority
            /> */}
            <Image
              src={`https://gateway.pinata.cloud/ipfs/${nft.image}`}
              alt={nft.name}
              width={800}
              height={800}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '25px',
                objectFit: 'cover',
              }}
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
              priority
            />

            {/* Like button */}

            <Box
              sx={{
                position: 'absolute',
                top: { xs: 10, sm: 15, md: 20 },
                right: { xs: 10, sm: 15, md: 20 },
                cursor: liking ? 'not-allowed' : 'pointer',
                bgcolor: nft.isLike ? '#fff' : 'rgba(31,41,55,0.6)',
                p: { xs: 0.8, sm: 1, md: 1.2 },
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: nft.isLike ? '#fff' : 'rgba(255,76,253,0.8)',
                  transform: liking ? 'none' : 'scale(1.05)',
                },
              }}
              onClick={() => {
                if (!liking)
                  toggleLike({ targetId: productId, targetType: 'nft' });
              }}
            >
              {nft.isLike ? (
                <Favorite
                  sx={{
                    fontSize: { xs: 20, sm: 23, md: 25 },
                    color: '#FF4CFD',
                  }}
                />
              ) : (
                <FavoriteBorder
                  sx={{
                    fontSize: { xs: 20, sm: 23, md: 25 },
                    color: '#fff',
                  }}
                />
              )}
            </Box>
          </Card>

          {/* Properties */}
          {nft.properties?.length > 0 && (
            <Box
              mt={4}
              sx={{
                bgcolor: 'rgba(17,24,39,0.5)',
                p: { xs: 2, sm: 2.5, md: 3 },
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

        {/* Right */}
        <Box
          sx={{
            flex: { xs: 'unset', sm: 1, md: 1 },
            width: { xs: '100%', sm: '90%', md: '50%' }, // Full width trên sm, 50% trên md
            mt: { xs: 3, sm: 3, md: 0 }, // margin top khi stacked
          }}
        >
          <Typography
            fontWeight={600}
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // xs < sm < md
            }}
          >
            {nft.name}
          </Typography>

          {/* Creator */}
          <Box mt={1} fontSize={{ xs: 12, sm: 14, md: 14 }}>
            {/* Created by */}
            {creators.length > 0 && (
              <Typography sx={{ color: '#9CA3AF' }}>
                Created by:{' '}
                <strong
                  style={{ cursor: 'pointer', color: '#B983FF' }}
                  onClick={() =>
                    router.push(`/profile/${creators[0].addressWallet}`)
                  }
                >
                  @{creators[0].userName}
                </strong>
              </Typography>
            )}

            {/* Owned by */}
            {owners.length > 0 ? (
              // ---- HIỂN THỊ OWNER ----
              <Typography sx={{ color: '#9CA3AF' }}>
                Owned by:{' '}
                <strong
                  style={{ cursor: 'pointer', color: '#B983FF' }}
                  onClick={() =>
                    router.push(`/profile/${owners[0].addressWallet}`)
                  }
                >
                  @{owners[0].userName}
                </strong>
              </Typography>
            ) : (
              // ---- KHÔNG CÓ OWNER → HIỂN THỊ BUYERS TỪ ACTIVITY ----
              <>
                {!owners.length && latestSaleActivity && (
                  <Box>
                    <Typography sx={{ color: '#9CA3AF' }}>
                      Owned by:{' '}
                      <strong
                        style={{ cursor: 'pointer', color: '#B983FF' }}
                        onClick={() =>
                          router.push(
                            `/profile/${latestSaleActivity.toAddress}`,
                          )
                        }
                      >
                        @{latestBuyerUsername ?? 'Unknown'}
                      </strong>
                    </Typography>

                    <Divider sx={{ bgcolor: '#2D155A', my: 1 }} />
                  </Box>
                )}
              </>
            )}
          </Box>


          {nft.auctionId ? (
            
            <AuctionPanel nft={nft} />
          ) : (
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
              <Typography variant="h5" fontWeight={600}>
                {ethAmount} ETH{' '}
                <Typography
                  sx={{ opacity: 0.6, ml: 1, display: 'inline', fontSize: 14 }}
                >
                  ({usdPrice})
                </Typography>
              </Typography>

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
          )}

          {/* Description */}
          <Box
            mt={4}
            sx={{
              bgcolor: 'rgba(17,24,39,0.5)',
              p: { xs: 2, sm: 2.5, md: 3 },
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
              <Typography sx={{ mt: 2, color: '#D1D5DB', fontWeight: 300 }}>
                {nft.description || 'No description provided.'}
              </Typography>
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
              <Typography variant="h6" color="#FFF" sx={{ fontWeight: 400 }}>
                Details
              </Typography>
              {openSections.details ? (
                <ExpandLess sx={{ color: '#FFF' }} />
              ) : (
                <ExpandMore sx={{ color: '#FFF' }} />
              )}
            </Box>
            <Collapse in={openSections.details}>
              <Stack mt={2} spacing={1}>
                <Typography sx={{ color: '#9CA3AF' }}>
                  Contract Address:{' '}
                  <strong style={{ color: '#9333ea' }}>
                    {nft.contractAddress}
                  </strong>
                </Typography>
                <Typography sx={{ color: '#9CA3AF' }}>
                  Token ID: {nft.tokenId}
                </Typography>
                {/* <Typography sx={{ color: '#9CA3AF' }}>
                  Supply: {nft.supply}
                </Typography> */}
                <Typography sx={{ color: '#9CA3AF' }}>
                  Blockchain: {nft.blockchain}
                </Typography>
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
                        <Typography fontWeight={700}>{act.evenType}</Typography>
                        {act.evenType !== 'Mint' && (
                          <Typography>Price: {act.price}</Typography>
                        )}

                        <Typography>Qty: {act.quantity}</Typography>
                        {/* <Typography>From: {act.fromAddress}</Typography> */}
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
