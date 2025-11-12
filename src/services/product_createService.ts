// import axios from 'axios';
// import Cookies from 'js-cookie';

// export interface ProductProperty {
//   type: string;
//   name: string;
//   supply: number;
//   blockchain: string;
// }

// export interface CreateProductPayload {
//   name: string;
//   description: string;
//   externalLink?: string;
//   image: File;
//   properties: ProductProperty[];
//   freezeMetadata?: boolean; // thêm
//   price?: number;           // thêm nếu muốn gửi giá
// }

// export interface CreateProductResponse {
//   image: string;
//   tokenURI: string;
// }

// const API_URL = process.env.NEXT_PUBLIC_API; // 👉 nhớ là https://0a15896a3a25.ngrok-free.app

// export const createProduct = async (data: CreateProductPayload) => {
//   try {
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('description', data.description);
//     if (data.externalLink) formData.append('externalLink', data.externalLink);
//     formData.append('image', data.image);
//     formData.append('properties', JSON.stringify(data.properties));

//     const token = Cookies.get('accessToken');

//     const res = await axios.post<CreateProductResponse>(
//       `${API_URL}/api/product`,
//       formData,
//       {
//         headers: {
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           'ngrok-skip-browser-warning': 'true',
//           Accept: 'application/json',
//         },
//         withCredentials: true, // 👈 cần có nếu backend bật credentials
//       }
//     );

//     return res.data;
//   } catch (err: unknown) {
//     if (axios.isAxiosError(err)) {
//       console.error('Axios error:', err.response?.data || err.message);
//       throw new Error(err.response?.data?.message || 'Failed to create product');
//     } else {
//       console.error('Unknown error', err);
//       throw new Error('Failed to create product due to unknown error');
//     }
//   }
// };


import axios from 'axios';
import Cookies from 'js-cookie';

export interface ProductProperty {
  type: string;
  name: string;
  supply: number;
  // blockchain: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  externalLink?: string;
  image: File;
  properties: ProductProperty[];
  freezeMetadata?: boolean;
  price?: number;
}

export interface CreateProductResponse {
  image: string;
  tokenURI: string;
}

const API_URL = process.env.NEXT_PUBLIC_API;

export const createProduct = async (data: CreateProductPayload) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('description', data.description);
  if (data.externalLink) formData.append('externalLink', data.externalLink);
  formData.append('image', data.image);
  formData.append('properties', JSON.stringify(data.properties));
  if (data.freezeMetadata) formData.append('freezeMetadata', 'true');
  if (data.price) formData.append('price', String(data.price));

  const token = Cookies.get('accessToken');

  const res = await axios.post<CreateProductResponse>(
    `${API_URL}/api/product`,
    formData,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return res.data;
};
