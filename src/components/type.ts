import { Timestamp } from "firebase/firestore";

export type Story<T> = {
  args: Partial<T>;
};

export type FirebaseData = {
  user: string;
  pageId: string;
  profile: string;
  date: string;
  timestamp: Timestamp;
  title: string;
  fileName: string[];
  url: string[];
  favorite: number;
  text: string;
  writer: string;
  id: string;
  priority?: boolean;
  replyLength?: number;
};
