import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginErrorHandler } from "./loginErrorHandler";
import { Postlogin } from "./postLogin";

type propsType = {
  id: string;
  pw: string;
};
// 로그인 실행 관련 로직
const useLoginHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, pw }: propsType) => {
      return Postlogin(id, pw);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getuser"],
      });
    },
    onError: (error) => {
      const errorMessage = LoginErrorHandler(error.message);
      if (errorMessage) {
        // popuprHandler({ message: errorMessage });
      } else {
        // popuprHandler({ message: "로그인 도중 에러가 발생했습니다" });
      }
    },
  });
};

export default useLoginHook;
