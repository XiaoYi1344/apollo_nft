import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API;

// ==================== TYPES ====================

export interface ProductProperty {
  type: string;
  name: string;
  supply: number;
  blockchain: string;
}

export interface ProductCreator {
  userName: string;
  addressWallet: string;
}

export interface ProductOwner {
  userName: string;
  addressWallet: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  externalLink?: string;
  properties: ProductProperty[];
  tokenId: string;
  contractAddress: string;
  tokenURI: string;
  isFreeze: boolean;
  status: 'buyNow' | 'onAuction' | 'hasOffer' | null;
  price: number;
  creator: ProductCreator;
  ownedBy: ProductOwner[];

  // ✅ thêm 2 dòng này
  supply: number;
  blockchain: string;
}


// ==================== SERVICE ====================
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const token = Cookies.get('accessToken');
    const res = await axios.get(`${API_URL}/api/product/get-all`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'ngrok-skip-browser-warning': 'true',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    // ✅ Trả ra mảng trong res.data.data
    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    } else {
      console.error('Unexpected response structure:', res.data);
      throw new Error('Invalid API response format');
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error('Axios error:', err.response?.data || err.message);
      throw new Error(err.response?.data?.message || 'Failed to fetch products');
    } else {
      console.error('Unknown error', err);
      throw new Error('Failed to fetch products due to unknown error');
    }
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  const token = Cookies.get('accessToken');
  const res = await axios.get(`${API_URL}/api/product/get/${id}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });
  return res.data.data; // tùy API trả về
};

