// types/category.ts
export type CategoryType = "news" | "events";

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
