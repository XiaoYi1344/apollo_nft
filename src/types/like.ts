export type TargetType = 'post' | 'comment' | 'nft' | 'artist';

export interface LikeRequest {
  targetId: number;
  targetType: TargetType;
}

export interface LikeResponse {
  success: boolean;
  liked: boolean;
}
