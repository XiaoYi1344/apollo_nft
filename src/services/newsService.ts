

// services/newsService.ts
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  News,
  CreateNewsPayload,
  UpdateNewsPayload,
  UpdateViewPayload,
} from '@/types/news';

const API_URL = process.env.NEXT_PUBLIC_API;

const getAuthHeader = () => {
  const token =
    Cookies.get('accessToken') || localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = axios.create({
  baseURL: API_URL,
  headers: { 'ngrok-skip-browser-warning': 'true' },
});

const newsService = {
  getAllNews: async (page: number = 1) => {
    const res = await api.get(`/api/news/get-all?page=${page}`);
    return res.data;
  },

  getOwnedNews: async (page: number = 1) => {
    const res = await api.get(`/api/news/get-owned-new?page=${page}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  },

  createNews: async (payload: CreateNewsPayload): Promise<News> => {
    const res = await api.post('/api/news', payload, {
      headers: getAuthHeader(),
    });
    return res.data.data;
  },

  updateNews: async (payload: UpdateNewsPayload): Promise<News> => {
    const res = await api.put('/api/news', payload, {
      headers: getAuthHeader(),
    });
    return res.data.data;
  },

  deleteNews: async (id: number): Promise<void> => {
    await api.delete(`/api/news/${id}`, { headers: getAuthHeader() });
  },

  publishNews: async (id: number) => {
    await api.put(
      `/api/news/published-new/${id}`,
      {},
      { headers: getAuthHeader() },
    );
  },

  updateNewsView: async (payload: UpdateViewPayload) => {
    await api.put('/api/news/update-view', payload);
  },
};

export default newsService;
