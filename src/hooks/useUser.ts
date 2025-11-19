// 'use client';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { UserProfile, UpdateUserPayload, UpdateUserBackgroundPayload } from '@/types/user';
// import userService from '@/services/userService';

// const defaultQueryOptions = { staleTime: 1000 * 60, retry: 1 };

// // ==================== QUERIES ====================

// /**
//  * Xem profile người khác theo addressWallet
//  */
// export const useUserProfileByWallet = (addressWallet: string) => {
//   return useQuery<UserProfile, Error>({
//     queryKey: ['userProfile', addressWallet],
//     queryFn: () => userService.getUserProfileByWallet(addressWallet),
//     enabled: !!addressWallet,
//     ...defaultQueryOptions,
//   });
// };

// /**
//  * Xem profile cá nhân
//  */
// export const useUserProfile = () => {
//   return useQuery<UserProfile, Error>({
//     queryKey: ['myProfile'],
//     queryFn: () => userService.getUserProfile(),
//     ...defaultQueryOptions,
//   });
// };

// // ==================== MUTATIONS ====================

// /**
//  * Cập nhật profile
//  */
// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();

//   return useMutation<UserProfile, Error, UpdateUserPayload>({
//     mutationFn: (data: UpdateUserPayload) => userService.updateUser(data),
//     onSuccess: (updatedUser) => {
//       queryClient.setQueryData<UserProfile>(['myProfile'], updatedUser);
//     },
//   });
// };

// /**
//  * Cập nhật banner
//  */
// export const useUpdateUserBackground = () => {
//   const queryClient = useQueryClient();

//   return useMutation<UserProfile, Error, UpdateUserBackgroundPayload>({
//     mutationFn: (data) => userService.updateUserBackground(data),
//     onSuccess: (updatedUser) => {
//       // Cập nhật query cache cho profile
//       queryClient.setQueryData<UserProfile>(['myProfile'], updatedUser);
//     },
//   });
// };

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserProfile, UpdateUserPayload, UpdateUserBackgroundPayload } from '@/types/user';
import userService from '@/services/userService';

const defaultQueryOptions = { staleTime: 1000 * 60, retry: 1 };

// Profile người khác
export const useUserProfileByWallet = (addressWallet: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: ['userProfile', addressWallet],
    queryFn: () => userService.getUserProfileByWallet(addressWallet),
    enabled: !!addressWallet,
    ...defaultQueryOptions,
  });
};

// Profile cá nhân
export const useUserProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ['myProfile'],
    queryFn: () => userService.getUserProfile(),
    ...defaultQueryOptions,
  });
};

// Cập nhật profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserProfile, Error, UpdateUserPayload>({
    mutationFn: userService.updateUser,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserProfile>(['myProfile'], updatedUser);
    },
  });
};

// Cập nhật banner
export const useUpdateUserBackground = () => {
  const queryClient = useQueryClient();
  return useMutation<UserProfile, Error, UpdateUserBackgroundPayload>({
    mutationFn: userService.updateUserBackground,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData<UserProfile>(['myProfile'], updatedUser);
    },
  });
};
