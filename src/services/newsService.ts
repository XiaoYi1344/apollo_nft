import axios from "axios";
import Cookies from "js-cookie";
import {
  News,
  CategoryNews,
  CreateNewsPayload,
  UpdateNewsPayload,
  UpdateViewPayload,
} from "@/types/news";

const API_URL = process.env.NEXT_PUBLIC_API;

const getAuthHeader = () => {
  const token = Cookies.get("accessToken") || localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = axios.create({
  baseURL: API_URL,
  headers: { "ngrok-skip-browser-warning": "true" },
});

const newsService = {
  // Lấy tất cả category
  getAllCategories: async (): Promise<CategoryNews[]> => {
    const res = await api.get("/api/category-new/get-all");
    return res.data.data;
  },

  // Lấy tất cả news
  getAllNews: async (): Promise<News[]> => {
    const res = await api.get("/api/news/get-all");
    return res.data.data;
  },

  // Lấy tất cả news của user (có token)
  getOwnedNews: async (): Promise<News[]> => {
    const res = await api.get("/api/news/get-owned-new", {
      headers: {
        ...getAuthHeader(),
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return res.data.data;
  },

  // Tạo news
  createNews: async (payload: CreateNewsPayload): Promise<News> => {
    const res = await api.post("/api/news", payload, {
      headers: {
        ...getAuthHeader(),
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return res.data.data;
  },

  // Cập nhật news
  updateNews: async (payload: UpdateNewsPayload): Promise<News> => {
    const res = await api.put("/api/news", payload, {
      headers: {
        ...getAuthHeader(),
        'ngrok-skip-browser-warning': 'true',
      },
    });
    return res.data.data;
  },

  // Xóa news
  deleteNews: async (id: number): Promise<void> => {
    await api.delete(`/api/news/${id}`, {
      headers: {
        ...getAuthHeader(),
        'ngrok-skip-browser-warning': 'true',
      },
    });
  },

  // Cập nhật view
  updateNewsView: async (payload: UpdateViewPayload): Promise<void> => {
    await api.put("/api/news/update-view", payload);
  },
};

export default newsService;
