// getContract.ts
import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!;
if (!CONTRACT_ADDRESS)
  console.warn('⚠️ Thiếu biến NEXT_PUBLIC_MARKETPLACE_ADDRESS trong .env.local');

const CONTRACT_ABI = [
  'function listItem(address nftAddress,uint256 tokenId,uint256 price) public returns (uint256)',
  'function cancelListing(uint256 listingId) public',
  'function updateListingPrice(uint256 listingId,uint256 newPrice) public',
  'function buyItem(uint256 listingId) public payable',
  'function createAuction(address nftAddress,uint256 tokenId,uint256 minPrice,uint256 durationSeconds) public returns (uint256)',
  'function placeBid(uint256 auctionId) public payable',
  'function finalizeAuction(uint256 auctionId) public',
  'function cancelAuction(uint256 auctionId) public',
  'function withdraw() public',
  'function getListing(uint256 listingId) public view returns (tuple(address seller,address nftAddress,uint256 tokenId,uint256 price,bool active))',
  'function getAuction(uint256 auctionId) public view returns (tuple(address seller,address nftAddress,uint256 tokenId,uint256 minPrice,uint256 highestBid,address highestBidder,uint256 startTime,uint256 endTime,bool settled))',
];

export function getContract(signerOrProvider?: ethers.Signer | ethers.Provider) {
  if (signerOrProvider) {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
  }

  if (typeof window !== 'undefined' && window.ethereum) {
    const browserProvider = new ethers.BrowserProvider(
      window.ethereum as ethers.Eip1193Provider
    );
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, browserProvider);
  }

  const rpcProvider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.zerochain.network'
  );
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, rpcProvider);
}
