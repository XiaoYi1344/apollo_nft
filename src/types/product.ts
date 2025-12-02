// ==================== UPDATED TYPES FOR PRODUCT SYSTEM ====================

export interface ProductProperty {
  type: string;
  name: string;
  supply?: number;
  blockchain?: string;
  tokenId?: string | null;
  contractAddress?: string | null;
  tokenURI?: string | null;
  isFreeze?: boolean;
}

export interface CollectionInfo {
  id: number;
  name: string;
}

export interface UserInfo {
  userName: string;
  fullName?: string;
  avatar?: string;
  addressWallet: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink?: string;
  properties: ProductProperty[];
  supply: number;
  blockchain: string;
  tokenId: string;
  contractAddress: string;
  tokenURI: string;
  isFreeze: boolean;
  type?: 'buyNow' | 'onAuction' | null;
  price: string;
  likeCount: number;
  isLike: boolean;
  instock?: number;
  listingId?: number | null;
  auctionId?: number | null;
  startTime?: string | null;
  endTime?: string | null;
  seller?: UserInfo[];
  creator: UserInfo[];
  collections?: CollectionInfo[];
}

export interface Ownership {
  tokenURI: string;
  tokenId: string;
  owner: UserInfo;
}

export interface SoldProduct extends Product {
  _sold?: true;
}

export interface OwnedProduct extends Product {
  totalInstock: number;
  soldProducts?: SoldProduct[];
  ownerships?: Ownership[];
}

export interface ProductActivity {
  id: number;
  evenType:
    | 'Mint'
    | 'List'
    | 'Sale'
    | 'Transfer'
    | 'Bid'
    | 'Offer'
    | 'Cancel Offer'
    | 'Accept Offer';
  price: string;
  quantity: number;
  fromAddress: string;
  toAddress: string;
  createdAt: string;
}

// ==================== PAYLOADS ====================

export interface CreateProductPayload {
  name: string;
  description: string;
  image: File | string;
  externalLink?: string;
  properties: ProductProperty[];
  supply: number;
  blockchain: string;
  isFreeze: boolean;
  price: string;
}

export interface UpdateProductPayload {
  id: string;
  name?: string;
  description?: string;
  image?: File;
  externalLink?: string;
  properties?: ProductProperty[];
  supply?: number;
  blockchain?: string;
  price?: string;
  isFreeze?: boolean;
}

export interface PostProductPayload {
  id: number;
  price: string;
  type: 'buyNow' | 'onAuction';
  quantity?: number;
  startTime?: string;
  endTime?: string;
}

export interface UpdateListingPayload {
  listingId: number;
  quantity?: number;
  sellerAddress: string;
  paymentToken: string;
  highestBidder?: string;
  finalPrice?: string;
  winnerAddress?: string;
  endTime?: string;
}

export interface UpdateListingResponse {
  success: boolean;
  message: string;
  data?: { price: string; listingId: number };
}

// ==================== RESPONSES ====================

export interface ProductResponse {
  tokenURI?: string;
  tokenId?: string;
  contractAddress?: string;
}

export interface CreateProductResponse {
  image: string;
  tokenURI: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface NFTMetadataAttribute {
  trait_type: string;
  value: string;
}

export interface NFTMetadataWithURI {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: NFTMetadataAttribute[];
  tokenURI: string;
}

// ==================== PAYLOAD ====================
export interface CancelProductPayload {
  listingId?: number;
  auctionId?: number;
}

// ==================== RESPONSE ====================
export interface CancelProductResponse {
  success: boolean;
  message: string;
  canceledListingId?: number;
  canceledAuctionId?: number;
}

/// ================== PAGINATION ====================
export interface PaginationInfo {
page: number;
limit: number;
total: number;
totalPages: number;
}


export interface ProductCollectionResponse {
success: boolean;
message: string;
data: [PaginationInfo, ...Product[]];
}

export interface GetAllProductsResponse {
  pagination: PaginationInfo;
  products: Product[];
}

export interface RawProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink?: string;
  properties: string | ProductProperty[];  // API có thể trả string hoặc object
  supply: number;
  blockchain: string;
  tokenId: string;
  contractAddress: string;
  tokenURI: string;
  isFreeze: boolean;
  type?: 'buyNow' | 'onAuction' | null;
  price: string;
  likeCount: number;
  isLike: boolean;
  instock?: number;
  listingId?: number | null;
  auctionId?: number | null;
  startTime?: string | null;
  endTime?: string | null;
  seller?: UserInfo | UserInfo[];
  creator: UserInfo | UserInfo[];
  collections?: CollectionInfo[] | null;

  // allow unknown fields but prevent any -> use unknown
  [key: string]: unknown;
}



