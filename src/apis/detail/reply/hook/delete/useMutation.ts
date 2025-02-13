import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReply } from "./deleteReplyHandler";
import { popuprHandler } from "@/utils/popupHandler";

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteReply,
    onSuccess: async (result) => {
      await queryClient.refetchQueries({
        queryKey: ["getReply"],
      });
      queryClient.setQueryData(["getReply"], () => {
        return result;
      });
    },
    onError: () => {
      popuprHandler({ message: "댓글 삭제 중 문제가 생겼습니다" });
    },
  });
};
