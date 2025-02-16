import { popuprHandler } from "@/utils/popupHandler";
import { QueryClient, useMutation } from "@tanstack/react-query";
import postHandler from "./postHandler";
import { FirebaseData } from "@/static/types/common";
import { useRouter } from "next/navigation";

type propsType = {
  data: FirebaseData;
  pageId: string;
};

const useCreateMutation = () => {
  const router = useRouter();
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({ data, pageId }: propsType) => {
      return postHandler({ data, pageId });
    },
    onSuccess: (_, variables) => {
      router.push(`/detail/${variables.pageId}`);
      queryClient.setQueryData<FirebaseData>(
        ["getPage", variables.pageId],
        () => {
          return {
            ...variables.data,
          };
        }
      );
    },
    onError: (error) => {
      popuprHandler({
        message: "게시글 작성 중 오류가 발생하였습니다" + error.message,
      });
    },
  });
};

export default useCreateMutation;
