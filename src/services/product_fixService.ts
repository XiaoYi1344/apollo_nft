// import axios from 'axios';
// import Cookies from 'js-cookie';

// const API_URL = process.env.NEXT_PUBLIC_API;

// // ==================== TYPES ====================
// export interface ProductProperty {
//   type: string;
//   name: string;
//   supply: number;
//   blockchain: string;
// }

// export interface UpdateProductPayload {
//   id?: number;
//   name: string;
//   description: string;
//   image?: File;
//   externalLink?: string;
//   properties: ProductProperty[];
// }

// export interface PostProductPayload {
//   id: number;
//   price: number;
//   status?: 'buyNow' | 'onAuction' | 'hasOffer';
// }

// export interface ProductResponse {
//   image: string;
//   tokenURI?: string;
//   blockchain?: string;
//   tokenId?: string;
//   contractAddress?: string;
// }

// // ==================== SERVICE ====================

// // API sửa sản phẩm
// export const updateProduct = async (data: UpdateProductPayload): Promise<ProductResponse> => {
//   try {
//     const formData = new FormData();
//     if (data.id) formData.append('id', data.id.toString());
//     formData.append('name', data.name);
//     formData.append('description', data.description);
//     if (data.image) formData.append('image', data.image);
//     if (data.externalLink) formData.append('externalLink', data.externalLink);
//     formData.append('properties', JSON.stringify(data.properties));

//     const token = Cookies.get('accessToken');

//     const res = await axios.post<ProductResponse>(`${API_URL}/api/product`, formData, {
//       headers: {
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         'ngrok-skip-browser-warning': 'true',
//         Accept: 'application/json',
//       },
//       withCredentials: true,
//     });

//     return res.data;
//   } catch (err: unknown) {
//     if (axios.isAxiosError(err)) {
//       console.error('Axios error:', err.response?.data || err.message);
//       throw new Error(err.response?.data?.message || 'Failed to update product');
//     } else {
//       console.error('Unknown error', err);
//       throw new Error('Failed to update product due to unknown error');
//     }
//   }
// };


import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API;

export interface ProductProperty {
  type: string;
  name: string;
  supply: number;
  blockchain: string;
  tokenId?: string; // tokenId khi mint lần đầu
}

export interface UpdateProductPayload {
  id: string; // PUT yêu cầu id là string
  name: string;
  description: string;
  image?: File;
  externalLink?: string;
  properties: ProductProperty[];
  price?: number;
}

export interface ProductResponse {
  image: string;
  tokenURI?: string;
  blockchain?: string;
  tokenId?: string;
  contractAddress?: string;
}

export const updateProduct = async (data: UpdateProductPayload): Promise<ProductResponse> => {
  try {
    const formData = new FormData();
    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.image) formData.append('image', data.image);
    if (data.externalLink) formData.append('externalLink', data.externalLink);
    formData.append('properties', JSON.stringify(data.properties));
    if (data.price !== undefined) formData.append('price', data.price.toString());

    const token = Cookies.get('accessToken');

    const res = await axios.put<ProductResponse>(`${API_URL}/api/product`, formData, {
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
      throw new Error((err.response?.data as { message?: string })?.message || 'Failed to update product');
    } else if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('Unknown error while updating product');
    }
  }
};
