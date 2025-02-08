import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginErrorHandler } from "../handler/errorHandler";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/static/constants/common";
import { authService } from "@/lib/firebase";

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
      if (errorMessage) {
        window.alert(errorMessage);
        // popuprHandler({ message: errorMessage });
      } else {
        window.alert(error.message);
        // popuprHandler({ message: "로그인 도중 에러가 발생했습니다" });
      }
    },
  });
};

export default useLogoutHook;
