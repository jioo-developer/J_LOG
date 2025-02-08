import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "./loginHandler";
import { LoginErrorHandler } from "../error";

const useGoogleHook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return GoogleLogin();
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getuser"],
      });
      router.push("/");
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

export default useGoogleHook;
