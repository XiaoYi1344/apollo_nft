// components/nft/detail/Auction/PlaceBidButton.tsx
import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import { marketplaceNFTService } from '@/services/marketplaceService';
import { supabase } from '@/lib/supabaseClient';

type PlaceBidProps = {
  auctionId: number;
  minBidEth: number;
  disabled?: boolean;
};

export default function PlaceBidButton({
  auctionId,
  minBidEth,
  disabled,
}: PlaceBidProps) {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    if (!window.ethereum) return alert('Connect wallet');
    const input = prompt(`Enter your bid in ETH (min ${minBidEth})`);
    if (!input) return;
    const val = Number(input);
    if (isNaN(val) || val <= 0) return alert('Invalid amount');
    if (val < minBidEth) return alert('Bid too low');

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const bidWei = ethers.parseEther(val.toString());
      await marketplaceNFTService.placeBid(signer, auctionId, bidWei);
      await supabase
        .from('auction_bids')
        .insert([
          {
            auction_id: auctionId,
            bidder: await signer.getAddress(),
            bid_amount: bidWei.toString(),
          },
        ]);
      alert('Bid placed');
    } catch (err) {
      console.error(err);
      alert('Failed to place bid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      sx={{ bgcolor: '#9333ea', mb: 2 }}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? 'Placing...' : 'Place Bid'}
    </Button>
  );
}
