// types/news.ts
import { Category } from "./category";

export interface Author {
  id: number;
  fullName: string;
  userName: string;
  avatar: string;
  addressWallet: string;
}

export interface News {
  id: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  status: string; // 'draft' | 'published' | string
  publishedAt: string;
  views: number;
  category: Category;
  author: Author;
}

export interface CreateNewsPayload {
  title: string;
  description: string;
  content: string;
  categoryId: string;
  status: string;
}

export interface UpdateNewsPayload {
  id: number;
  title?: string;
  description?: string;
  categoryId?: string;
  content?: string;
  status?: string;
}

export interface UpdateViewPayload {
  newsId: number;
}
