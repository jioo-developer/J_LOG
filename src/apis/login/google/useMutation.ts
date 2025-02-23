import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GoogleLoginHandler } from "./loginHandler";

const useGoogleLoginHook = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GoogleLoginHandler,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["getuser"],
      });
      router.push("/");
    },
    onError: (error) => {
      window.alert((error as Error).message);
    },
  });
};

export default useGoogleLoginHook;
