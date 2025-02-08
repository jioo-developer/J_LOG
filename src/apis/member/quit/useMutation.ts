import { useMutation, useQueryClient } from "@tanstack/react-query";
import QuitHandler from "./quitHandler";
import { useRouter } from "next/navigation";

function useQuitMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuitHandler,
    onSuccess: () => {
      router.push("/login");
      queryClient.clear();
    },
    onError: () => {
      //   popuprHandler({ message: "프로필 변경에 실패하였습니다." });
    },
  });
}

export default useQuitMutation;
