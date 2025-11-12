'use client';

import { useCallback, useState } from 'react';
import { ethers } from 'ethers';
import { landingPageNFTService } from '@/services/landingPageNFTService';


export function useLandingPageNFT() {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async (): Promise<ethers.Signer | null> => {
  if (!window.ethereum) {
    alert('Please install MetaMask!');
    return null;
  }
  
  // Dùng BrowserProvider thay cho Web3Provider
  const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
  await provider.send('eth_requestAccounts', []);
  return provider.getSigner();
}, []);

  const mintFullNFT = useCallback(
    async (name: string, tokenURI: string, description: string, price: number) => {
      setLoading(true);
      setError(null);
      try {
        const signer = await connectWallet();
        if (!signer) throw new Error('No signer connected');

        const tx = await landingPageNFTService.mintFullNFT(signer, {
          nameToken: name,
          tokenURI,
          description,
          price,
        });
        setTxHash(tx.transactionHash);
        return tx;
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error occurred');
      } finally {
        setLoading(false);
      }
    },
    [connectWallet]
  );

  const mintToken = useCallback(
    async (tokenURI: string) => {
      setLoading(true);
      setError(null);
      try {
        const signer = await connectWallet();
        if (!signer) throw new Error('No signer connected');

        const tx = await landingPageNFTService.mintToken(signer, tokenURI);
        setTxHash(tx.transactionHash);
        return tx;
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError('Unknown error occurred');
      } finally {
        setLoading(false);
      }
    },
    [connectWallet]
  );

  const getNFTInfo = useCallback(async (tokenId: number) => {
    try {
      return await landingPageNFTService.getNFTInfo(tokenId);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error occurred');
      return null;
    }
  }, []);

  return {
    loading,
    txHash,
    error,
    mintFullNFT,
    mintToken,
    getNFTInfo,
  };
}
