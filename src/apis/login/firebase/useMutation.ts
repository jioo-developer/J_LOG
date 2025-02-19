import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Postlogin } from "./loginHandler";
import errorTypeHandler from "./errorTypeHandler";
import { popuprHandler } from "@/utils/popupHandler";
type propsType = {
  email: string;
  pw: string;
};

const useLoginHook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, pw }: propsType) => {
      return Postlogin(email, pw);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getuser"],
      });
      router.push("/");
    },
    onError: (error) => {
      const errorMessage = errorTypeHandler(error);
      popuprHandler({ message: errorMessage });
    },
  });
};

export default useLoginHook;
