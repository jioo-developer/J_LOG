import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReply } from "./deleteReplyHandler";
import { popuprHandler } from "@/utils/popupHandler";

type propsType = {
  id: string;
  replyId: string;
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, replyId }: propsType) => {
      return deleteReply({ id, replyId });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getReply"],
      });
    },
    onError: () => {
      popuprHandler({ message: "댓글 삭제 중 문제가 생겼습니다" });
    },
  });
};
