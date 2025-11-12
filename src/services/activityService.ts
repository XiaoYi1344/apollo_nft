import axios from 'axios';

export interface ProductActivity {
  id: number;
  eventType: 'Mint' | 'List' | 'Sale' | 'Transfer' | 'Bid' | 'Offer' | 'Cancel Offer' | 'Accept Offer';
  price: string;
  quantity: number;
  fromAddress: string;
  toAddress: string;
  createdAt: string;
}

// Lấy URL từ env hoặc fallback localhost
const API_URL =
  process.env.NEXT_PUBLIC_API || 'http://localhost:3000';

export const getProductActivity = async (
  productId: number
): Promise<ProductActivity[]> => {
  try {
    const url = `${API_URL}/api/activity/get-all/${productId}`;
    console.log('Fetching from URL:', url);

    const res = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true', // nếu cần
      },
      timeout: 5000,
    });

    // Lấy mảng data
    if (!Array.isArray(res.data.data)) {
      throw new Error(
        'Unexpected API response (data is not an array): ' + JSON.stringify(res.data)
      );
    }

    return res.data.data; // ✅ lấy data thay vì toàn bộ object
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Failed to fetch product activity:', err.message);
    } else {
      console.error('Failed to fetch product activity:', err);
    }
    return []; // fallback
  }
};
