import { usePageInfoStore } from "@/store/pageInfoStore";
import { FirebaseData } from "@/static/types/common";
import timeData from "@/utils/timeData";
import { authService } from "@/lib/firebase";
import { serverTimestamp, Timestamp } from "firebase/firestore";

type propsType = {
  formData: { title: string; text: string };
  imageInfo: string[];
  refValue: boolean;
  fileName: string[];
  pageId: string;
};

const user = authService.currentUser;

export default function createHandler({
  formData,
  imageInfo,
  refValue,
  fileName,
  pageId,
}: propsType) {
  if (!user) return;

  // 이미지 url 생성 함수

  const content: FirebaseData = {
    title: formData.title,
    text: formData.text,
    url: imageInfo,
    fileName: fileName,
    pageId,
    priority: refValue,
    user: user.displayName as string,
    profile: user.photoURL as string,
    date: `${timeData.year}년 ${timeData.month}월 ${timeData.day}일`,
    timestamp: serverTimestamp() as Timestamp,
    writer: user.uid,
    favorite: 0,
  };
  return content;
}
