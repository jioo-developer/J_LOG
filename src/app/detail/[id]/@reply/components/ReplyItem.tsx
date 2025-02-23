import { replyType } from "@/apis/detail/reply/query/getReplyDataQuery";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Image from "next/image";
import { useUpdateMutation } from "@/apis/detail/reply/hook/update/useMutation";
import TextAreaComponent, { textAreaType } from "./TextAreaComponent";
import { useDeleteMutation } from "@/apis/detail/reply/hook/delete/useMutation";
import { popuprHandler } from "@/utils/popupHandler";
import { usePopupStore } from "@/store/popupStore";
import { useState } from "react";

type propsType = {
  user: string;
  item: replyType;
  index: number;
  pageId: string;
};

const ReplyItem = ({ user, item, index, pageId }: propsType) => {
  const { setMessage } = usePopupStore();
  const { mutate } = useUpdateMutation();
  const deleteMutation = useDeleteMutation();
  const [currentTarget, setTarget] = useState(false);
  const [defaultValueState, setValue] = useState(item.comment);

  function replyUpdateHandler(data: textAreaType) {
    mutate({
      pageId,
      replyId: item.id,
      comment: data.textAreaRequired,
    });
    setValue("");
  }

  function AskDeleteHandler() {
    popuprHandler({
      message: "댓글을 정말로 삭제하시겠습니까?",
      type: "confirm",
      callback: () => DeleteHandler(),
    });
  }

  const DeleteHandler = () => {
    const replyId = item.id;
    deleteMutation.mutate({ id: pageId, replyId });
    setMessage("");
  };

  return (
    <div className="reply_wrap" key={`reply-${index}`}>
      <div className="top_wrap">
        <div className="user_info">
          <Image
            src={item.profile ? item.profile : "/images/no-image.jpg"}
            alt=""
            width={40}
            height={40}
          />
          <div className="user_text">
            <p className="reply_name">{item.replyrer}</p>
            <p className="reply_date">{item.date}</p>
          </div>
        </div>
        <div className="edit_comment">
          {item.uid === user && (
            <>
              <div className="button__group">
                {!currentTarget ? (
                  <CommonButton
                    theme="none"
                    type="button"
                    testId="editButton"
                    onClick={() => setTarget(!currentTarget)}
                  >
                    수정
                  </CommonButton>
                ) : (
                  <CommonButton
                    theme="none"
                    onClick={() => setTarget(!currentTarget)}
                  >
                    취소
                  </CommonButton>
                )}
                <CommonButton
                  theme="none"
                  padding="none"
                  onClick={() => AskDeleteHandler()}
                >
                  삭제
                </CommonButton>
              </div>
            </>
          )}
        </div>
      </div>
      {currentTarget ? (
        <div data-testid="currentTextArea">
          <TextAreaComponent
            submitHandler={replyUpdateHandler}
            defaultValue={defaultValueState}
          />
        </div>
      ) : (
        <p className={`reply_text`}>{item.comment}</p>
      )}
    </div>
  );
};

export default ReplyItem;
