// import axios from 'axios';
// import Cookies from 'js-cookie';
// import {
//   Product,
//   OwnedProduct,
//   ProductActivity,
//   CreateProductPayload,
//   CreateProductResponse,
//   UpdateProductPayload,
//   ProductResponse,
//   PostProductPayload,
//   ApiResponse,
// } from '../types/product';

// const API_URL = process.env.NEXT_PUBLIC_API;

// // ==================== UTILS ====================
// const getAuthHeader = () => {
//   const token = Cookies.get('accessToken');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // ==================== CREATE PRODUCT ====================
// // export const createProduct = async (
// //   data: CreateProductPayload,
// // ): Promise<CreateProductResponse> => {
// //   const formData = new FormData();
// //   formData.append('name', data.name);
// //   formData.append('description', data.description);
// //   formData.append('image', data.image);
// //   if (data.externalLink) formData.append('externalLink', data.externalLink);
// //   formData.append('properties', JSON.stringify(data.properties));
// //   formData.append('isFreeze', data.isFreeze.toString());
// //   formData.append('price', String(data.price));

// //   const res = await axios.post<CreateProductResponse>(
// //     `${API_URL}/api/product`,
// //     formData,
// //     {
// //       headers: {
// //         ...getAuthHeader(),
// //         'Content-Type': 'multipart/form-data',
// //       },
// //       //withCredentials: true,
// //     },
// //   );

// //   return res.data;
// // };
// export const createProduct = async (
//   data: CreateProductPayload,
// ): Promise<CreateProductResponse> => {
//   const formData = new FormData();
//   formData.append('name', data.name);
//   formData.append('description', data.description);
//   formData.append('image', data.image);
//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   formData.append('properties', JSON.stringify(data.properties));
//   formData.append('isFreeze', data.isFreeze.toString());
//   formData.append('price', String(data.price));
//   formData.append('supply', String(data.supply));
//   formData.append('blockchain', data.blockchain);

//   const res = await axios.post<CreateProductResponse>(
//     `${API_URL}/api/product`,
//     formData,
//     {
//       headers: {
//         ...getAuthHeader(),
//         'Content-Type': 'multipart/form-data',
//       },
//       //withCredentials: true,
//     },
//   );

//   return res.data;
// };

// // ==================== UPDATE PRODUCT ====================
// export const updateProduct = async (
//   data: UpdateProductPayload,
// ): Promise<ProductResponse> => {
//   const formData = new FormData();
//   formData.append('id', data.id);
//   formData.append('name', data.name);
//   formData.append('description', data.description);
//   if (data.image) formData.append('image', data.image);
//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   formData.append('properties', JSON.stringify(data.properties));
//   formData.append('price', data.price.toString());
//   if (data.isFreeze !== undefined)
//     formData.append('isFreeze', data.isFreeze.toString());

//   const res = await axios.put<ProductResponse>(
//     `${API_URL}/api/product`,
//     formData,
//     {
//       headers: {
//         ...getAuthHeader(),
//         'Content-Type': 'multipart/form-data',
//         'ngrok-skip-browser-warning': 'true',
//       },
//       //withCredentials: true,
//     },
//   );

//   return res.data;
// };

// // ==================== POST PRODUCT FOR SALE ====================
// export const postProductForSale = async (
//   data: PostProductPayload,
// ): Promise<ProductResponse> => {
//   const res = await axios.put<ProductResponse>(
//     `${API_URL}/api/product/post-product`,
//     data,
//     {
//       headers: {
//         ...getAuthHeader(),
//         'ngrok-skip-browser-warning': 'true',
//       },
//       //withCredentials: true,
//     },
//   );
//   return res.data;
// };

// // ==================== GET ALL PRODUCTS ====================
// export const getAllProducts = async (): Promise<Product[]> => {
//   const res = await axios.get<ApiResponse<Product[]>>(
//     `${API_URL}/api/product/get-all`,
//     {
//       headers: {
//         ...getAuthHeader(),
//         'ngrok-skip-browser-warning': 'true',
//       },
//       //withCredentials: true,
//     },
//   );

//   if (!res.data.data || !Array.isArray(res.data.data)) {
//     throw new Error('Invalid API response for getAllProducts');
//   }

//   return res.data.data;
// };

// // ==================== GET ALL OWNED PRODUCTS ====================
// export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
//   const res = await axios.get<ApiResponse<OwnedProduct[]>>(
//     `${API_URL}/api/product/get-all-owned`,
//     {
//       headers: {
//         ...getAuthHeader(),
//         'ngrok-skip-browser-warning': 'true',
//       },
//       //withCredentials: true,
//     },
//   );

//   if (!res.data.data || !Array.isArray(res.data.data)) {
//     throw new Error('Invalid API response for getAllOwnedProducts');
//   }

//   return res.data.data;
// };

// // ==================== GET PRODUCT BY ID ====================
// export const getProductById = async (id: number): Promise<Product> => {
//   const res = await axios.get<ApiResponse<Product>>(
//     `${API_URL}/api/product/get/${id}`,
//     {
//       headers: getAuthHeader(),
//       //withCredentials: true,
//     },
//   );

//   if (!res.data.data) {
//     throw new Error(`Product with id ${id} not found`);
//   }

//   return res.data.data;
// };

// // ==================== GET PRODUCT ACTIVITY ====================
// export const getProductActivity = async (
//   productId: number,
// ): Promise<ProductActivity[]> => {
//   try {
//     const res = await axios.get<ApiResponse<ProductActivity[]>>(
//       `${API_URL}/api/activity/get-all/${productId}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': 'true',
//         },
//         timeout: 5000,
//       },
//     );

//     if (!Array.isArray(res.data.data)) {
//       throw new Error('API returned unexpected response for product activity');
//     }

//     return res.data.data;
//   } catch (err) {
//     console.error('Failed to fetch product activity', err);
//     return [];
//   }
// };

// import axios from 'axios';
// import Cookies from 'js-cookie';
// import {
//   Product,
//   OwnedProduct,
//   ProductActivity,
//   CreateProductPayload,
//   CreateProductResponse,
//   UpdateProductPayload,
//   ProductResponse,
//   PostProductPayload,
//   ApiResponse,
// } from '../types/product';

// const API_URL = process.env.NEXT_PUBLIC_API;

// // ==================== UTILS ====================
// const getAuthHeader = () => {
//   const token = Cookies.get('accessToken');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // ==================== CREATE PRODUCT ====================
// export const createProduct = async (data: CreateProductPayload): Promise<CreateProductResponse> => {
//   const formData = new FormData();
//   formData.append('name', data.name);
//   formData.append('description', data.description);
//   formData.append('image', data.image);
//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   formData.append('properties', JSON.stringify(data.properties));
//   formData.append('isFreeze', String(data.isFreeze));
//   formData.append('price', String(data.price));
//   formData.append('supply', String(data.supply));
//   formData.append('blockchain', data.blockchain);

//   const res = await axios.post<CreateProductResponse>(`${API_URL}/api/product`, formData, {
//     headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
//     //withCredentials: true,
//   });

//   return res.data;
// };

// // ==================== UPDATE PRODUCT ====================
// export const updateProduct = async (data: UpdateProductPayload): Promise<ProductResponse> => {
//   const formData = new FormData();
//   formData.append('id', data.id);
//   if (data.name) formData.append('name', data.name);
//   if (data.description) formData.append('description', data.description);
//   if (data.image) formData.append('image', data.image);
//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   if (data.properties) formData.append('properties', JSON.stringify(data.properties));
//   if (data.price !== undefined) formData.append('price', String(data.price));
//   if (data.isFreeze !== undefined) formData.append('isFreeze', String(data.isFreeze));
//   if (data.status) formData.append('status', data.status);

//   const res = await axios.put<ProductResponse>(`${API_URL}/api/product`, formData, {
//     headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
//     //withCredentials: true,
//   });

//   return res.data;
// };

// // ==================== POST PRODUCT FOR SALE ====================
// export const postProductForSale = async (data: PostProductPayload): Promise<ProductResponse> => {
//   const res = await axios.put<ProductResponse>(`${API_URL}/api/product/post-product`, data, {
//     headers: { ...getAuthHeader() },
//     //withCredentials: true,
//   });
//   return res.data;
// };

// // ==================== GET ALL PRODUCTS ====================
// export const getAllProducts = async (): Promise<Product[]> => {
//   const res = await axios.get<ApiResponse<Product[]>>(`${API_URL}/api/product/get-all`, {
//     headers: { ...getAuthHeader() },
//     //withCredentials: true,
//   });
//   if (!Array.isArray(res.data.data)) throw new Error('Invalid API response for getAllProducts');
//   return res.data.data;
// };

// // // ==================== GET ALL OWNED PRODUCTS ====================
// // export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
// //   const res = await axios.get<ApiResponse<OwnedProduct[]>>(`${API_URL}/api/product/get-all-owned`, {
// //     headers: { ...getAuthHeader() },
// //     //withCredentials: true,
// //   });
// //   if (!Array.isArray(res.data.data)) throw new Error('Invalid API response for getAllOwnedProducts');
// //   return res.data.data;

// // ==================== GET ALL OWNED PRODUCTS ====================
// export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
//   const res = await axios.get<ApiResponse<OwnedProduct[]>>(
//     `${API_URL}/api/product/get-all-owned`,
//     {
//       headers: {
//         ...getAuthHeader(),
//         'ngrok-skip-browser-warning': 'true',
//       },
//       //withCredentials: true,
//     },
//   );

//   if (!res.data.data || !Array.isArray(res.data.data)) {
//     throw new Error('Invalid API response for getAllOwnedProducts');
//   }

//   return res.data.data;
// };

// // ==================== GET PRODUCT BY ID ====================
// export const getProductById = async (id: number): Promise<Product> => {
//   const res = await axios.get<ApiResponse<Product>>(`${API_URL}/api/product/get/${id}`, {
//     headers: getAuthHeader(),
//     //withCredentials: true,
//   });
//   if (!res.data.data) throw new Error(`Product with id ${id} not found`);
//   return res.data.data;
// };

// // ==================== GET PRODUCT ACTIVITY ====================
// export const getProductActivity = async (productId: number): Promise<ProductActivity[]> => {
//   try {
//     const res = await axios.get<ApiResponse<ProductActivity[]>>(`${API_URL}/api/activity/get-all/${productId}`, {
//       headers: { 'Content-Type': 'application/json' },
//       timeout: 5000,
//     });
//     if (!Array.isArray(res.data.data)) throw new Error('Invalid API response for getProductActivity');
//     return res.data.data;
//   } catch (err) {
//     console.error('Failed to fetch product activity', err);
//     return [];
//   }
// };
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import {
//   Product,
//   OwnedProduct,
//   ProductActivity,
//   CreateProductPayload,
//   CreateProductResponse,
//   UpdateProductPayload,
//   ProductResponse,
//   PostProductPayload,
//   ApiResponse,
//   UpdateListingPayload,
//   UpdateListingResponse,
//   SoldProduct,
// } from '../types/product';

// const API_URL = process.env.NEXT_PUBLIC_API;
// const activityCache = new Map<number, ProductActivity[]>();

// const getAuthHeader = () => {
//   const token = Cookies.get('accessToken');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// // ==================== CREATE PRODUCT ====================
// export const createProduct = async (
//   data: CreateProductPayload,
// ): Promise<CreateProductResponse> => {
//   const formData = new FormData();
//   formData.append('name', data.name);
//   formData.append('description', data.description);
//   if (typeof data.image === 'string') {
//     const blob = await (await fetch(data.image)).blob();
//     formData.append('image', new File([blob], `image_${Date.now()}.png`));
//   } else {
//     formData.append('image', data.image);
//   }
//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   if (data.properties)
//     formData.append('properties', JSON.stringify(data.properties));
//   formData.append('isFreeze', String(data.isFreeze || false));
//   formData.append('price', data.price);

//   const res = await axios.post<CreateProductResponse>(
//     `${API_URL}/api/product`,
//     formData,
//     { headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' } },
//   );

//   return res.data;
// };

// // ==================== UPDATE PRODUCT ====================
// export const updateProduct = async (
//   data: UpdateProductPayload,
// ): Promise<ApiResponse<string>> => {
//   const formData = new FormData();
//   formData.append('id', data.id);
//   if (data.name) formData.append('name', data.name);
//   if (data.description) formData.append('description', data.description);
//   if (data.image) formData.append('image', data.image);
//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   if (data.properties)
//     formData.append('properties', JSON.stringify(data.properties));
//   if (data.price !== undefined) formData.append('price', data.price);
//   if (data.isFreeze !== undefined)
//     formData.append('isFreeze', String(data.isFreeze));

//   const res = await axios.put(`${API_URL}/api/product`, formData, {
//     headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
//   });

//   return {
//     success: res.data.success,
//     message: res.data.message,
//     data: res.data.data || '',
//   };
// };

// // ==================== POST PRODUCT FOR SALE ====================
// export const postProductForSale = async (
//   data: PostProductPayload,
// ): Promise<ProductResponse> => {
//   const res = await axios.put<ProductResponse>(
//     `${API_URL}/api/product/post-product`,
//     data,
//     { headers: getAuthHeader() },
//   );
//   return res.data;
// };

// // ==================== UPDATE LISTING / BUY PRODUCT ====================
// export const updateListing = async (
//   data: UpdateListingPayload,
// ): Promise<UpdateListingResponse> => {
//   const res = await axios.put<UpdateListingResponse>(
//     `${API_URL}/api/product/buy-product`,
//     data,
//     { headers: getAuthHeader() },
//   );
//   return res.data;
// };

// // ==================== GET PRODUCTS ====================
// export const getAllProducts = async (): Promise<Product[]> => {
//   const wallet = Cookies.get('account') || '';
//   const res = await axios.get<ApiResponse<Product[]>>(
//     `${API_URL}/api/product/get-all`,
//     {
//       params: { addressWallet: wallet || undefined },
//       headers: getAuthHeader(),
//     },
//   );
//   return res.data.data.map((p) => ({
//     ...p,
//     properties:
//       typeof p.properties === 'string'
//         ? JSON.parse(p.properties)
//         : p.properties,
//   }));
// };

// export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
//   const res = await axios.get<
//     ApiResponse<{ ownedProducts: OwnedProduct[]; soldProducts: SoldProduct[] }>
//   >(`${API_URL}/api/product/get-all-owned`, { headers: getAuthHeader() });
//   return res.data.data.ownedProducts || [];
// };

// export const getProductsByCollection = async (
//   collectionId: number,
// ): Promise<Product[]> => {
//   const res = await axios.get<ApiResponse<Product[]>>(
//     `${API_URL}/api/product/get-by-collection`,
//     { params: { collectionId }, headers: getAuthHeader() },
//   );
//   return res.data.data;
// };

// export const getProductActivity = async (
//   productId: number,
// ): Promise<ProductActivity[]> => {
//   if (activityCache.has(productId)) return activityCache.get(productId)!;
//   const res = await axios.get<ApiResponse<ProductActivity[]>>(
//     `${API_URL}/api/activity/get-all/${productId}`,
//     { headers: getAuthHeader() },
//   );
//   activityCache.set(productId, res.data.data);
//   return res.data.data;
// };

// import axios from 'axios';
// import Cookies from 'js-cookie';
// import {
//   Product,
//   OwnedProduct,
//   ProductActivity,
//   CreateProductPayload,
//   CreateProductResponse,
//   UpdateProductPayload,
//   ProductResponse,
//   PostProductPayload,
//   ApiResponse,
//   UpdateListingPayload,
//   UpdateListingResponse,
//   SoldProduct,
//   CancelProductPayload,
//   CancelProductResponse,
//   PaginationInfo,
//   ProductCollectionResponse,
// } from '../types/product';

// const API_URL = process.env.NEXT_PUBLIC_API?.replace(/\/$/, '') + '/api';

// const activityCache = new Map<number, ProductActivity[]>();

// const getAuthHeader = () => {
//   const token = Cookies.get('accessToken');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const ensureArray = <T>(maybeArray: T | T[] | undefined | null): T[] => {
//   if (!maybeArray) return [];
//   return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
// };

// const parseProperties = (p: any) => {
//   if (Array.isArray(p)) return p;
//   try {
//     return typeof p === 'string' && p ? JSON.parse(p) : [];
//   } catch (err) {
//     return [];
//   }
// };

// // ==================== CREATE PRODUCT ====================
// export const createProduct = async (
//   data: CreateProductPayload,
// ): Promise<CreateProductResponse> => {
//   const formData = new FormData();

//   formData.append('name', data.name);
//   formData.append('description', data.description);
//   formData.append('supply', String(data.supply));
//   formData.append('blockchain', data.blockchain);
//   formData.append('isFreeze', String(data.isFreeze));
//   formData.append('price', data.price);

//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   if (data.properties)
//     formData.append('properties', JSON.stringify(data.properties));

//   if (typeof data.image === 'string') {
//     const blob = await (await fetch(data.image)).blob();
//     formData.append('image', new File([blob], 'image.png'));
//   } else {
//     formData.append('image', data.image);
//   }

//   const res = await axios.post(`${API_URL}/product`, formData, {
//     headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
//   });

//   return res.data;
// };

// // ==================== UPDATE PRODUCT ====================
// export const updateProduct = async (
//   data: UpdateProductPayload,
// ): Promise<ApiResponse<string>> => {
//   const formData = new FormData();

//   formData.append('id', data.id);
//   if (data.name) formData.append('name', data.name);
//   if (data.description) formData.append('description', data.description);
//   if (data.image) formData.append('image', data.image);
//   if (data.externalLink) formData.append('externalLink', data.externalLink);
//   if (data.price) formData.append('price', data.price);
//   if (data.supply !== undefined) formData.append('supply', String(data.supply));
//   if (data.blockchain) formData.append('blockchain', data.blockchain);
//   if (data.isFreeze !== undefined)
//     formData.append('isFreeze', String(data.isFreeze));
//   if (data.properties)
//     formData.append('properties', JSON.stringify(data.properties));

//   const res = await axios.put(`${API_URL}/product`, formData, {
//     headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
//   });

//   return res.data;
// };

// // ==================== POST PRODUCT FOR SALE ====================
// export const postProductForSale = async (
//   data: PostProductPayload,
// ): Promise<ProductResponse> => {
//   const res = await axios.put(`${API_URL}/product/post-product`, data, {
//     headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
//   });
//   return res.data;
// };

// // ==================== UPDATE LISTING ====================
// export const updateListing = async (
//   data: UpdateListingPayload,
// ): Promise<UpdateListingResponse> => {
//   const res = await axios.put(`${API_URL}/product/buy-product`, data, {
//     headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
//   });
//   return res.data;
// };

// /**
//  * Mua sản phẩm / Cập nhật listing khi bán
//  * @param data UpdateListingPayload
//  * @returns UpdateListingResponse
//  */
// export const buyProduct = async (
//   data: UpdateListingPayload,
// ): Promise<UpdateListingResponse> => {
//   // Chỉ gửi các field có dữ liệu (tùy chọn cho đấu giá)
//   const body: Partial<UpdateListingPayload> = {
//     listingId: data.listingId,
//     quantity: data.quantity ?? 1,
//     sellerAddress: data.sellerAddress,
//     paymentToken: data.paymentToken,
//   };

//   if (data.highestBidder) body.highestBidder = data.highestBidder;
//   if (data.finalPrice) body.finalPrice = data.finalPrice;
//   if (data.winnerAddress) body.winnerAddress = data.winnerAddress;
//   if (data.endTime) body.endTime = data.endTime;

//   const res = await axios.put<UpdateListingResponse>(
//     `${API_URL}/product/buy-product`,
//     body,
//     {
//       headers: { ...getAuthHeader() },
//     },
//   );

//   return res.data;
// };

// // ==================== GET PRODUCTS ====================
// export const getAllProducts = async (): Promise<Product[]> => {
//   const wallet = Cookies.get('account') || '';

//   const res = await axios.get<ApiResponse<Product[]>>(
//     `${API_URL}/product/get-all`,
//     {
//       params: { addressWallet: wallet || undefined },
//       headers: {
//         ...getAuthHeader(),
//         'ngrok-skip-browser-warning': 'true',
//       },
//     },
//   );

//   return res.data.data.map((p) => ({
//     ...p,
//     // normalize properties
//     properties: parseProperties((p as any).properties),
//     // normalize creator/seller to arrays
//     creator: ensureArray((p as any).creator) as any,
//     seller: ensureArray((p as any).seller) as any,
//   }));
// };

// export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
//   const res = await axios.get<
//     ApiResponse<{ ownedProducts: OwnedProduct[]; soldProducts: SoldProduct[] }>
//   >(`${API_URL}/product/get-all-owned`, {
//     headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
//   });

//   return res.data.data.ownedProducts.map((p) => ({
//     ...p,
//     properties:
//       typeof p.properties === 'string'
//         ? JSON.parse(p.properties)
//         : p.properties,
//   }));
// };

// // export const getProductsByCollection = async (
// //   collectionId: number,
// // ): Promise<Product[]> => {
// //   const res = await axios.get<ApiResponse<Product[]>>(
// //     `${API_URL}/product/get-by-collection`,
// //     {
// //       params: { collectionId },
// //       headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
// //     },
// //   );

// //   return res.data.data.map((p) => ({
// //     ...p,
// //     properties: Array.isArray(p.properties)
// //       ? p.properties
// //       : JSON.parse(p.properties),
// //   }));
// // };
// export const getProductsByCollection = async (
//   collectionId: number,
//   addressWallet?: string,
//   page: number = 1,
// ): Promise<{ pagination: PaginationInfo; products: Product[] }> => {
//   const res = await axios.get<ProductCollectionResponse>(
//     `${API_URL}/product/get-by-collection`,
//     {
//       params: { collectionId, addressWallet, page },
//       headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
//     },
//   );

//   const raw = res.data.data;

//   if (!Array.isArray(raw) || raw.length < 2) {
//     return { pagination: { limit: 0, total: 0, totalPages: 0 }, products: [] };
//   }

//   const pagination = raw[0] as PaginationInfo;
//   const products = raw.slice(1) as Product[];

//   // Parse properties nếu API trả JSON string
//   const normalizedProducts = products.map((p) => ({
//     ...p,
//     properties: Array.isArray(p.properties)
//       ? p.properties
//       : JSON.parse(p.properties),
//   }));

//   return {
//     pagination,
//     products: normalizedProducts,
//   };
// };

// export const getProductActivity = async (
//   productId: number,
// ): Promise<ProductActivity[]> => {
//   if (activityCache.has(productId)) return activityCache.get(productId)!;

//   const res = await axios.get<ApiResponse<ProductActivity[]>>(
//     `${API_URL}/activity/get-all/${productId}`,
//     {
//       headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
//     },
//   );

//   activityCache.set(productId, res.data.data);
//   return res.data.data;
// };

// export const getAllOwnedProductsWithSold = async (): Promise<{
//   ownedProducts: OwnedProduct[];
//   soldProducts: SoldProduct[];
// }> => {
//   const res = await axios.get<
//     ApiResponse<{ ownedProducts: OwnedProduct[]; soldProducts: SoldProduct[] }>
//   >(`${API_URL}/product/get-all-owned`, {
//     headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
//   });

//   return res.data.data || { ownedProducts: [], soldProducts: [] };
// };

// // ==================== CANCEL PRODUCT ====================
// export const cancelProduct = async (
//   data: CancelProductPayload,
// ): Promise<CancelProductResponse> => {
//   const res = await axios.put(`${API_URL}/product/cancel-product`, data, {
//     headers: { ...getAuthHeader() },
//   });
//   return res.data;
// };

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
      if (typeof window !== 'undefined') window.location.href = '/login';
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
