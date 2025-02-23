"use client";
import "./Style.scss";
import { useReplyQueryHook } from "@/apis/detail/reply/query/getReplyDataQuery";
import { useReplyMutation } from "@/apis/detail/reply/hook/create/useMutation";
import ReplyItem from "./components/ReplyItem";
import createReplyHandler from "./handler/createReplyHandler";
import TextAreaComponent, {
  textAreaType,
} from "./components/TextAreaComponent";
import useUserQueryHook from "@/apis/login/hook/useGetUserQuery";

type propsType = {
  pageId: string;
};

const Reply = ({ pageId }: propsType) => {
  const { data: user } = useUserQueryHook();

  const { replyData, isLoading } = useReplyQueryHook(pageId);

  const { mutate } = useReplyMutation();

  const HandleCreateReply = (data: textAreaType) => {
    if (user) {
      const content = createReplyHandler({
        user,
        id: pageId,
        comment: data.textAreaRequired,
      });
      mutate(content);
    }
  };

  if (isLoading) {
    <div></div>;
  }

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
      <TextAreaComponent submitHandler={HandleCreateReply} />
    </div>
  );
};

export default Reply;
