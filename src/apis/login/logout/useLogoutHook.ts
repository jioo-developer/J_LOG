import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginErrorHandler } from "../../../utils/errorHandler";
import { useRouter } from "next/navigation";
import { popuprHandler } from "@/utils/popupHandler";
import { LogoutHandler } from "./logoutHandler";

// 로그인 실행 관련 로직
const useLogoutHook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: LogoutHandler,
    onSuccess: async () => {
      queryClient.setQueryData(["getuser"], null);
      router.push("/login");
    },
    onError: (error) => {
      const errorMessage = LoginErrorHandler(error.message);
      popuprHandler({ message: errorMessage ?? error.message });
    },
  });
};

export default useLogoutHook;
