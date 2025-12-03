// types/like.ts

export type TargetType = 'post' | 'comment' | 'nft' | 'artist';

export interface LikeRequest {
  targetId: number;
  targetType: TargetType;
}

export interface LikeResponse {
  success: boolean;
  liked: boolean; // true: liked, false: unliked
}

// ===== Chi tiết NFT =====
export interface NftProperty {
  type: string;
  name: string;
  supply?: number;
  blockchain?: string;
  tokenId?: string | null;
  contractAddress?: string | null;
  tokenURI?: string | null;
  isFreeze?: boolean;
}

export interface NftDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink: string;
  properties: NftProperty[];
  type: 'buyNow' | 'onAuction';
  price: string;
  likeCount: number;
  isLike: boolean;
  listingId: number | null;
  auctionId: number | null;
  creator: {
    userName: string;
    fullName: string;
    avatar: string;
    addressWallet: string;
    collections: { id: number; name: string }[];
  }[];
}

// ===== Chi tiết Artist =====
export interface ArtistDetail {
  id: number;
  fullName: string;
  userName: string;
  addressWallet: string;
  avatar: string;
  isLike: boolean;
  likeCount: number;
}

// ===== LikeTargetMap =====
export type LikeTargetMap = {
  nft: NftDetail;
  artist: ArtistDetail;
  post: { id: number; isLike: boolean; likeCount: number };
  comment: { id: number; isLike: boolean; likeCount: number };
};
