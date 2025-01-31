import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginErrorHandler } from "../error";
import { Postlogin } from "../loginHandler";
import { useRouter } from "next/navigation";

type propsType = {
  email: string;
  pw: string;
};
// 로그인 실행 관련 로직
const useLoginHook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, pw }: propsType) => {
      return Postlogin(email, pw);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
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

export default useLoginHook;
