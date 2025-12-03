// services/categoryService.ts
import axios from "axios";
import Cookies from "js-cookie";
import { Category, CategoryType } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API;

const getAuthHeader = () => {
  const token = Cookies.get("accessToken") || localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = axios.create({
  baseURL: API_URL,
  headers: { "ngrok-skip-browser-warning": "true" },
});

const categoryService = {
  getAllCategories: async (type: CategoryType): Promise<Category[]> => {
    const res = await api.get(`/api/category-new/get-all?type=${type}`, {
      headers: getAuthHeader(),
    });
    return res.data.data;
  },
};

export default categoryService;
