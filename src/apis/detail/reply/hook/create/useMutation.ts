import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replyType } from "@/apis/detail/reply/query/getReplyDataQuery";
import { popuprHandler } from "@/utils/popupHandler";
import { createReply } from "@/apis/detail/reply/hook/create/createReplyHandler";

export function useReplyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: replyType) => {
      return createReply(data);
    },
    onSuccess: async (result) => {
      await queryClient.refetchQueries({
        queryKey: ["getReply"],
      });
      queryClient.setQueryData<replyType[]>(
        ["getReply"],
        (oldData: replyType[] | any) => {
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
      popuprHandler({ message: "에러가 발생하여 댓글이 작성되지 않았습니다" });
    },
  });
}

export interface useReplyProps {
  id: string;
  replyId?: string;
  comment: string;
}
