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
} from '../types/product';
import * as productService from '../services/productService';

// ==================== DEFAULT OPTIONS ====================
const defaultQueryOptions = { staleTime: 1000 * 60, retry: 1 };

// ==================== QUERIES ====================
export const useAllProducts = () =>
  useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
    ...defaultQueryOptions,
  });

export const useOwnedProducts = () =>
  useQuery<OwnedProduct[]>({
    queryKey: ['ownedProducts'],
    queryFn: productService.getAllOwnedProducts,
    ...defaultQueryOptions,
  });

export const useProduct = (id: number) =>
  useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
    ...defaultQueryOptions,
  });

export const useProductActivity = (productId: number) =>
  useQuery<ProductActivity[]>({
    queryKey: ['productActivity', productId],
    queryFn: () => productService.getProductActivity(productId),
    enabled: !!productId,
    staleTime: 1000 * 60,
    retry: 0,
  });

// ==================== MUTATIONS ====================
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateProductResponse, Error, CreateProductPayload>({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductResponse, Error, UpdateProductPayload>({
    mutationFn: productService.updateProduct,
    onSuccess: () => {
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
