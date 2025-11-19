export interface FollowRequest {
  followingAddressWallet: string;
}

export interface FollowResponse {
  success: boolean;
  followed: boolean;
}
