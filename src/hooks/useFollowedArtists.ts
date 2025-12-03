// hooks/useFollowedArtists.ts
import { useQuery } from '@tanstack/react-query';
import { followService } from '@/services/LikeFollowService';
import { ArtistDetail } from '@/types/like';

export const useFollowedArtists = () => {
  return useQuery<ArtistDetail[], Error>({
    queryKey: ['followedArtists'],
    queryFn: async () => {
      const res = await followService.getAllFollowed();
      return res.data as ArtistDetail[];
    },
  });
};
