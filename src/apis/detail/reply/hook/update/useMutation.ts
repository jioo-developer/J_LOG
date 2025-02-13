import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReply } from "./updateReplyHandler";
import { replyType } from "../../query/getReplyDataQuery";
import { popuprHandler } from "@/utils/popupHandler";

export const useUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateReply,
    onSuccess: async (result) => {
      await queryClient.refetchQueries({
        queryKey: ["getReply"],
      });
      queryClient.setQueryData<replyType[]>(
        ["getReply"],
        (oldData: replyType | any) => {
          if (oldData) {
            // 이전 데이터가 있는 경우, 새로운 데이터를 추가
            return [...oldData, result];
          } else {
            // 이전 데이터가 없는 경우, 새로운 데이터로 초기화
            return [result];
          }
        }
      );
    },

    onError: () => {
      popuprHandler({ message: "댓글 수정 중 문제가 생겼습니다" });
    },
  });
};
