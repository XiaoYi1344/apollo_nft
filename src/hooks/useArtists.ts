// hooks/useArtists.ts
import { useQuery } from '@tanstack/react-query';
import { getAllArtists } from '../services/artistService';
import { Artist, TimeRange, SortBy } from '../types/artist';

interface UseArtistsOptions {
  timeRange: TimeRange;
  sortBy: SortBy;
}

export const useArtists = ({ timeRange, sortBy }: UseArtistsOptions) => {
  return useQuery<Artist[], Error>({
    queryKey: ['artists', timeRange, sortBy],
    queryFn: () => getAllArtists({ timeRange, sortBy }),
    staleTime: 5 * 60 * 1000, // 5 phút
    // keepPreviousData không còn cần thiết, v6 tự xử lý data cũ
  });
};

export const useArtistsByWeek = () => {
  return useQuery<Artist[], Error>({
    queryKey: ['artists'],
    queryFn: () => getAllArtists({ timeRange: '7d', sortBy: 'all' }), // mặc định backend
    staleTime: 5 * 60 * 1000,
  });
};
