import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { supabase } from '@/lib/supabaseClient';
import type { Product } from '@/types/product';
import { BrowserProvider } from 'ethers';
import PlaceBidButton from './PlaceBidButton';
import FinalizeButton from './FinalizeButton';
import AnimatedNFTCountdown from './Countdown';

type AuctionBidRow = {
  id: number;
  auction_id: number;
  bidder: string;
  bid_amount: string;
  created_at: string | null;
};

type AuctionPanelProps = { nft: Product };

export default function AuctionPanel({ nft }: AuctionPanelProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [topBidders, setTopBidders] = useState<
    { address: string; amount: number }[]
  >([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [auctionFinalized, setAuctionFinalized] = useState(false);

  // Lấy địa chỉ ví hiện tại
  useEffect(() => {
    (async () => {
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const addr = await signer.getAddress();
          setCurrentUser(addr.toLowerCase());
        }
      } catch {
        setCurrentUser(null);
      }
    })();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!nft?.endTime) return setTimeLeft(0);

    const endTimeMs =
      Number(nft.endTime) > 1e10
        ? Number(nft.endTime)
        : Number(nft.endTime) * 1000;

    const tick = () => setTimeLeft(Math.max(endTimeMs - Date.now(), 0));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [nft?.endTime]);

  const ended = timeLeft <= 0;

  // Fetch top bidders
  useEffect(() => {
    if (!nft?.auctionId) return;

    let cancelled = false;

    (async () => {
      const { data } = await supabase
        .from('auction_bids')
        .select('*')
        .eq('auction_id', nft.auctionId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!cancelled && data) {
        const top = data.map((d) => ({
          address: d.bidder,
          amount: Number(d.bid_amount) / 1e18,
        }));
        setTopBidders(top);
      }
    })();

    const channel = supabase
      .channel(`auction_${nft.auctionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'auction_bids',
          filter: `auction_id=eq.${nft.auctionId}`,
        },
        (payload: { new: AuctionBidRow }) => {
          const newRow = payload.new;
          const eth = Number(newRow.bid_amount) / 1e18;
          setTopBidders((prev) =>
            [{ address: newRow.bidder, amount: eth }, ...prev].slice(0, 10),
          );
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [nft?.auctionId]);

  const minBid = useMemo(() => Number(nft.price ?? '0'), [nft.price]);

  // Normalize seller thành array
  const sellerArray = Array.isArray(nft.seller)
    ? nft.seller
    : nft.seller
      ? [nft.seller]
      : [];

  const isCurrentUserSeller =
    currentUser &&
    sellerArray.length > 0 &&
    currentUser === sellerArray[0].addressWallet.toLowerCase();

  // Callback khi seller finalize xong
  const handleFinalize = () => setAuctionFinalized(true);

  return (
    <Box
      sx={{
        bgcolor: 'rgba(17,24,39,0.5)',
        p: 3,
        borderRadius: 3,
        mt: 3,
        border: '1px solid #2D155A',
      }}
    >
      <Typography variant="h6">Auction</Typography>

      <Box mt={2}>
        <Typography sx={{ mb: 1, opacity: 0.7 }}>Time Left</Typography>
        {!ended ? <AnimatedNFTCountdown endTime={nft.endTime} /> : null}

        <Typography sx={{ mt: 2, mb: 1 }}>Min Bid: {minBid} ETH</Typography>

        {!ended ? (
          // Chưa kết thúc
          !isCurrentUserSeller && nft.auctionId != null ? (
            <PlaceBidButton auctionId={nft.auctionId} minBidEth={minBid} />
          ) : isCurrentUserSeller && nft.auctionId != null ? (
            <Typography sx={{ color: '#6B7280', fontWeight: 500 }}>
              Bạn là seller
            </Typography>
          ) : null
        ) : auctionFinalized ? (
          <Typography sx={{ color: '#10B981', fontWeight: 600 }}>
            ✅ Auction finalized
          </Typography>
        ) : isCurrentUserSeller && nft.auctionId != null ? (
          <FinalizeButton
            auctionId={nft.auctionId}
            sellerAddress={sellerArray[0].addressWallet}
            onFinalize={handleFinalize}
          />
        ) : (
          <Typography sx={{ color: '#9CA3AF' }}>
            Auction closed. Waiting for seller to finalize.
          </Typography>
        )}

        <Typography sx={{ mb: 1, opacity: 0.6, mt: 2 }}>Top Bids</Typography>
        {topBidders.length > 0 ? (
          topBidders.map((bid, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              p={1}
              bgcolor="rgba(31,41,55,0.5)"
              borderRadius={1}
              mb={1}
            >
              <Typography>
                {i + 1}. {bid.address}
              </Typography>
              <Typography>{bid.amount} ETH</Typography>
            </Box>
          ))
        ) : (
          <Typography>No bids yet.</Typography>
        )}
      </Box>
    </Box>
  );
}
