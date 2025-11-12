import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  updateProduct,
  UpdateProductPayload,
  ProductResponse,
} from '@/services/product_fixService';
import {
  postProductForSale,
  PostProductPayload,
} from '@/services/product_sellService';

export const useUpdateProduct = () => {
  return useMutation<ProductResponse, Error, UpdateProductPayload>({
    mutationFn: updateProduct,
    onSuccess: () => toast.success('Product updated successfully!'),
    onError: (err) => toast.error(err.message || 'Failed to update product'),
  });
};

export const usePostProductForSale = () => {
  return useMutation<ProductResponse, Error, PostProductPayload>({
    mutationFn: postProductForSale,
    onSuccess: () => toast.success('Product posted for sale successfully!'),
    onError: (err) =>
      toast.error(err.message || 'Failed to post product for sale'),
  });
};
