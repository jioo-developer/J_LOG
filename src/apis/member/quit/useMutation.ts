import { useMutation, useQueryClient } from "@tanstack/react-query";
import QuitHandler from "./quitHandler";
import { useRouter } from "next/navigation";
import { popuprHandler } from "@/utils/popupHandler";

function useQuitMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: QuitHandler,
    onSuccess: () => {
      router.push("/login");
      queryClient.clear();
    },
    onError: (error) => {
      popuprHandler({ message: (error as Error).message });
    },
  });
}

export default useQuitMutation;
