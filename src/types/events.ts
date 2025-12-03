// types/events.ts
import { Category } from "./category";

export interface Creator {
  id: number;
  fullName: string;
  userName: string;
  avatar: string;
  addressWallet: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  status: "upcoming" | "live" | "ended";
  startTime: string;
  endTime: string;
  location: "online" | "offline";
  maxParticipants: number;
  joinCount: number;
  category: Category;
  creator: Creator;
}
