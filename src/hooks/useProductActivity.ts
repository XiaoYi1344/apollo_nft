'use client';
import { useQuery } from '@tanstack/react-query';
import { getProductActivity, ProductActivity } from '@/services/activityService';

export const useProductActivity = (productId?: number) => {
  return useQuery<ProductActivity[], Error>({
    queryKey: ['productActivity', productId],
    queryFn: async () => {
      if (!productId) return [];
      return getProductActivity(productId);
    },
    enabled: Boolean(productId),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 2, // retry 2 lần khi request fail
  });
};
