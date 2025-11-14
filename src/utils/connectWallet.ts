import { ethers } from 'ethers';

export const connectWallet = async (): Promise<ethers.Signer> => {
  if (!window.ethereum) throw new Error('MetaMask not found');

  const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
  await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  return signer;
};
