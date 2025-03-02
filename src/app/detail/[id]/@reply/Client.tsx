"use client";
import "./Style.scss";
import { useReplyQueryHook } from "@/apis/detail/reply/query/getReplyDataQuery";
import { useReplyMutation } from "@/apis/detail/reply/hook/create/useMutation";
import ReplyItem from "./components/ReplyItem";
import TextAreaComponent, {
  textAreaType,
} from "./components/TextAreaComponent";
import useUserQueryHook from "@/apis/login/query/useGetUserQuery";
import createReplyHandler from "./handler/createReplyHandler";
import { User } from "firebase/auth";

type propsType = {
  pageId: string;
};

const Reply = ({ pageId }: propsType) => {
  const { data: user } = useUserQueryHook();

  const { replyData } = useReplyQueryHook(pageId);

  const { mutate } = useReplyMutation();

  const submitHandler = (data: textAreaType, reset: any) => {
    const content = createReplyHandler({
      user: user as User,
      id: pageId,
      comment: data.textAreaRequired,
    });
    mutate(content);
    reset();
  };

  const isActive = replyData.length > 0;

  return (
    <div className="reply_main_wrap">
      {isActive &&
        replyData.map((item, index) => {
          return (
            <ReplyItem
              key={index}
              item={item}
              index={index}
              pageId={pageId}
              user={user?.uid as string}
            />
          );
        })}
      <TextAreaComponent submitHandler={submitHandler} />
    </div>
  );
};

export default Reply;
