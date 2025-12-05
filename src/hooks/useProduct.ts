

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
  UpdateListingPayload,
  UpdateListingResponse,
  CancelProductPayload,
  CancelProductResponse,
} from '../types/product';
import * as productService from '../services/productService';
import { useMemo } from 'react';

// ==================== DEFAULT OPTIONS ====================
const defaultQueryOptions = {
  staleTime: 1000 * 60, // 1 phút
  retry: 1,
};

// ==================== HELPERS ====================
function computeTotalInstock(p: Product | OwnedProduct): number {
  if ('totalInstock' in p && typeof (p as OwnedProduct).totalInstock === 'number') {
    return (p as OwnedProduct).totalInstock;
  }
  return p.instock ?? 0;
}

// ==================== QUERIES ====================
export const useAllProducts = (page = 1) =>
  useQuery<Product[]>({
    queryKey: ['products', page],
    queryFn: async () => {
      const { products } = await productService.getAllProducts(page);
      return products;
    },
    ...defaultQueryOptions,
  });

export const useOwnedProducts = (page = 1) =>
  useQuery<OwnedProduct[]>({
    queryKey: ['ownedProducts', page],
    queryFn: async () => {
      const { ownedProducts } = await productService.getAllOwnedProducts(page);
      return ownedProducts;
    },
    ...defaultQueryOptions,
  });

export const useProduct = (id: number) =>
  useQuery<Product | undefined>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { products } = await productService.getAllProducts();
      return products.find((p) => p.id === id);
    },
    enabled: !!id,
    ...defaultQueryOptions,
  });

export const useProductAndOwned = (id: number) =>
  useQuery<Product | OwnedProduct | undefined>({
    queryKey: ['product', id],
    queryFn: async () => {
      const { products } = await productService.getAllProducts();
      const found = products.find((p) => p.id === id);
      if (found) return found;

      const { ownedProducts } = await productService.getAllOwnedProducts();
      return ownedProducts.find((p) => p.id === id);
    },
    enabled: !!id,
    ...defaultQueryOptions,
  });

export const useProductActivity = (productId: number) =>
  useQuery<ProductActivity[]>({
    queryKey: ['productActivity', productId],
    queryFn: () => productService.getProductActivity(productId),
    enabled: !!productId,
    ...defaultQueryOptions,
  });

export const useProductsByCollection = (
  collectionId: number,
  enabled = true,
  addressWallet?: string,
  page = 1,
) =>
  useQuery<OwnedProduct[]>({
    queryKey: ['productsByCollection', collectionId, addressWallet, page],
    queryFn: async () => {
      const { products } = await productService.getProductsByCollection(
        collectionId,
        addressWallet,
        page,
      );
      return products.map((p) => ({
        ...p,
        totalInstock: computeTotalInstock(p),
      }));
    },
    enabled: !!collectionId && enabled,
    ...defaultQueryOptions,
  });

// ==================== MUTATIONS ====================
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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ tokenURI?: string }>, Error, UpdateProductPayload>({
    mutationFn: productService.updateProduct,
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['product', Number(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
    },
  });
};

export const usePostProductForSale = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductResponse, Error, PostProductPayload>({
    mutationFn: productService.postProductForSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
    },
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateListingResponse, Error, UpdateListingPayload>({
    mutationFn: productService.updateListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
    },
  });
};

export const useCancelProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<CancelProductResponse, Error, CancelProductPayload>({
    mutationFn: productService.cancelProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
    },
  });
};

// ==================== FILTER HELPER ====================
export function useFilteredProducts(products: OwnedProduct[], selectedStatuses: string[]) {
  return useMemo(() => {
    if (!selectedStatuses.length) return products;

    return products.filter((p) => {
      const hasListing = p.listingId != null && p.listingId > 0;
      const hasAuction = p.auctionId != null && p.auctionId > 0;

      if (selectedStatuses.includes('Buy Now') || selectedStatuses.includes('Has Offers')) {
        if (hasListing) return true;
      }

      if (selectedStatuses.includes('On Auction')) {
        if (hasAuction) return true;
      }

      return false;
    });
  }, [products, selectedStatuses]);
}


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
//   ApiResponse,
//   UpdateListingResponse,
//   UpdateListingPayload,
// } from '../types/product';
// import * as productService from '../services/productService';
// // import { useToggleLike } from './useLike';
// // import { useCallback } from 'react';

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
// // export const useOwnedProducts = () =>
// //   useQuery<OwnedProduct[]>({
// //     queryKey: ['ownedProducts'],
// //     queryFn: productService.getAllOwnedProducts,
// //     ...defaultQueryOptions,
// //   });

// export const useOwnedProducts = () =>
//   useQuery<OwnedProduct[]>({
//     queryKey: ['ownedProducts'],
//     queryFn: productService.getAllOwnedProducts,
//     ...defaultQueryOptions,
//   });

// /**
//  * Lấy chi tiết sản phẩm theo ID (tối ưu: ưu tiên cache trước)
//  */
// export const useProduct = (id: number) => {
//   const queryClient = useQueryClient();

//   return useQuery<Product | undefined>({
//     queryKey: ['product', id],
//     queryFn: async () => {
//       // Ưu tiên lấy từ cache (products list)
//       const cachedProducts = queryClient.getQueryData<Product[]>(['products']);
//       if (cachedProducts) {
//         const cached = cachedProducts.find((p) => p.id === id);
//         if (cached) return cached;
//       }

//       // Nếu cache chưa có thì gọi API getAll
//       const products = await productService.getAllProducts();
//       return products.find((p) => p.id === id);
//     },
//     enabled: !!id,
//     staleTime: 1000 * 60,
//     retry: 1,
//   });
// };

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

//   return useMutation<ApiResponse<string>, Error, UpdateProductPayload>({
//     mutationFn: productService.updateProduct,
//     onSuccess: (response, variables) => {
//       // Cập nhật cache của React Query để UI hiển thị tokenURI mới ngay
//       if (response.data) {
//         queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
//       }

//       // Invalidate queries nếu cần refetch danh sách
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// /**
//  * Hook đăng bán sản phẩm hoặc chỉnh sửa trạng thái bán
//  */
// export const usePostProductForSale = () => {
//   const queryClient = useQueryClient();

//   return useMutation<ProductResponse, Error, PostProductPayload>({
//     mutationFn: productService.postProductForSale,
//     onSuccess: () => {
//       // Refresh danh sách sản phẩm và sản phẩm sở hữu
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// /**
//  * Update listing (buyNow <-> onAuction)
//  */
// export const useUpdateListing = () => {
//   const queryClient = useQueryClient();

//   return useMutation<UpdateListingResponse, Error, UpdateListingPayload>({
//     mutationFn: productService.updateListing,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['ownedProducts'] });
//     },
//   });
// };

// /**
//  * gọi product theo collection
//  */
// export const useGetProductsByCollection = (collectionId: number, enabled = true) => {
//   return useQuery<Product[]>({
//     queryKey: ['products-by-collection', collectionId],
//     queryFn: () => productService.getProductsByCollection(collectionId),
//     enabled, // chỉ fetch khi enabled = true
//     staleTime: 1000 * 60, // cache 1 phút
//     refetchOnWindowFocus: false,
//   });
// };
