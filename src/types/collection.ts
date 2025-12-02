import { OwnedProduct } from "./product";

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  isPublic?: boolean; // mới: trạng thái công khai
  creator: {
    userName: string;
    addressWallet: string;
    avatar?: string;
  };
  products?: OwnedProduct[];
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

export interface UpdateCollectionVisibilityRequest {
  id: number;
  isPublic: boolean;
}

export interface ProductCollectionRequest {
  productIds: number[];
  collectionId: number;
  type: 'add' | 'remove';
  listingId?: number | null;
}
