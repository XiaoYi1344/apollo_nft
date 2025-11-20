// 'use client';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import {
//   Product,
//   OwnedProduct,
//   ProductActivity,
//   CreateProductPayload,
//   CreateProductResponse,
//   UpdateProductPayload,
//   ProductResponse,
//   PostProductPayload,
// } from '../types/product';
// import * as productService from '../services/productService';

// // ==================== DEFAULT OPTIONS ====================
// const defaultQueryOptions = { staleTime: 1000 * 60, retry: 1 };

// // ==================== QUERIES ====================
// export const useAllProducts = () =>
//   useQuery<Product[]>({
//     queryKey: ['products'],
//     queryFn: productService.getAllProducts,
//     ...defaultQueryOptions,
//   });

// export const useOwnedProducts = () =>
//   useQuery<OwnedProduct[]>({
//     queryKey: ['ownedProducts'],
//     queryFn: productService.getAllOwnedProducts,
//     ...defaultQueryOptions,
//   });

// export const useProduct = (id: number) =>
//   useQuery<Product>({
//     queryKey: ['product', id],
//     queryFn: () => productService.getProductById(id),
//     enabled: !!id,
//     ...defaultQueryOptions,
//   });

// export const useProductActivity = (productId: number) =>
//   useQuery<ProductActivity[]>({
//     queryKey: ['productActivity', productId],
//     queryFn: () => productService.getProductActivity(productId),
//     enabled: !!productId,
//     staleTime: 1000 * 60,
//     retry: 0,
//   });

// // ==================== MUTATIONS ====================
// export const useCreateProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation<CreateProductResponse, Error, CreateProductPayload>({
//     mutationFn: productService.createProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//     },
//   });
// };

// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation<ProductResponse, Error, UpdateProductPayload>({
//     mutationFn: productService.updateProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// export const usePostProductForSale = () => {
//   const queryClient = useQueryClient();
//   return useMutation<ProductResponse, Error, PostProductPayload>({
//     mutationFn: productService.postProductForSale,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// 'use client';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import {
//   Product,
//   OwnedProduct,
//   ProductActivity,
//   CreateProductPayload,
//   CreateProductResponse,
//   UpdateProductPayload,
//   ProductResponse,
//   PostProductPayload,
// } from '../types/product';
// import * as productService from '../services/productService';

// const defaultQueryOptions = { staleTime: 1000 * 60, retry: 1 };

// // ==================== QUERIES ====================
// export const useAllProducts = () =>
//   useQuery<Product[]>({
//     queryKey: ['products'],
//     queryFn: productService.getAllProducts,
//     staleTime: 1000 * 60,
//     retry: 1,
//   });

// export const useOwnedProducts = () =>
//   useQuery<OwnedProduct[]>({
//     queryKey: ['ownedProducts'],
//     queryFn: productService.getAllOwnedProducts,
//     staleTime: 1000 * 60,
//     retry: 1,
//   });

// export const useProduct = (id: number) =>
//   useQuery<Product>({
//   queryKey: ['product', id],
//   queryFn: () => productService.getProductById(id),
//   enabled: !!id,
//   ...defaultQueryOptions,
// });

// export const useProductActivity = (productId: number) =>
//   useQuery<ProductActivity[]>({
//     queryKey: ['productActivity', productId],
//     queryFn: () => productService.getProductActivity(productId),
//     staleTime: 1000 * 60,
//     retry: 0,
//     enabled: !!productId,
//   });

// // ==================== MUTATIONS ====================
// export const useCreateProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation<CreateProductResponse, Error, CreateProductPayload>({
//     mutationFn: productService.createProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation<ProductResponse, Error, UpdateProductPayload>({
//     mutationFn: productService.updateProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// export const usePostProductForSale = () => {
//   const queryClient = useQueryClient();
//   return useMutation<ProductResponse, Error, PostProductPayload>({
//     mutationFn: productService.postProductForSale,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// 'use client';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import {
//   Product,
//   OwnedProduct,
//   ProductActivity,
//   CreateProductPayload,
//   CreateProductResponse,
//   UpdateProductPayload,
//   ProductResponse,
//   PostProductPayload,
// } from '../types/product';
// import * as productService from '../services/productService';

// // ==================== DEFAULT OPTIONS ====================
// const defaultQueryOptions = {
//   staleTime: 1000 * 60, // 1 phút
//   retry: 1,
// };

// // ==================== QUERIES ====================

// /**
//  * Lấy tất cả sản phẩm đang được đăng bán
//  */
// export const useAllProducts = () =>
//   useQuery<Product[]>({
//     queryKey: ['products'],
//     queryFn: productService.getAllProducts,
//     ...defaultQueryOptions,
//   });

// /**
//  * Lấy tất cả sản phẩm mà người dùng sở hữu hoặc đã tạo
//  */
// export const useOwnedProducts = () =>
//   useQuery<OwnedProduct[]>({
//     queryKey: ['ownedProducts'],
//     queryFn: productService.getAllOwnedProducts,
//     ...defaultQueryOptions,
//   });

// /**
//  * Lấy chi tiết sản phẩm theo ID
//  * Nếu backend không có endpoint /get/:id, dùng getAllProducts() và filter
//  */
// export const useProduct = (id: number) =>
//   useQuery<Product | undefined>({
//     queryKey: ['product', id],
//     queryFn: async () => {
//       const products = await productService.getAllProducts();
//       const product = products.find((p) => p.id === id);
//       if (!product) return undefined; // hoặc throw new Error(`Product with id ${id} not found`);
//       return product;
//     },
//     enabled: !!id,
//     staleTime: 1000 * 60,
//     retry: 1,
//   });

// /**
//  * Lấy toàn bộ lịch sử hoạt động của sản phẩm
//  */
// export const useProductActivity = (productId: number) =>
//   useQuery<ProductActivity[]>({
//     queryKey: ['productActivity', productId],
//     queryFn: () => productService.getProductActivity(productId),
//     enabled: !!productId,
//     staleTime: 1000 * 60,
//     retry: 0,
//   });

// // ==================== MUTATIONS ====================

// /**
//  * Tạo sản phẩm mới
//  */
// export const useCreateProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation<CreateProductResponse, Error, CreateProductPayload>({
//     mutationFn: productService.createProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// /**
//  * Cập nhật sản phẩm
//  */
// export const useUpdateProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation<ProductResponse, Error, UpdateProductPayload>({
//     mutationFn: productService.updateProduct,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// /**
//  * Đăng bán sản phẩm
//  */
// export const usePostProductForSale = () => {
//   const queryClient = useQueryClient();

//   return useMutation<ProductResponse, Error, PostProductPayload>({
//     mutationFn: productService.postProductForSale,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import * as productService from '../services/productService';
// import { useToggleLike } from './useLike';
// import { useCallback } from 'react';

// ==================== DEFAULT OPTIONS ====================
const defaultQueryOptions = {
  staleTime: 1000 * 60, // 1 phút
  retry: 1,
};

// ==================== QUERIES ====================

/**
 * Lấy tất cả sản phẩm đang được đăng bán
 */
export const useAllProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
    ...defaultQueryOptions,
  });


/**
 * Lấy tất cả sản phẩm mà người dùng sở hữu hoặc đã tạo
 */
// export const useOwnedProducts = () =>
//   useQuery<OwnedProduct[]>({
//     queryKey: ['ownedProducts'],
//     queryFn: productService.getAllOwnedProducts,
//     ...defaultQueryOptions,
//   });

export const useOwnedProducts = () =>
  useQuery<OwnedProduct[]>({
    queryKey: ['ownedProducts'],
    queryFn: productService.getAllOwnedProducts,
    ...defaultQueryOptions,
  });

/**
 * Lấy chi tiết sản phẩm theo ID (tối ưu: ưu tiên cache trước)
 */
export const useProduct = (id: number) => {
  const queryClient = useQueryClient();

  return useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: async () => {
      // Ưu tiên lấy từ cache (products list)
      const cachedProducts = queryClient.getQueryData<Product[]>(['products']);
      if (cachedProducts) {
        const cached = cachedProducts.find((p) => p.id === id);
        if (cached) return cached;
      }

      // Nếu cache chưa có thì gọi API getAll
      const products = await productService.getAllProducts();
      return products.find((p) => p.id === id);
    },
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

/**
 * Lấy toàn bộ lịch sử hoạt động của sản phẩm
 */
export const useProductActivity = (productId: number) =>
  useQuery<ProductActivity[]>({
    queryKey: ['productActivity', productId],
    queryFn: () => productService.getProductActivity(productId),
    enabled: !!productId,
    staleTime: 1000 * 60,
    retry: 0,
  });

// ==================== MUTATIONS ====================

/**
 * Tạo sản phẩm mới
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateProductResponse, Error, CreateProductPayload>({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
    },
  });
};

/**
 * Cập nhật sản phẩm
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<string>, Error, UpdateProductPayload>({
    mutationFn: productService.updateProduct,
    onSuccess: (response, variables) => {
      // Cập nhật cache của React Query để UI hiển thị tokenURI mới ngay
      if (response.data) {
        queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      }

      // Invalidate queries nếu cần refetch danh sách
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
    },
  });
};

/**
 * Hook đăng bán sản phẩm hoặc chỉnh sửa trạng thái bán
 */
export const usePostProductForSale = () => {
  const queryClient = useQueryClient();

  return useMutation<ProductResponse, Error, PostProductPayload>({
    mutationFn: productService.postProductForSale,
    onSuccess: () => {
      // Refresh danh sách sản phẩm và sản phẩm sở hữu
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
    },
  });
};

/**
 * gọi product theo collection
 */
export const useGetProductsByCollection = (collectionId: number, enabled = true) => {
  return useQuery<Product[]>({
    queryKey: ['products-by-collection', collectionId],
    queryFn: () => productService.getProductsByCollection(collectionId),
    enabled, // chỉ fetch khi enabled = true
    staleTime: 1000 * 60, // cache 1 phút
  });
};