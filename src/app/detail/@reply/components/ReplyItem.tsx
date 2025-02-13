import { replyType } from "@/apis/detail/reply/query/getReplyDataQuery";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Image from "next/image";
import { useUpdateMutation } from "@/apis/detail/reply/hook/update/useMutation";
import TextAreaComponent from "./TextAreaComponent";
import { useDeleteMutation } from "@/apis/detail/reply/hook/delete/useMutation";
import { popuprHandler } from "@/utils/popupHandler";

type propsType = {
  item: replyType;
  index: number;
  replyData: replyType[];
  pageId: string;
};

const ReplyItem = ({ item, index, replyData, pageId }: propsType) => {
  const { mutate } = useUpdateMutation();
  const { mutateAsync } = useDeleteMutation();

  function replyUpdateHandler(replyId: string) {
    mutate({ id: pageId, replyId, Comment });
  }

  function AskDeleteHandler(index: number) {
    popuprHandler({
      message: "댓글을 정말로 삭제하시겠습니까?",
      type: "confirm",
      callback: () => DeleteHandler(index),
    });
  }

  const DeleteHandler = (index: number) => {
    const replyId = (replyData as replyType[])[index].id;
    mutateAsync({ id: pageId, replyId });
  };

  return (
    <div className="reply_wrap" key={`reply-${index}`}>
      <div className="user_info">
        <Image
          src={item.profile ? item.profile : "/img/no-image.jpg"}
          alt=""
          width={40}
          height={40}
        />
        <div className="user_text">
          <p className="reply_name">{item.replyrer}</p>
          <p className="reply_date">{item.date}</p>
        </div>
      </div>
      <form>
        <div className="edit_comment">
          <div className="button__group">
            <CommonButton theme="none">수정</CommonButton>

            <CommonButton theme="none">삭제</CommonButton>
          </div>
        </div>
        <p className={`reply_text`}>{item.comment}</p>
        <TextAreaComponent submitHandler={replyUpdateHandler} />
      </form>
    </div>
  );
};

export default ReplyItem;
