// services/marketplaceService.ts
'use client';

import { ethers, parseEther, formatEther, BrowserProvider, Eip1193Provider } from 'ethers';
// import { EthereumProvider } from '@metamask/providers';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!;
if (!CONTRACT_ADDRESS) {
  console.warn('⚠️ Thiếu biến NEXT_PUBLIC_MARKETPLACE_ADDRESS trong .env.local');
}

// declare global {
//   interface Window {
//     ethereum?: Eip1193Provider;
//   }
// }
const CONTRACT_ABI = [
  // WRITE
  'function listItem(address nftAddress,uint256 tokenId,uint256 price) public returns (uint256)',
  'function cancelListing(uint256 listingId) public',
  'function updateListingPrice(uint256 listingId,uint256 newPrice) public',
  'function buyItem(uint256 listingId) public payable',

  'function createAuction(address nftAddress,uint256 tokenId,uint256 minPrice,uint256 durationSeconds) public returns (uint256)',
  'function placeBid(uint256 auctionId) public payable',
  'function finalizeAuction(uint256 auctionId) public',
  'function cancelAuction(uint256 auctionId) public',

  'function withdraw() public',
  // Pending
  'function pendingWithdrawals(address user) public view returns (uint256)', 

  // READ
  'function getListing(uint256 listingId) public view returns (tuple(address seller,address nftAddress,uint256 tokenId,uint256 price,bool active))',
  'function getAuction(uint256 auctionId) public view returns (tuple(address seller,address nftAddress,uint256 tokenId,uint256 minPrice,uint256 highestBid,address highestBidder,uint256 startTime,uint256 endTime,bool settled))',
];

/* ---------- TYPES ---------- */
export type ListingStruct = {
  seller: string;
  nftAddress: string;
  tokenId: ethers.BigNumberish;
  price: ethers.BigNumberish;
  active: boolean;
};

export type AuctionStruct = {
  seller: string;
  nftAddress: string;
  tokenId: ethers.BigNumberish;
  minPrice: ethers.BigNumberish;
  highestBid: ethers.BigNumberish;
  highestBidder: string;
  startTime: ethers.BigNumberish;
  endTime: ethers.BigNumberish;
  settled: boolean;
};

/* ---------- FIX CHUẨN ETHERS v6 ---------- */
export interface MarketplaceContract extends ethers.BaseContract {
  listItem(
    nftAddress: string,
    tokenId: ethers.BigNumberish,
    price: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;

  cancelListing(listingId: ethers.BigNumberish): Promise<ethers.TransactionResponse>;

  updateListingPrice(
    listingId: ethers.BigNumberish,
    newPrice: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;

  buyItem(
    listingId: ethers.BigNumberish,
    overrides?: { value?: ethers.BigNumberish }
  ): Promise<ethers.TransactionResponse>;

  createAuction(
    nftAddress: string,
    tokenId: ethers.BigNumberish,
    minPrice: ethers.BigNumberish,
    durationSeconds: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;

  placeBid(
    auctionId: ethers.BigNumberish,
    overrides?: { value?: ethers.BigNumberish }
  ): Promise<ethers.TransactionResponse>;

  finalizeAuction(
    auctionId: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;

  cancelAuction(
    auctionId: ethers.BigNumberish
  ): Promise<ethers.TransactionResponse>;

  withdraw(): Promise<ethers.TransactionResponse>;

   /* --- Thêm hàm này --- */
  pendingWithdrawals(user: string): Promise<ethers.BigNumberish>;

  /* READS */
  getListing(
    listingId: ethers.BigNumberish
  ): Promise<
    [string, string, ethers.BigNumberish, ethers.BigNumberish, boolean] & {
      seller: string;
      nftAddress: string;
      tokenId: ethers.BigNumberish;
      price: ethers.BigNumberish;
      active: boolean;
    }
  >;

  getAuction(
    auctionId: ethers.BigNumberish
  ): Promise<
    [
      string,
      string,
      ethers.BigNumberish,
      ethers.BigNumberish,
      ethers.BigNumberish,
      string,
      ethers.BigNumberish,
      ethers.BigNumberish,
      boolean
    ] & {
      seller: string;
      nftAddress: string;
      tokenId: ethers.BigNumberish;
      minPrice: ethers.BigNumberish;
      highestBid: ethers.BigNumberish;
      highestBidder: string;
      startTime: ethers.BigNumberish;
      endTime: ethers.BigNumberish;
      settled: boolean;
    }
  >;

  connect(signer: ethers.Signer): MarketplaceContract;
}

/* ---------- Provider ---------- */
function getProvider() {
 if (typeof window !== 'undefined' && window.ethereum) {
    // window.ethereum đã có type từ thư viện khác, ép kiểu sang Eip1193Provider nếu cần
    const provider = new BrowserProvider(window.ethereum as unknown as Eip1193Provider);
    return provider;
  }

  return new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.zerochain.network'
  );
}

/* ---------- Contract ---------- */
export function getContract(signer?: ethers.Signer | ethers.Provider) {
  const provider = signer ?? getProvider();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider) as unknown as MarketplaceContract;
}


/* ---------- SERVICE ---------- */
export const marketplaceNFTService = {
  /* LISTINGS */
  listItem: async (signer: ethers.Signer, nftAddress: string, tokenId: number, price: number) => {
    const c = getContract().connect(signer);
    const tx = await c.listItem(nftAddress, tokenId, parseEther(price.toString()));
    return tx.wait();
  },

  cancelListing: async (signer: ethers.Signer, listingId: number) => {
    const c = getContract().connect(signer);
    const tx = await c.cancelListing(listingId);
    return tx.wait();
  },

  updateListingPrice: async (signer: ethers.Signer, listingId: number, newPrice: number) => {
    const c = getContract().connect(signer);
    const tx = await c.updateListingPrice(listingId, parseEther(newPrice.toString()));
    return tx.wait();
  },

  /* BUY */
buyItem: async (signer: ethers.Signer, listingId: number, priceWei: bigint) => {
  const c = getContract().connect(signer);
  const tx = await c.buyItem(listingId, { value: priceWei });
  await tx.wait();
  return tx;
},



  /* AUCTIONS */
  createAuction: async (signer: ethers.Signer, nftAddress: string, tokenId: number, minPrice: number, durationSeconds: number) => {
    const c = getContract().connect(signer);
    const tx = await c.createAuction(nftAddress, tokenId, parseEther(minPrice.toString()), durationSeconds);
    return tx.wait();
  },
placeBid: async (signer: ethers.Signer, auctionId: number, bidInWei: bigint) => {
  const c = getContract().connect(signer);
  const tx = await c.placeBid(auctionId, { value: bidInWei }); // hợp lệ
  return tx.wait();
},


  finalizeAuction: async (signer: ethers.Signer, auctionId: number) => {
    const c = getContract().connect(signer);
    const tx = await c.finalizeAuction(auctionId);
    return tx.wait();
  },

  cancelAuction: async (signer: ethers.Signer, auctionId: number) => {
    const c = getContract().connect(signer);
    const tx = await c.cancelAuction(auctionId);
    return tx.wait();
  },

  withdraw: async (signer: ethers.Signer) => {
    const c = getContract().connect(signer);
    const tx = await c.withdraw();
    return tx.wait();
  },

  /* READS */
  getListing: async (listingId: number): Promise<ListingStruct> => {
    const c = getContract();
    const raw = await c.getListing(listingId);
    return {
      seller: raw.seller,
      nftAddress: raw.nftAddress,
      tokenId: raw.tokenId,
      price: raw.price,
      active: raw.active,
    };
  },

  getAuction: async (auctionId: number): Promise<AuctionStruct> => {
    const c = getContract();
    const raw = await c.getAuction(auctionId);
    return {
      seller: raw.seller,
      nftAddress: raw.nftAddress,
      tokenId: raw.tokenId,
      minPrice: raw.minPrice,
      highestBid: raw.highestBid,
      highestBidder: raw.highestBidder,
      startTime: raw.startTime,
      endTime: raw.endTime,
      settled: raw.settled,
    };
  },
};

/* Helper format ETH */
export const formatEth = (value: ethers.BigNumberish) => {
  try {
    return formatEther(value);
  } catch {
    return '0';
  }
};
