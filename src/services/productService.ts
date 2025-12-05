
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Product,
  OwnedProduct,
  ProductActivity,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
  ProductResponse,
  PostProductPayload,
  ApiResponse,
  UpdateListingPayload,
  UpdateListingResponse,
  CancelProductPayload,
  CancelProductResponse,
  PaginationInfo,
  ProductCollectionResponse,
  ProductProperty,
  UserInfo,
  RawProduct as TypesRawProduct,
  Ownership,
  RawProduct,
} from '../types/product';

const API_URL = process.env.NEXT_PUBLIC_API?.replace(/\/$/, '') + '/api';

const activityCache = new Map<number, ProductActivity[]>();

const getAuthHeader = (): Record<string, string> => {
  const token = Cookies.get('accessToken');
  if (!token) {
    console.warn('Access token missing!');
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

/** Ensure value is an array */
const ensureArray = <T>(value: T | T[] | null | undefined): T[] =>
  value == null ? [] : Array.isArray(value) ? value : [value];

/** Parse properties returned by backend (string or already array) */
const parseProperties = (
  p: string | ProductProperty[] | unknown,
): ProductProperty[] => {
  if (!p) return [];
  if (Array.isArray(p)) return p as ProductProperty[];
  if (typeof p === 'string') {
    try {
      const parsed = JSON.parse(p);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

// Raw response type for endpoints that return [pagination, ...items]
export type RawGetListResponse = [PaginationInfo, ...TypesRawProduct[]];

// ==================== CREATE PRODUCT ====================
export const createProduct = async (
  data: CreateProductPayload,
): Promise<CreateProductResponse> => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);
  formData.append('supply', String(data.supply));
  formData.append('blockchain', data.blockchain);
  formData.append('isFreeze', String(data.isFreeze));
  formData.append('price', data.price);

  if (data.externalLink) formData.append('externalLink', data.externalLink);
  if (data.properties)
    formData.append('properties', JSON.stringify(data.properties));

  if (typeof data.image === 'string') {
    const blob = await (await fetch(data.image)).blob();
    formData.append('image', new File([blob], 'image.png'));
  } else {
    formData.append('image', data.image);
  }

  const res = await axios.post<CreateProductResponse>(
    `${API_URL}/product`,
    formData,
    {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
    },
  );

  return res.data;
};

// ==================== UPDATE PRODUCT ====================
export const updateProduct = async (
  data: UpdateProductPayload,
): Promise<ApiResponse<{ tokenURI?: string }>> => {
  const formData = new FormData();

  formData.append('id', data.id);
  if (data.name) formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  if (data.externalLink) formData.append('externalLink', data.externalLink);
  if (data.blockchain) formData.append('blockchain', data.blockchain);
  if (data.price) formData.append('price', data.price);
  if (data.supply !== undefined) formData.append('supply', String(data.supply));
  if (data.isFreeze !== undefined)
    formData.append('isFreeze', String(data.isFreeze));
  if (data.properties)
    formData.append('properties', JSON.stringify(data.properties));
  if (data.image) formData.append('image', data.image);

  const res = await axios.put<ApiResponse<{ tokenURI?: string }>>(
    `${API_URL}/product`,
    formData,
    {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
    },
  );

  return res.data;
};

// ==================== POST PRODUCT FOR SALE ====================
export const postProductForSale = async (
  data: PostProductPayload,
): Promise<ProductResponse> => {
  const res = await axios.put<ProductResponse>(
    `${API_URL}/product/post-product`,
    data,
    {
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
    },
  );
  return res.data;
};

// ==================== UPDATE LISTING ====================
export const updateListing = async (
  data: UpdateListingPayload,
): Promise<UpdateListingResponse> => {
  const res = await axios.put<UpdateListingResponse>(
    `${API_URL}/product/buy-product`,
    data,
    {
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
    },
  );
  return res.data;
};

// ==================== BUY PRODUCT ====================
export const buyProduct = async (
  data: UpdateListingPayload,
): Promise<UpdateListingResponse> => {
  const body: Partial<UpdateListingPayload> = {
    listingId: data.listingId,
    quantity: data.quantity ?? 1,
    sellerAddress: data.sellerAddress,
    paymentToken: data.paymentToken,
  };

  if (data.highestBidder) body.highestBidder = data.highestBidder;
  if (data.finalPrice) body.finalPrice = data.finalPrice;
  if (data.winnerAddress) body.winnerAddress = data.winnerAddress;
  if (data.endTime) body.endTime = data.endTime;

  const res = await axios.put<UpdateListingResponse>(
    `${API_URL}/product/buy-product`,
    body,
    {
      headers: { ...getAuthHeader() },
    },
  );

  return res.data;
};

// ==================== GET ALL PRODUCTS (danh sách đã đăng bán) ====================
export const getAllProducts = async (
  page: number = 1,
): Promise<{ pagination: PaginationInfo; products: Product[] }> => {
  const wallet = Cookies.get('account') || '';

  const res = await axios.get<ApiResponse<RawGetListResponse>>(
    `${API_URL}/product/get-all`,
    {
      params: { addressWallet: wallet || undefined, page },
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
    },
  );

  const raw = res.data.data;
  const [pagination, ...items] = raw;

  const products: Product[] = items.map((r: TypesRawProduct) => ({
    ...r,
    properties: parseProperties(r.properties),
    creator: ensureArray<UserInfo>(r.creator) as UserInfo[],
    seller: ensureArray<UserInfo>(r.seller) as UserInfo[],
    collections: r.collections ?? undefined, // ⭐ FIX: loại bỏ null
  }));

  return { pagination, products };
};

// ==================== GET ALL OWNED PRODUCTS ====================

// Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'ngrok-skip-browser-warning': 'true' },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Token missing or expired.');
      // if (typeof window !== 'undefined') window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getAllOwnedProducts = async (
  page: number = 1,
  wallet?: string,
): Promise<{ pagination: PaginationInfo; ownedProducts: OwnedProduct[] }> => {
  const params: { page: number; wallet?: string } = { page };
  if (wallet) params.wallet = wallet;

  const res = await axiosInstance.get<
    ApiResponse<{
      ownedProducts: RawProduct[]; // type chính xác thay vì RawGetListResponse
      soldProducts?: RawProduct[];
    }>
  >('/product/get-all-owned', {
    params, // dùng params có wallet
    headers: getAuthHeader(),
  });

  const rawOwned = res.data.data.ownedProducts;

  if (!rawOwned || rawOwned.length === 0) {
    return { pagination: { page: 1, limit: 0, total: 0, totalPages: 0 }, ownedProducts: [] };
  }

  const [pagination, ...items] = rawOwned as [PaginationInfo, ...RawProduct[]];

  const ownedProducts: OwnedProduct[] = items.map((r: RawProduct) => ({
    ...r,
    properties: parseProperties(r.properties),
    creator: ensureArray<UserInfo>(r.creator),
    seller: ensureArray<UserInfo>(r.seller),
    totalInstock: r.instock ?? r.supply ?? 0,
    collections: Array.isArray(r.collections) ? r.collections : undefined,
    ownerships: Array.isArray(r['ownerships']) ? (r['ownerships'] as Ownership[]) : undefined,
  }));

  return { pagination, ownedProducts };
};

// ==================== GET PRODUCTS BY COLLECTION ====================
export const getProductsByCollection = async (
  collectionId: number,
  addressWallet?: string,
  page: number = 1,
): Promise<{ pagination: PaginationInfo; products: Product[] }> => {
  const res = await axios.get<ProductCollectionResponse>(
    `${API_URL}/product/get-by-collection`,
    {
      params: { collectionId, addressWallet, page },
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
    },
  );

  const raw = res.data.data;
  if (!Array.isArray(raw) || raw.length < 2) {
    return {
      pagination: { page: 1, limit: 0, total: 0, totalPages: 0 },
      products: [],
    };
  }

  const [pagination, ...items] = raw as [PaginationInfo, ...RawProduct[]];

  const products: Product[] = items.map((r: RawProduct) => ({
    ...r,
    properties: parseProperties(r.properties),
    creator: ensureArray<UserInfo>(r.creator),
    seller: ensureArray<UserInfo>(r.seller),
    collections: Array.isArray(r.collections) ? r.collections : undefined,
  }));

  return { pagination, products };
};

// ==================== GET PRODUCT ACTIVITY ====================
export const getProductActivity = async (
  productId: number,
): Promise<ProductActivity[]> => {
  if (activityCache.has(productId)) return activityCache.get(productId)!;

  const res = await axios.get<ApiResponse<ProductActivity[]>>(
    `${API_URL}/activity/get-all/${productId}`,
    {
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
    },
  );

  activityCache.set(productId, res.data.data);
  return res.data.data;
};

// ==================== GET ALL OWNED PRODUCTS WITH SOLD ====================
export const getAllOwnedProductsWithSold = async (): Promise<{
  ownedProducts: OwnedProduct[];
  soldProducts: OwnedProduct[];
}> => {
  const res = await axios.get<
    ApiResponse<{
      ownedProducts: RawGetListResponse;
      soldProducts: RawGetListResponse;
    }>
  >(`${API_URL}/product/get-all-owned`, {
    headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
  });

  const raw = res.data.data;

  const parseList = (list?: RawGetListResponse): OwnedProduct[] => {
    if (!list || list.length < 2) return [];

    const [, ...items] = list;
    return items.map((r: RawProduct) => ({
      ...r,
      properties: parseProperties(r.properties),
      creator: ensureArray<UserInfo>(r.creator),
      seller: ensureArray<UserInfo>(r.seller),
      collections: Array.isArray(r.collections) ? r.collections : undefined,
      ownerships: Array.isArray(r.ownerships) ? r.ownerships : undefined,
      totalInstock: r.instock ?? r.supply ?? 0, // 🔹 bắt buộc
    }));
  };

  const ownedProducts = parseList(raw.ownedProducts);
  const soldProducts = parseList(raw.soldProducts);

  return { ownedProducts, soldProducts };
};

// ==================== CANCEL PRODUCT ====================
export const cancelProduct = async (
  data: CancelProductPayload,
): Promise<CancelProductResponse> => {
  const res = await axios.put<CancelProductResponse>(
    `${API_URL}/product/cancel-product`,
    data,
    {
      headers: { ...getAuthHeader() },
    },
  );
  return res.data;
};
