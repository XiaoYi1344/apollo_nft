import axios from 'axios';
import Cookies from 'js-cookie';
import {
  UserProfile,
  ApiResponse,
  UpdateUserPayload,
  UpdateUserBackgroundPayload,
} from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API + '/api';
export const getWallet = () => Cookies.get('account') || '';

const getAuthHeader = () => {
  const token = Cookies.get('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Profile người khác
export const getUserProfileByWallet = async (
  addressWallet: string,
): Promise<UserProfile> => {
  const myWallet = getWallet();
  const res = await axios.get<ApiResponse<UserProfile>>(
    `${API_URL}/user/get-profile`,
    {
      params: {
        addressWallet,
        myAddressWallet: myWallet || undefined,
      },
      headers: {
        ...getAuthHeader(),
        'ngrok-skip-browser-warning': 'true',
      },
      //withCredentials: true,
    },
  );

  return res.data.data;
};

// Get username by wallet address
export const getUserNameByWallet = async (wallet: string): Promise<string> => {
  if (!wallet) return '';
  try {
    const profile = await getUserProfileByWallet(wallet);
    return profile.userName || '';
  } catch (err) {
    console.error('Failed to fetch username:', err);
    return '';
  }
};


// Profile cá nhân
export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await axios.get<ApiResponse<UserProfile>>(`${API_URL}/user`, {
    headers: {
      ...getAuthHeader(),
      'ngrok-skip-browser-warning': 'true',
    },
    //withCredentials: true,
  });
  return res.data.data;
};

// Cập nhật profile
export const updateUser = async (
  data: UpdateUserPayload,
): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append('userName', data.userName);
  formData.append('fullName', data.fullName);
  formData.append('bio', data.bio);
  if (data.avatar) formData.append('avatar', data.avatar);

  const res = await axios.put<ApiResponse<UserProfile>>(
    `${API_URL}/user`,
    formData,
    {
      headers: {
        ...getAuthHeader(),
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'multipart/form-data',
      },
      //withCredentials: true,
    },
  );

  return res.data.data;
};


// Cập nhật banner
export const updateUserBackground = async (
  data: UpdateUserBackgroundPayload,
): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append('image', data.image);

  const res = await axios.put<ApiResponse<UserProfile>>(
    `${API_URL}/user/update-background`,
    formData,
    {
      headers: {
        ...getAuthHeader(),
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'multipart/form-data',
      },
      //withCredentials: true,
    },
  );

  return res.data.data;
};

// Avatar URL helper
// export const getUserAvatar = (imageId: string) =>
//   `${API_URL}/api/upload/${imageId}`;
export const getUserAvatar = (imageId: string) =>
  `https://res.cloudinary.com/dr6cnnvma/image/upload/v1763370298/${imageId}.png`;


const userApi = {
  getUserProfile,
  getUserProfileByWallet,
  updateUser,
  updateUserBackground,
  getUserAvatar,
};

export default userApi;
