import { LikeRequest, LikeResponse } from "@/types/like";
import { FollowRequest, FollowResponse } from "@/types/follow";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API + "/api";

const defaultHeaders = {
  "ngrok-skip-browser-warning": "true",
};

const getToken = () => Cookies.get("accessToken") || "";
export const getWallet = () => Cookies.get("account") || ""; // ví đang login

const API = axios.create({
  baseURL: API_URL,
  headers: defaultHeaders,
  withCredentials: true,
});

// ======================= LIKE ==========================
export const likeService = {
  toggleLike: async (data: LikeRequest): Promise<LikeResponse> => {
    const res = await API.post("/like", data, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${getToken()}`,
        addressWallet: getWallet(),
      },
    });
    return res.data;
  },
};

// ======================= FOLLOW ==========================
export const followService = {
  toggleFollow: async (data: FollowRequest): Promise<FollowResponse> => {
    const res = await API.post("/follow", data, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${getToken()}`,
        addressWallet: getWallet(),
      },
    });
    return res.data;
  },
};
