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
// //       withCredentials: true,
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
//       withCredentials: true,
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
//       withCredentials: true,
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
//       withCredentials: true,
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
//       withCredentials: true,
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
//       withCredentials: true,
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
//       withCredentials: true,
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
//     withCredentials: true,
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
//     withCredentials: true,
//   });

//   return res.data;
// };

// // ==================== POST PRODUCT FOR SALE ====================
// export const postProductForSale = async (data: PostProductPayload): Promise<ProductResponse> => {
//   const res = await axios.put<ProductResponse>(`${API_URL}/api/product/post-product`, data, {
//     headers: { ...getAuthHeader() },
//     withCredentials: true,
//   });
//   return res.data;
// };

// // ==================== GET ALL PRODUCTS ====================
// export const getAllProducts = async (): Promise<Product[]> => {
//   const res = await axios.get<ApiResponse<Product[]>>(`${API_URL}/api/product/get-all`, {
//     headers: { ...getAuthHeader() },
//     withCredentials: true,
//   });
//   if (!Array.isArray(res.data.data)) throw new Error('Invalid API response for getAllProducts');
//   return res.data.data;
// };

// // // ==================== GET ALL OWNED PRODUCTS ====================
// // export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
// //   const res = await axios.get<ApiResponse<OwnedProduct[]>>(`${API_URL}/api/product/get-all-owned`, {
// //     headers: { ...getAuthHeader() },
// //     withCredentials: true,
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
//       withCredentials: true,
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
//     withCredentials: true,
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
} from '../types/product';

const API_URL = process.env.NEXT_PUBLIC_API;

// ==================== UTILS ====================
const getAuthHeader = () => {
  const token = Cookies.get('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ==================== CREATE PRODUCT ====================
/**
 * API tạo sản phẩm mới
 * POST /api/product
 * Header: accessToken
 */
export const createProduct = async (
  data: CreateProductPayload,
): Promise<CreateProductResponse> => {
  if (!data.name || !data.description || !data.image || !data.supply || !data.blockchain || data.price === undefined) {
    throw new Error('Missing required product fields');
  }

  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description);

  // Ensure image is a File object
  if (typeof data.image === 'string') {
    // If base64 string, convert to File
    const blob = await (await fetch(data.image)).blob();
    const fileName = `image_${Date.now()}.png`;
    formData.append('image', new File([blob], fileName, { type: blob.type }));
  } else {
    formData.append('image', data.image);
  }

  if (data.externalLink) formData.append('externalLink', data.externalLink);
  if (data.properties) formData.append('properties', JSON.stringify(data.properties));

  formData.append('supply', String(data.supply));
  formData.append('blockchain', data.blockchain);
  formData.append('isFreeze', String(data.isFreeze || false));
  formData.append('price', String(data.price));

  // Log formData for debugging
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const res = await axios.post<CreateProductResponse>(
    `${API_URL}/api/product`,
    formData,
    {
      headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    },
  );

  return res.data;
};

// ==================== UPDATE PRODUCT ====================
/**
 * API cập nhật sản phẩm
 * PUT /api/product
 * Header: accessToken
 */
export const updateProduct = async (
  data: UpdateProductPayload,
): Promise<ApiResponse<string>> => {
  const formData = new FormData();
  formData.append('id', data.id);
  if (data.name) formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  if (data.image) formData.append('image', data.image);
  if (data.externalLink) formData.append('externalLink', data.externalLink);
  if (data.properties)
    formData.append('properties', JSON.stringify(data.properties));
  if (data.supply !== undefined) formData.append('supply', String(data.supply));
  if (data.blockchain) formData.append('blockchain', data.blockchain);
  if (data.isFreeze !== undefined)
    formData.append('isFreeze', String(data.isFreeze));
  if (data.price !== undefined) formData.append('price', String(data.price));

  const res = await axios.put(`${API_URL}/api/product`, formData, {
    headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return {
    success: true,
    message: 'Cập nhật thành công!',
    data: res.data.tokenURI || '',
  };
};


// ==================== POST PRODUCT FOR SALE ====================
/**
 * API đăng bán sản phẩm
 * PUT /api/product/post-product
 * Header: accessToken
 */
export const postProductForSale = async (
  data: PostProductPayload,
): Promise<ProductResponse> => {
  const res = await axios.put<ProductResponse>(`${API_URL}/api/product`, data, {
    headers: getAuthHeader(),
    withCredentials: true,
  });
  return res.data;
};

// ==================== GET ALL PRODUCTS ====================
/**
 * API lấy tất cả sản phẩm đã đăng bán
 * GET /api/product/get-all
 */
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get<ApiResponse<Product[]>>(
    `${API_URL}/api/product/get-all`,
    {
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
      withCredentials: true,
    },
  );

  return res.data.data.map((p) => ({
    ...p,
    properties:
      typeof p.properties === 'string'
        ? JSON.parse(p.properties)
        : p.properties,
  }));
};

// ==================== GET ALL OWNED PRODUCTS ====================
/**
 * API lấy tất cả sản phẩm mà user đã tạo hoặc sở hữu
 * GET /api/product/get-all-owned
 * Header: accessToken
 */
export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
  const res = await axios.get<ApiResponse<OwnedProduct[]>>(
    `${API_URL}/api/product/get-all-owned`,
    {
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
      withCredentials: true,
    },
  );

  return res.data.data;
};

// ==================== GET PRODUCT BY COLLECTION  ====================
/**
 * API lấy chi tiết sản phẩm theo ID
 * GET /api/product/get-by-collection
 */
export const getProductsByCollection = async (
  collectionId: number,
): Promise<Product[]> => {
  const res = await axios.get<ApiResponse<Product[]>>(
    `${API_URL}/api/product/get-by-collection`,
    {
      params: { collectionId },
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
      withCredentials: true,
    },
  );

  return res.data.data;
};

// ==================== GET PRODUCT ACTIVITY ====================
/**
 * API lấy toàn bộ lịch sử hoạt động của product
 * GET /api/activity/get-all/:productId
 */
export const getProductActivity = async (
  productId: number,
): Promise<ProductActivity[]> => {
  const res = await axios.get<ApiResponse<ProductActivity[]>>(
    `${API_URL}/api/activity/get-all/${productId}`,
    {
      headers: { ...getAuthHeader(), 'ngrok-skip-browser-warning': 'true' },
      withCredentials: true,
    },
  );

  return res.data.data;
};
