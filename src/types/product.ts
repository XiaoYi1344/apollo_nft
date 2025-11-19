// // ==================== TYPES ====================

// export interface ProductProperty {
//   type: string;
//   name: string;

// }

// export interface UserInfo {
//   userName: string;
//   addressWallet: string;
// }

// export interface OwnedProduct {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   externalLink?: string;
//   properties: ProductProperty[];
//   tokenId?: string | null;
//   contractAddress?: string | null;
//   tokenURI: string;
//   isFreeze: boolean;
//   status?: 'buyNow' | 'onAuction' | 'hasOffer' | null;
//   price: number;
//   creator: UserInfo;
//   ownedBy: UserInfo[];
// }

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   externalLink?: string;
//   properties: ProductProperty[];
//   tokenId: string;
//   contractAddress: string;
//   tokenURI: string;
//   isFreeze: boolean;
//   status: 'buyNow' | 'onAuction' | 'hasOffer' | null;
//   price: number;
//   creator: UserInfo;
//   ownedBy: UserInfo[];

//   supply?: number;
//   blockchain?: string;
// }

// export interface ProductActivity {
//   id: number;
//   eventType:
//     | 'Mint'
//     | 'List'
//     | 'Sale'
//     | 'Transfer'
//     | 'Bid'
//     | 'Offer'
//     | 'Cancel Offer'
//     | 'Accept Offer';
//   price: string;
//   quantity: number;
//   fromAddress: string;
//   toAddress: string;
//   createdAt: string;
// }

// // ==================== PAYLOADS ====================

// export interface CreateProductPayload {
//   name: string;
//   description: string;
//   image: File;
//   externalLink?: string;
//   properties: ProductProperty[];
//   isFreeze: boolean;
//   price: number;
//   supply: number;       // ✅ thuộc NFT
//   blockchain: string;   // ✅ thuộc NFT
// }

// export interface UpdateProductPayload {
//   id: string;
//   name: string;
//   description: string;
//   image?: File;
//   externalLink?: string;
//   properties: ProductProperty[];
//   price: number;
//   isFreeze?: boolean; // nếu true => khóa không sửa nữa
// }

// export interface PostProductPayload {
//   id: number;
//   price: number;
//   status: 'buyNow' | 'onAuction' | 'hasOffer';
// }

// // ==================== API RESPONSES ====================

// export interface CreateProductResponse {
//   image: string;
//   tokenURI: string;
// }

// export interface ProductResponse {
//   image: string;
//   tokenURI?: string;
//   blockchain?: string;
//   tokenId?: string;
//   contractAddress?: string;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }

// ==================== BASE TYPES ====================

export interface ProductProperty {
  type: string;
  name: string;
}

export interface UserInfo {
  userName: string;
  fullName?: string;
  avatar?: string;
  addressWallet: string;
}

export interface CollectionInfo {
  id: number;
  name: string;
}

// ==================== PRODUCT (ĐÃ ĐĂNG BÁN / GET ALL) ====================

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

  /** Kiểu đăng bán */
  type?: 'buyNow' | 'onAuction' | null;

  price: string;

  /** Lượt thích */
  likeCount: number;

  /** User đang đăng nhập có like hay chưa */
  isLike: boolean;

  /** Tổng số lượng user đang sở hữu */
  totalInstock?: number;

  /** Số lượng đã đăng bán nhưng chưa có người mua */
  soldInstock?: number;

  /** ID listing nếu có */
  listingId?: number | null;

  /** Người bán NFT */
  seller?: UserInfo[];

  /** Người tạo NFT */
  creator: UserInfo[];

  /** Bộ sưu tập */
  collections?: CollectionInfo[];
}

// ==================== OWNED PRODUCT ====================
// (API GET /product/get-all-owned)

export interface OwnedProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink?: string;
  properties: ProductProperty[];
  supply?: number;

  blockchain?: string;
  tokenId?: string | null;
  contractAddress?: string | null;
  tokenURI: string;
  isFreeze: boolean;

  /** Kiểu đăng bán */
  type?: 'buyNow' | 'onAuction' | null;

  price: string;

  /** Số lượng user đăng bán nhưng chưa bán */
  instock?: number;

  /** Lượt thích */
  likeCount: number;

  /** User đang đăng nhập đã like chưa */
  isLike: boolean;

  listingId?: number | null;

  /** Người tạo NFT */
  creator: UserInfo[];

  collections?: CollectionInfo[];
}

// ==================== PRODUCT ACTIVITY ====================

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
  image: File;
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

// ==================== RESPONSES ====================

export interface CreateProductResponse {
  image: string;
  tokenURI: string;
}

export interface ProductResponse {
  tokenURI?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ==================== NFT METADATA ====================

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: { trait_type: string; value: string }[];
}

export interface NFTMetadataWithURI extends NFTMetadata {
  tokenURI: string;
}
