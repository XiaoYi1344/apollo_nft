
import { UserInfo } from "./product";

export interface ProductSummary {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink: string;
  properties: Array<{
    type: string;
    name: string;
    supply: number;
    blockchain: string;
    tokenId: string;
    contractAddress: string;
    tokenURI: string | null;
    isFreeze: boolean;
  }>;
  type: 'buyNow' | 'onAuction';
  price: string;
  likeCount: number;
  isLike: boolean;
  listingId: number | null;
   creator: UserInfo[];
  // Thêm các trường còn thiếu từ Product
  tokenURI?: string;
  isFreeze?: boolean;
  creators?: string[];
  supply?: number;
  blockchain?: string;
  tokenId?: string;
  contractAddress?: string;
}


export interface CollectionSummary {
  id: number;
  name: string;
  image: string;
  products: ProductSummary[];
}

export interface UserProfile {
  id: number;
  fullName: string;
  userName: string;
  addressWallet: string;
  bio: string;
  background?: string;
  avatar?: string;
  likeCount: number;
  followCount: number;
  isFollow: boolean;
  ownedProducts: ProductSummary[];
  collectionProducts?: CollectionSummary[];
}

export interface UpdateUserPayload {
  userName: string;
  fullName: string;
  bio: string;
  avatar?: File;
  banner?: File;
}

export interface UpdateUserBackgroundPayload {
  image: File;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink?: string;
  properties?: Array<{
    type: string;
    name: string;
    supply?: number;
    blockchain?: string;
    tokenId?: string;
    contractAddress?: string;
    tokenURI?: string | null;
    isFreeze?: boolean;
  }>;
  type?: 'buyNow' | 'onAuction';
  price: string;
  likeCount: number;
  isLike: boolean;
  listingId?: number | null;
  tokenURI?: string | null;
  isFreeze?: boolean;
  creator?: UserInfo; // API trả object
}

