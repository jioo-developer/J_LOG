import { popuprHandler } from "@/utils/popupHandler";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import postHandler from "./postHandler";
import { FirebaseData } from "@/static/types/common";

type propsType = {
  data: FirebaseData;
  pageId: string;
};

const useCreateMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({ data, pageId }: propsType) => {
      return postHandler({ data, pageId });
    },
    onSuccess: (_, variables) => {
      router.push(`/pages/detail/${variables.pageId}`);
    },
    onError: () => {
      popuprHandler({ message: "게시글 작성 중 오류가 발생하였습니다" });
    },
  });
};

export default useCreateMutation;
