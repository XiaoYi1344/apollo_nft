import { useQuery } from '@tanstack/react-query';
import { likeService } from '@/services/LikeFollowService';
import { ArtistDetail, NftDetail } from '@/types/like';

// Liked NFTs
export const useLikedNFTs = () =>
  useQuery<NftDetail[], Error>({
    queryKey: ['likedNFTs'],
    queryFn: async () => {
      const res = await likeService.getAllLiked('nft');
      return res.data as NftDetail[];
    },
  });

// Liked Artists
export const useLikedArtists = () =>
  useQuery<ArtistDetail[], Error>({
    queryKey: ['likedArtists'],
    queryFn: async () => {
      const res = await likeService.getAllLiked('artist');
      return res.data as ArtistDetail[];
    },
  });
