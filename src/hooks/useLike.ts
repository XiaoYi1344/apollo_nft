import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeService } from '@/services/LikeFollowService';
import { LikeRequest, LikeResponse } from '@/types/like';
import { Product } from '@/types/product';

export function useToggleLike() {
  const queryClient = useQueryClient();

  const mutation = useMutation<LikeResponse, Error, LikeRequest, { previousProduct?: Product }>({
    mutationFn: (payload: LikeRequest) => likeService.toggleLike(payload),
    onMutate: async (payload: LikeRequest) => {
      await queryClient.cancelQueries({ queryKey: ['product', payload.targetId] });

      const previousProduct = queryClient.getQueryData<Product>(['product', payload.targetId]);

      // Optimistic update
      queryClient.setQueryData<Product>(['product', payload.targetId], old => {
        if (!old) return old!;
        return { ...old, isLike: !old.isLike, likeCount: old.isLike ? old.likeCount - 1 : old.likeCount + 1 };
      });

      return { previousProduct };
    },
    onError: (_err, _payload, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(['product', context.previousProduct.id], context.previousProduct);
      }
    },
    onSettled: (_data, _error, payload: LikeRequest) => {
      queryClient.invalidateQueries({ queryKey: ['product', payload.targetId] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return mutation; // mutation.has mutate, isPending, isResolved, isRejected
}
