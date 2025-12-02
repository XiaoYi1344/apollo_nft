import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeService } from '@/services/LikeFollowService';
import {
  LikeRequest,
  LikeResponse,
  LikeTargetMap,
  TargetType,
} from '@/types/like';
import { Product } from '@/types/product';

export function useToggleLike() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    LikeResponse,
    Error,
    LikeRequest,
    { previousData?: LikeTargetMap[TargetType] }
  >({
    mutationFn: (payload) => likeService.toggleLike(payload),

    onMutate: async (payload) => {
      const keyMap: Record<TargetType, [string, number]> = {
        nft: ['nft', payload.targetId],
        artist: ['artist', payload.targetId],
        post: ['post', payload.targetId],
        comment: ['comment', payload.targetId],
      };

      const key = keyMap[payload.targetType];

      await queryClient.cancelQueries({ queryKey: key });

      const previousData =
        queryClient.getQueryData<LikeTargetMap[TargetType]>(key);

      if (previousData) {
        queryClient.setQueryData<LikeTargetMap[TargetType]>(key, (old) => {
          if (!old) return old!;
          return {
            ...old,
            isLike: !old.isLike,
            likeCount: old.isLike ? old.likeCount - 1 : old.likeCount + 1,
          };
        });
      }

      return { previousData };
    },

    onError: (_err, payload, context) => {
      const keyMap: Record<TargetType, [string, number]> = {
        nft: ['nft', payload.targetId],
        artist: ['artist', payload.targetId],
        post: ['post', payload.targetId],
        comment: ['comment', payload.targetId],
      };

      const key = keyMap[payload.targetType];

      if (context?.previousData) {
        queryClient.setQueryData(key, context.previousData);
      }
    },

    onSettled: (_data, _err, payload) => {
      const keyMap: Record<TargetType, [string, number]> = {
        nft: ['nft', payload.targetId],
        artist: ['artist', payload.targetId],
        post: ['post', payload.targetId],
        comment: ['comment', payload.targetId],
      };

      queryClient.invalidateQueries({
        queryKey: keyMap[payload.targetType],
      });
    },
  });

  return mutation;
}
