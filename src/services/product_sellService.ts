import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API;

export interface PostProductPayload {
  id: number;
  price: number;
  status: 'buyNow' | 'onAuction' | 'hasOffer';
}

export const postProductForSale = async (data: PostProductPayload) => {
  try {
    const token = Cookies.get('accessToken');
    const res = await axios.put(`${API_URL}/api/product/post-product`, data, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'ngrok-skip-browser-warning': 'true',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error((err.response?.data as { message?: string })?.message || 'Failed to post product');
    } else if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('Unknown error while posting product');
    }
  }
};
