import axios from "axios";
import Cookies from "js-cookie";
import { Event } from "@/types/events";

const API_URL = process.env.NEXT_PUBLIC_API;

const getAuthHeader = () => {
  const token = Cookies.get("accessToken") || localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = axios.create({
  baseURL: API_URL,
  headers: { ...getAuthHeader(), "ngrok-skip-browser-warning": "true" },
});

const eventService = {
  getAllEvents: async (page: number = 1): Promise<{ data: Event[]; limit: number; total: number; totalPages: number }> => {
    const res = await api.get(`/api/events/get-all?page=${page}`);
    return res.data;
  },
};

export default eventService;
