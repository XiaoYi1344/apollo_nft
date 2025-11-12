// import { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { createProduct, CreateProductPayload, CreateProductResponse } from '@/services/product_createService';
// import toast from 'react-hot-toast';

// export const useCreateProduct = () => {
//   const [loading, setLoading] = useState(false);
//   const [product, setProduct] = useState<CreateProductResponse | null>(null);

//   const submitProduct = async (data: CreateProductPayload) => {
//     try {
//       setLoading(true);
//       const result = await createProduct(data);
//       setProduct(result);
//       toast.success('Product created successfully!');
//       return result;
//     } catch (err: unknown) {
//       console.error(err);

//       // Xử lý lỗi an toàn với TypeScript
//       if (axios.isAxiosError(err)) {
//         toast.error(err.response?.data?.message || 'Failed to create product');
//       } else if (err instanceof Error) {
//         toast.error(err.message);
//       } else {
//         toast.error('Failed to create product');
//       }

//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     product,
//     submitProduct,
//   };
// };

'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createProduct, CreateProductPayload, CreateProductResponse } from '@/services/product_createService';
import { AxiosError } from 'axios';

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<CreateProductResponse | null>(null);

  const submitProduct = async (data: CreateProductPayload) => {
    try {
      setLoading(true);
      const result = await createProduct(data);
      setProduct(result);
      toast.success('Product created successfully!');
      return result;
    } catch (err: unknown) {
      // Proper type narrowing for Axios errors
      if (err instanceof AxiosError) {
        console.error('Axios error:', err.response?.data || err.message);
        toast.error(
          (err.response?.data as { message?: string })?.message || err.message || 'Failed to create product'
        );
      } else if (err instanceof Error) {
        console.error('Unknown error:', err.message);
        toast.error(err.message);
      } else {
        console.error('Unexpected error:', err);
        toast.error('Failed to create product due to unknown error');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, product, submitProduct };
};
