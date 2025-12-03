// hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import categoryService from '@/services/categoryService';
import { Category, CategoryType } from '@/types/category';

export function useCategories(type: CategoryType) {
  return useQuery({
    queryKey: ['categories', type],
    queryFn: () => categoryService.getAllCategories(type),
  });
}
