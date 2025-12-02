'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  UserProfile,
  UpdateUserPayload,
  UpdateUserBackgroundPayload,
} from '@/types/user';
import userService from '@/services/userService';

const defaultQueryOptions = { staleTime: 1000 * 60, retry: 1 };

// ==================== QUERIES ====================

/**
 * Xem profile người khác theo addressWallet
 */
export const useUserProfileByWallet = (addressWallet: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: ['userProfile', addressWallet],
    queryFn: () => userService.getUserProfileByWallet(addressWallet),
    enabled: !!addressWallet,
    ...defaultQueryOptions,
  });
};
export const useUserNameByWallet = (addressWallet: string) => {
  return useQuery<string | undefined, Error>({
    queryKey: ['userProfile', addressWallet],
    queryFn: async () => {
      const profile = await userService.getUserProfileByWallet(addressWallet);
      return profile?.userName; // chỉ trả về username
    },
    enabled: !!addressWallet,
    ...defaultQueryOptions,
  });
};

/**
 * Xem profile cá nhân
 */
export const useUserProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ['myProfile'],
    queryFn: () => userService.getUserProfile(),
    ...defaultQueryOptions,
  });
};

// ==================== MUTATIONS ====================

/**
 * Cập nhật profile
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, UpdateUserPayload>({
    mutationFn: (data: UpdateUserPayload) => userService.updateUser(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserProfile>(['myProfile'], updatedUser);
    },
  });
};

/**
 * Cập nhật banner
 */
export const useUpdateUserBackground = () => {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, UpdateUserBackgroundPayload>({
    mutationFn: (data) => userService.updateUserBackground(data),
    onSuccess: (updatedUser) => {
      // Cập nhật query cache cho profile
      queryClient.setQueryData<UserProfile>(['myProfile'], updatedUser);
    },
  });
};
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import userApi from '@/services/userService';
// import { UserProfile, UpdateUserPayload, UpdateUserBackgroundPayload } from '@/types/user';

// const defaultQueryOptions = { staleTime: 60 * 1000, retry: 1 };

// export const useUserProfile = () => {
//   return useQuery<UserProfile, Error>({
//     queryKey: ['myProfile'],
//     queryFn: () => userApi.getUserProfile(),
//     ...defaultQueryOptions,
//   });
// };

// export const useUserProfileByWallet = (addressWallet: string) => {
//   return useQuery<UserProfile, Error>({
//     queryKey: ['userProfile', addressWallet],
//     queryFn: () => userApi.getUserProfileByWallet(addressWallet),
//     enabled: !!addressWallet,
//     ...defaultQueryOptions,
//   });
// };

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation<UserProfile, Error, UpdateUserPayload>({
//     mutationFn: userApi.updateUser,
//     onSuccess: updatedUser => {
//       queryClient.setQueryData(['myProfile'], updatedUser);
//     },
//   });
// };

// export const useUpdateUserBackground = () => {
//   const queryClient = useQueryClient();
//   return useMutation<UserProfile, Error, UpdateUserBackgroundPayload>({
//     mutationFn: userApi.updateUserBackground,
//     onSuccess: updatedUser => {
//       queryClient.setQueryData(['myProfile'], updatedUser);
//     },
//   });
// };
