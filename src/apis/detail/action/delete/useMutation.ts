import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { popuprHandler } from "@/utils/popupHandler";
import { pageDeleteHandler } from "./pageDeleteHandler";
import { usePopupStore } from "@/store/popupStore";

const usePageDeleteMutation = () => {
  const router = useRouter();
  const { setMessage } = usePopupStore();
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (writer: string) => {
      return await pageDeleteHandler(writer);
    },
    onSuccess: async () => {
      setMessage("");
      router.push("/");
      await queryClient.refetchQueries({
        queryKey: ["getPost"], // 리페칭할 쿼리의 키를 지정
      });
    },
    onError: () => {
      popuprHandler({
        message: "페이지 삭제 도중 문제가 생겼습니다",
        type: "alert",
      });
    },
  });
};

export default usePageDeleteMutation;
