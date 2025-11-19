import { OwnedProduct } from "./product";

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  creator: string;
  addressWallet: string;
  products?: OwnedProduct[]; // có thể rỗng
}



export interface CreateCollectionRequest {
  name: string;
  description: string;
  image: File; // 1 ảnh
}

export interface UpdateCollectionRequest {
  id: number;
  name: string;
  description: string;
  image: File;
}

export interface ProductCollectionRequest {
  productIds: number[];
  collectionId: number;
  type: 'add' | 'remove';
}
