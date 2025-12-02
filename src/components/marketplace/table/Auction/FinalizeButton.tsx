import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { ethers } from 'ethers';
import { marketplaceNFTService } from '@/services/marketplaceService';
import { supabase } from '@/lib/supabaseClient';

type FinalizeProps = {
  auctionId?: number;
  sellerAddress?: string;
  onFinalize?: () => void; // callback khi finalize xong
};

export default function FinalizeButton({ auctionId, sellerAddress, onFinalize }: FinalizeProps) {
  const [loading, setLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const checkSeller = async () => {
      if (!window.ethereum || !sellerAddress) return;
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const user = await signer.getAddress();
        setIsSeller(user.toLowerCase() === sellerAddress.toLowerCase());
      } catch {
        setIsSeller(false);
      }
    };
    checkSeller();
  }, [sellerAddress]);

  const onClick = async () => {
    if (!window.ethereum) return alert('Connect wallet');
    if (!auctionId || !sellerAddress) return alert('Invalid auction data');

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Kết thúc đấu giá trên smart contract
      await marketplaceNFTService.finalizeAuction(signer, auctionId);

      // Cập nhật trạng thái backend
      await supabase
        .from('auctions')
        .update({ status: 'ended' })
        .eq('auction_id', auctionId);

      alert('Auction finalized');

      // callback refresh UI
      if (onFinalize) onFinalize();
    } catch (err) {
      console.error(err);
      alert('Finalize failed');
    } finally {
      setLoading(false);
    }
  };

  if (!auctionId || !sellerAddress || !isSeller) return null;

  return (
    <Button
      variant="contained"
      sx={{ bgcolor: '#e11d48', mb: 2 }}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Finalizing...' : 'Finalize Auction'}
    </Button>
  );
}
