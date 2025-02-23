import { serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { replyType } from "@/apis/detail/reply/query/getReplyDataQuery";
import timeData from "@/utils/timeData";

export type createReplyPropsType = {
  user: User;
  id: string;
  comment: string;
};

export const createReplyHandler = ({
  user,
  id,
  comment,
}: createReplyPropsType) => {
  const commentData: replyType = {
    replyrer: user.displayName as string,
    comment: comment,
    date: `${timeData.year}년${timeData.month}월${timeData.day}일`,
    profile: user.photoURL as string,
    uid: user.uid,
    id,
    timestamp: serverTimestamp() as any,
  };
  return commentData;
};

export default createReplyHandler;
