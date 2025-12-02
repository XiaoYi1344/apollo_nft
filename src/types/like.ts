export type TargetType = 'post' | 'comment' | 'nft' | 'artist';

export interface LikeRequest {
  targetId: number;
  targetType: TargetType;
}

export interface LikeResponse {
  success: boolean;
  liked: boolean;
}

// types/like-map.ts
export interface NftDetail {
  id: number;
  isLike: boolean;
  likeCount: number;
}

export interface ArtistDetail {
  id: number;
  isLike: boolean;
  likeCount: number;
}

export interface PostDetail {
  id: number;
  isLike: boolean;
  likeCount: number;
}

export interface CommentDetail {
  id: number;
  isLike: boolean;
  likeCount: number;
}

export type LikeTargetMap = {
  nft: NftDetail;
  artist: ArtistDetail;
  post: PostDetail;
  comment: CommentDetail;
};
