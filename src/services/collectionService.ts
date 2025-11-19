import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Collection,
  CreateCollectionRequest,
  UpdateCollectionRequest,
  ProductCollectionRequest,
} from '@/types/collection';

const API_URL = process.env.NEXT_PUBLIC_API + '/api';

// Header mặc định
const defaultHeaders = {
  'ngrok-skip-browser-warning': 'true',
};

// Lấy accessToken từ cookie
const getToken = () => Cookies.get('accessToken') || '';

export const collectionService = {
  getImage: (imageId: string) =>
    axios.get(`${API_URL}/upload/${imageId}`, {
      headers: { ...defaultHeaders },
      withCredentials: true,
    }),

  createCollection: (data: CreateCollectionRequest) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image);

    return axios.post(`${API_URL}/collection`, formData, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  },

  updateCollection: (data: UpdateCollectionRequest) => {
    const formData = new FormData();
    formData.append('id', data.id.toString());
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('image', data.image);

    return axios.put(`${API_URL}/collection`, formData, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  },

  deleteCollection: (collectionId: number) =>
    axios.delete(`${API_URL}/collection/${collectionId}`, {
      headers: { ...defaultHeaders, Authorization: `Bearer ${getToken()}` },
      withCredentials: true,
    }),

  updateProductCollection: (data: ProductCollectionRequest) =>
    axios.put(`${API_URL}/collection/product-collection`, data, {
      headers: { ...defaultHeaders, Authorization: `Bearer ${getToken()}` },
      withCredentials: true,
    }),

  getAllCollections: () =>
    axios.get<{ result: Collection[] }>(`${API_URL}/collection/get-all`, {
      headers: { ...defaultHeaders },
      withCredentials: true,
    }),

  getAllOwnedCollections: () =>
    axios.get<{ result: Collection[] }>(`${API_URL}/collection/get-all-owned`, {
      headers: { ...defaultHeaders, Authorization: `Bearer ${getToken()}` },
      withCredentials: true,
    }),
};
