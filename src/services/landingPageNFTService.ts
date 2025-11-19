'use client';

import { ethers, parseEther, formatEther } from 'ethers';

// ================================
// CONFIG
// ================================
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
if (!CONTRACT_ADDRESS)
  console.warn('⚠️ Thiếu biến NEXT_PUBLIC_CONTRACT_ADDRESS trong .env.local');

const CONTRACT_ABI = [
  // WRITE
  'function mintFullNFT(string nameToken,string tokenURI_,string description,uint256 price) public returns (uint256)',
  'function mintToken(string newTokenURI) public returns (uint256)',
  'function updateNFT(uint256 tokenId,string tokenURI_,uint256 price) public',
  'function sendNFT(address to,uint256 tokenId) public',
  'function burnNFT(uint256 tokenId) public',

  // READ
  'function getNFTInfo(uint256 tokenId) public view returns (string,string,string,uint256,address,address)',
  'function totalMinted() public view returns (uint256)',
];

// ================================
// TYPES
// ================================
export interface NFTInfo {
  name: string;
  tokenURI: string;
  description: string;
  price: string;
  creator: string;
  owner: string;
}

// ================================
// PROVIDER + CONTRACT HELPERS
// ================================
function getProvider(): ethers.BrowserProvider | ethers.JsonRpcProvider {
  if (typeof window !== "undefined" && window.ethereum) {
  // Cast an toàn sang Eip1193Provider
  const ethereum = window.ethereum as ethers.Eip1193Provider;
  return new ethers.BrowserProvider(ethereum);
}


  const rpc = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.zerochain.network";
  const chainId = 5080;
  console.log("🛰️ Dùng RPC fallback:", rpc);
  return new ethers.JsonRpcProvider(rpc, { name: "PZO", chainId });
}


function getContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
  const provider = signerOrProvider || getProvider();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

// ================================
// SERVICE OBJECT
// ================================
export const landingPageNFTService = {
  // landingPageNFTService.ts
mintFullNFT: async (
  signer: ethers.Signer,
  args: { nameToken: string; tokenURI: string; description: string; price: number }
) => {
  const c = getContract(signer);
  return await c.mintFullNFT(
    args.nameToken,
    args.tokenURI,
    args.description,
    parseEther(args.price.toString())
  ); // trả về TransactionResponse, chưa wait()
}
,

  mintToken: async (signer: ethers.Signer, tokenURI: string) => {
    const c = getContract(signer);
    const tx = await c.mintToken(tokenURI);
    return tx.wait();
  },

  updateNFT: async (signer: ethers.Signer, tokenId: number, tokenURI: string, price: number) => {
  const c = getContract(signer);
  const tx = await c.updateNFT(tokenId, tokenURI, parseEther(price.toString())); // TransactionResponse
  await tx.wait(); // đợi mined
  return tx; // ⚡ trả về TransactionResponse
},


  sendNFT: async (signer: ethers.Signer, to: string, tokenId: number) => {
    const c = getContract(signer);
    const tx = await c.sendNFT(to, tokenId);
    return tx.wait();
  },

  burnNFT: async (signer: ethers.Signer, tokenId: number) => {
    const c = getContract(signer);
    const tx = await c.burnNFT(tokenId);
    return tx.wait();
  },

  getNFTInfo: async (tokenId: number): Promise<NFTInfo> => {
    const c = getContract();
    const info = await c.getNFTInfo(tokenId);
    return {
      name: info[0],
      tokenURI: info[1],
      description: info[2],
      price: formatEther(info[3]),
      creator: info[4],
      owner: info[5],
    };
  },

  totalMinted: async (): Promise<number> => {
    const c = getContract();
    const total = await c.totalMinted();
    return total.toNumber();
  },
};