import { useQuery } from '@tanstack/react-query';
import { getAllOwnedProducts, OwnedProduct } from '@/services/product_ownedService';

export const useOwnedProducts = () => {
  return useQuery<OwnedProduct[], Error>({
    queryKey: ['ownedProducts'],
    queryFn: getAllOwnedProducts,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
