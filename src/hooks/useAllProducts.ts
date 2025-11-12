import { useQuery } from '@tanstack/react-query';
import { getAllProducts, Product } from '@/services/product_allService';

export const useAllProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['allProducts'],
    queryFn: getAllProducts,
    staleTime: 1000 * 60, // 1 phút
    refetchOnWindowFocus: false,
  });
};
