import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { AuthPropsType } from "@/static/types/common";
import { AuthHandler } from "./authHandler";
import { usePopupStore } from "@/store/popupStore";
import { popuprHandler } from "@/utils/popupHandler";
import defaultProfileHandler from "./subHandler/defaultProfileHandler";

const useAuthMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password, nickname }: AuthPropsType) => {
      return AuthHandler({ email, password, nickname });
    },
    onSuccess: async (_, variables) => {
      await defaultProfileHandler(variables);
      // 사용자 프로필 업데이트
      router.push("/login");
    },
    onError: (error) => {
      popuprHandler({ message: (error as Error).message });
    },
  });
};

export default useAuthMutation;
