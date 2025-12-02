// types/artist.ts
export type TimeRange = '24h' | '7d' | '30d';
export type SortBy = 'followerCount' | 'nftsSold' | 'totalVolume' | 'all';

export interface Artist {
  id: number;
  userName: string;
  fullName: string;
  avatar: string;
  addressWallet: string;
  followerCount: string;
  nftsSold: string;
  totalVolume: string;
}

export interface GetAllArtistsResponse {
  data: Artist[];
}
