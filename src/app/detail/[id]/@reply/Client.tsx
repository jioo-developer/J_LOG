"use client";
import "./Style.scss";
import useGetMyInfoQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";
import { useReplyQueryHook } from "@/apis/detail/reply/query/getReplyDataQuery";
import { useReplyMutation } from "../../../../apis/detail/reply/hook/create/useMutation";
import ReplyItem from "./components/ReplyItem";
import createReplyHandler from "./handler/createReplyHandler";
import TextAreaComponent, {
  textAreaType,
} from "./components/TextAreaComponent";

type propsType = {
  pageId: string;
};

const Reply = ({ pageId }: propsType) => {
  const { user } = useGetMyInfoQueryHandler();

  const { replyData } = useReplyQueryHook(pageId);

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

  return (
    <>
      {replyData &&
        replyData?.length > 0 &&
        replyData.map((item, index) => {
          return (
            <ReplyItem
              key={index}
              item={item}
              index={index}
              replyData={replyData}
              pageId={pageId}
              user={user?.uid as string}
            />
          );
        })}
      <TextAreaComponent submitHandler={HandleCreateReply} />
    </>
  );
};

export default Reply;
