"use client";

import useGetQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";
import { useReplyQueryHook } from "@/apis/reply/useGetReplyHook";
import ReactTextareaAutosize from "react-textarea-autosize";
import { usePageInfoStore } from "@/store/common";
import { useReplyContext } from "./context";
import { useCreateHandler } from "@/apis/reply/Reply/useMutationHandler";
import ReplyItem from "./ReplyItem";

const Reply = () => {
  const id = usePageInfoStore().pgId;

  const { user } = useGetQueryHandler();

  const { replyData, isLoading } = useReplyQueryHook(id);

  const { comment, setComment, commentTarget } = useReplyContext();

  const isReply = !isLoading && replyData && replyData.length > 0;

  const createMutation = useCreateHandler();

  const CreateRely = async () => {
    if (user) {
      const userObj = {
        name: user.displayName as string,
        profile: user.photoURL ? user.photoURL : "/img/default.svg",
        uid: user.uid as string,
      };
      createMutation.mutate({ user: userObj, id, comment });
      setComment("");
    }
  };

  return (
    <>
      {replyData.map((item, index) => {
        return (
          <ReplyItem
            key={index}
            item={item}
            index={index}
            replyData={replyData}
            pageId={id}
          />
        );
      })}
      <form
        role="form"
        onSubmit={(e) => {
          if (comment !== "") {
            e.preventDefault();
            CreateRely();
          }
        }}
      >
        <ReactTextareaAutosize
          cacheMeasurements
          onHeightChange={(height) => ""}
          minRows={4}
          className="comment_input"
          placeholder="댓글을 입력하세요"
          value={commentTarget === "" ? comment : ""}
          onChange={(e) => setComment(e.target.value)}
          readOnly={commentTarget !== ""}
        />
        <button className="btn">댓글 작성</button>
      </form>
    </>
  );
};

export default Reply;
