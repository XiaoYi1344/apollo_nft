// services/artistService.ts
import { Artist, GetAllArtistsResponse, TimeRange, SortBy } from '../types/artist';

interface GetAllArtistsParams {
  timeRange: TimeRange;
  sortBy: SortBy;
}

const API_URL = process.env.NEXT_PUBLIC_API;

export const getAllArtists = async (params: GetAllArtistsParams): Promise<Artist[]> => {
  const query = new URLSearchParams({
    timeRange: params.timeRange,
    sortBy: params.sortBy,
  }).toString();

  const res = await fetch(`${API_URL}/api/user/get-all-artist?${query}`, {
    headers: {
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch artists');
  }

  const data: GetAllArtistsResponse = await res.json();
  return data.data;
};
