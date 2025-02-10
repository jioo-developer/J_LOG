import { Timestamp } from "firebase/firestore";

export type InputTypes = {
  emailRequired: string;
  passwordRequired: string;
};

export type AuthPropsType = {
  email: string;
  password: string;
  nickname: string;
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
