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

// ==================== TYPES ====================

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
  status: 'buyNow' | 'onAuction' | null;
  price: number;
  instock?: number;
  seller?: UserInfo[];
  creator: UserInfo[];
  collections?: CollectionInfo[];
}

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
  status?: 'buyNow' | 'onAuction' | null;
  price: number;
  instock?: number;
  creator: UserInfo[];
  collections?: CollectionInfo[];
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
  image: File;
  externalLink?: string;
  properties: ProductProperty[];
  supply: number;
  blockchain: string;
  isFreeze: boolean;
  price: number;
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
  price?: number;
  isFreeze?: boolean;
}

export interface PostProductPayload {
  id: number;
  price: number;
  type: 'buyNow' | 'onAuction';
  quantity?: number;
  startTime?: string; // chỉ khi onAuction
  endTime?: string; // chỉ khi onAuction
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
