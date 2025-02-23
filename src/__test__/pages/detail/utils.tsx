import { replyType } from "@/apis/detail/reply/query/getReplyDataQuery";
import { FirebaseData } from "@/static/types/common";
import { Timestamp } from "firebase/firestore";

type propsType = {
  user: string;
  name: string;
};

export const mockPageData = ({ user, name }: propsType): FirebaseData => {
  return {
    pageId: "",
    title: "테스트 제목",
    writer: name,
    user,
    profile: "/test.jpg",
    date: "2025-02-22",
    timestamp: Timestamp.now(),
    fileName: ["file1.png"],
    url: ["/image1.jpg"],
    favorite: 0,
    text: "테스트 본문",
  };
};
