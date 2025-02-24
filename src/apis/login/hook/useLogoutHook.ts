import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginErrorHandler } from "../../../utils/errorHandler";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/static/constants/common";
import { authService } from "@/lib/firebase";
import { popuprHandler } from "@/utils/popupHandler";

async function LogoutHandler() {
  await authService.signOut();

  await fetch(`${apiUrl}/api/login`, {
    method: "DELETE",
    credentials: "include",
  });
}

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
