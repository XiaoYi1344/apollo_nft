import axios from 'axios';
import Cookies from 'js-cookie';

export interface ProductProperty {
  type: string;
  name: string;
  supply: number;
  blockchain: string;
}

export interface UserInfo {
  userName: string;
  addressWallet: string;
}

export interface OwnedProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink: string;
  properties: ProductProperty[];
  tokenId?: string | null;
  contractAddress?: string | null;
  tokenURI: string;
  isFreeze: boolean;
  status?: 'buyNow' | 'onAuction' | 'hasOffer' | null;
  price: number;
  creator: UserInfo; 
  ownedBy: UserInfo[];
}

// API response type
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const API_URL = process.env.NEXT_PUBLIC_API;

export const getAllOwnedProducts = async (): Promise<OwnedProduct[]> => {
  try {
    const token = Cookies.get('accessToken');

    // <- tell axios exactly what shape the response is
    const res = await axios.get<ApiResponse<OwnedProduct[]>>(
      `${API_URL}/api/product/get-all-owned`,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'ngrok-skip-browser-warning': 'true',
        },
        withCredentials: true,
      }
    );

    return res.data.data; // TypeScript now knows this is OwnedProduct[]
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('Axios error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Failed to fetch owned products');
    } else {
      console.error('Unknown error', err);
      throw new Error('Failed to fetch owned products due to unknown error');
    }
  }
};
