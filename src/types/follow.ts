// types/follow.ts
export interface FollowRequest {
  followingAddressWallet: string;
}

export interface FollowResponse {
  success: boolean;
  followed: boolean; // true: followed, false: unfollowed
}
