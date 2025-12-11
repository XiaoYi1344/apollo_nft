import { useState, useCallback } from 'react';
import { BrowserProvider } from 'ethers';
import { marketplaceNFTService } from '@/services/marketplaceService';
import { Product } from '@/types/product';
import { ProductSummary } from '@/types/user';

export const useBuyNFT = () => {
  const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buyNFT = useCallback(async (product: Product | ProductSummary) => {
    if (!product.listingId) return alert('Cannot buy this NFT');
    if (!window.ethereum) return alert('MetaMask not installed');

    setLoadingIds((prev) => new Set(prev).add(product.id));

    // Chuẩn hóa ProductSummary thành Product nếu cần
    const nft: Product = {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      externalLink: product.externalLink ?? '',
      properties: product.properties?.map((prop) => ({
        ...prop,
        supply: prop.supply ?? 0,
        blockchain: prop.blockchain ?? '',
        tokenId: prop.tokenId ?? '',
        contractAddress: prop.contractAddress ?? '',
        tokenURI: prop.tokenURI ?? '',
        isFreeze: prop.isFreeze ?? false,
      })) ?? [],
      supply: product.supply ?? 0,
      blockchain: product.blockchain ?? '',
      tokenId: product.tokenId ?? '',
      contractAddress: product.contractAddress ?? '',
      tokenURI: product.tokenURI ?? '',
      isFreeze: product.isFreeze ?? false,
      type: product.type ?? 'buyNow',
      price: product.price,
      likeCount: product.likeCount,
      isLike: product.isLike,
      listingId: product.listingId ?? 0,
      creator: Array.isArray(product.creator) ? product.creator : [],
    };

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const listing = await marketplaceNFTService.getListing(nft.listingId!);
      const priceWei = BigInt(listing.price);

      const tx = await marketplaceNFTService.buyItem(
        signer,
        nft.listingId!,
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
        newSet.delete(product.id);
        return newSet;
      });
    }
  }, []);

  return { buyNFT, loadingIds, txHash, error };
};
