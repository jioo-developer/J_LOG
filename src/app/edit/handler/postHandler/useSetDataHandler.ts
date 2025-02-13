import { FirebaseData } from "@/static/types/common";
import { User } from "firebase/auth";
import { serverTimestamp, Timestamp } from "firebase/firestore";

const time = new Date();
export const timeData = {
  year: time.getFullYear(),
  month: time.getMonth() + 1,
  day: time.getDate(),
};

type PropsType = {
  formData: { title: string; text: string };
  pageId: string;
  checked: boolean;
  imageInfo: string[];
  fileName: string[];
  user: User; // user는 PropsType에 포함되지만 content에는 포함되지 않음
};

export type FirebaseSummary = Pick<
  FirebaseData,
  "title" | "text" | "url" | "fileName" | "pageId" | "priority"
>;

// useCreateHandler 함수 수정
export function contentDataHandler({
  formData,
  pageId,
  checked,
  imageInfo,
  fileName,
  user,
}: PropsType) {
  const content: FirebaseSummary = {
    title: formData.title,
    text: formData.text,
    url: imageInfo,
    fileName,
    pageId,
    priority: checked,
  };

  // createInitialData 함수에 content와 user를 전달
  return createInitialData({ data: content, user });
}

export type FirebaseSummaryWithUser = { data: FirebaseSummary; user: User };

export const createInitialData = ({ data, user }: FirebaseSummaryWithUser) => {
  const addContent = {
    user: user.displayName as string,
    profile: user.photoURL as string,
    date: `${timeData.year}년 ${timeData.month}월 ${timeData.day}일`,
    timestamp: serverTimestamp() as Timestamp,
    writer: user.uid,
    favorite: 0,
  };

  return Object.assign(data, addContent);
};
