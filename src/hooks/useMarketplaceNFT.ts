// hooks/useMarketplaceNFT.tsx
'use client';

import { useState } from 'react';
import { ethers } from 'ethers';
import {
  marketplaceNFTService,
  ListingStruct,
  AuctionStruct,
  formatEth,
} from '@/services/marketplaceService';
import { Product } from '@/types/product';
import { supabase } from '@/lib/supabaseClient';

export type Listing = ListingStruct;
export type Auction = AuctionStruct;

export function useMarketplaceNFT() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch single listing
  const fetchListing = async (listingId: number): Promise<Listing | null> => {
    try {
      const l = await marketplaceNFTService.getListing(listingId);
      return l;
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
      return null;
    }
  };

  // fetch and push to local listings state (optional)
  const fetchAndStoreListing = async (listingId: number) => {
    const l = await fetchListing(listingId);
    if (l)
      setListings((prev) => {
        const exists = prev.find(
          (x) =>
            x.tokenId.toString() === l.tokenId.toString() &&
            x.nftAddress === l.nftAddress,
        );
        if (exists)
          return prev.map((x) =>
            x.tokenId.toString() === l.tokenId.toString() &&
            x.nftAddress === l.nftAddress
              ? l
              : x,
          );
        return [...prev, l];
      });
    return l;
  };

  // listing actions
  const listItem = async (
    signer: ethers.Signer,
    nftAddress: string,
    tokenId: number,
    price: number,
  ) => {
    setLoading(true);
    try {
      return await marketplaceNFTService.listItem(
        signer,
        nftAddress,
        tokenId,
        price,
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelListing = async (signer: ethers.Signer, listingId: number) => {
    setLoading(true);
    try {
      return await marketplaceNFTService.cancelListing(signer, listingId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateListingPrice = async (
    signer: ethers.Signer,
    listingId: number,
    newPrice: number,
  ) => {
    setLoading(true);
    try {
      return await marketplaceNFTService.updateListingPrice(
        signer,
        listingId,
        newPrice,
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * buyItem: returns tx (caller can use tx.hash and tx.wait())
   * NOTE: if contract listing.price == 0 server-side will read landing contract price,
   * but you still must send correct ETH value. Best practice: fetch listing.price first if unknown.
   */
  const buyItem = async (
    signer: ethers.Signer,
    listingId: number,
    priceWei: bigint,
  ) => {
    setLoading(true);
    try {
      const tx = await marketplaceNFTService.buyItem(signer, listingId, priceWei);
      return tx;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auctions
  const fetchAuction = async (auctionId: number): Promise<Auction | null> => {
    try {
      const a = await marketplaceNFTService.getAuction(auctionId);
      return a;
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
      return null;
    }
  };

  const createAuction = async (
    signer: ethers.Signer,
    nftAddress: string,
    tokenId: number,
    minPrice: number,
    durationSeconds: number,
  ) => {
    setLoading(true);
    try {
      return await marketplaceNFTService.createAuction(
        signer,
        nftAddress,
        tokenId,
        minPrice,
        durationSeconds,
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

const placeBid = async (
  signer: ethers.Signer,
  auctionId: number,
  bidAmount: number, // ETH
  nft: Product
) => {
  setLoading(true);

  try {
    // 1️⃣ Convert bid ETH -> wei (BigInt)
    const bidInWei = ethers.parseEther(bidAmount.toString());

    // 2️⃣ Call blockchain
    await marketplaceNFTService.placeBid(signer, auctionId, bidInWei);

    // 3️⃣ Lấy địa chỉ bidder
    const bidderAddress = await signer.getAddress();

    // 4️⃣ Lưu vào Supabase (BigInt -> string)
    const { error } = await supabase
      .from('auction_bids')
      .insert([{
        auction_id: nft.auctionId,
        bidder: bidderAddress,
        bid_amount: bidInWei.toString()
      }]);

    if (error) console.error('Failed to save bid history:', error);

    alert('Bid placed thành công!');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(err);
    alert(message || 'Failed to place bid');
    throw err;
  } finally {
    setLoading(false);
  }
};


  const finalizeAuction = async (signer: ethers.Signer, auctionId: number) => {
    setLoading(true);
    try {
      return await marketplaceNFTService.finalizeAuction(signer, auctionId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelAuction = async (signer: ethers.Signer, auctionId: number) => {
    setLoading(true);
    try {
      return await marketplaceNFTService.cancelAuction(signer, auctionId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // withdraw
  const withdraw = async (signer: ethers.Signer) => {
    setLoading(true);
    try {
      return await marketplaceNFTService.withdraw(signer);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // state
    listings,
    auctions,
    loading,
    error,

    // listing fns
    fetchListing,
    fetchAndStoreListing,
    listItem,
    cancelListing,
    updateListingPrice,
    buyItem,

    // auctions
    fetchAuction,
    createAuction,
    placeBid,
    finalizeAuction,
    cancelAuction,

    // withdraw
    withdraw,

    // utils
    formatEth,
  };
}
