import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReply } from "./updateReplyHandler";
import { popuprHandler } from "@/utils/popupHandler";

type propsType = {
  replyId: string;
  pageId: string;
  comment: string;
};

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ pageId, replyId, comment }: propsType) => {
      return updateReply({ pageId, replyId, comment });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getReply"],
      });
    },

    onError: () => {
      popuprHandler({ message: "댓글 수정 중 문제가 생겼습니다" });
    },
  });
};
