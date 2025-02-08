import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Postlogin } from "./loginHandler";
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
      window.alert(error.message);
    },
  });
};

export default useLoginHook;
