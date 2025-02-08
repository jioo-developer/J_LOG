import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { AuthPropsType } from "@/static/types/common";
import { AuthHandler } from "./authHandler";

const useAuthHandler = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password, nickname }: AuthPropsType) => {
      return AuthHandler({ email, password, nickname });
    },
    onSuccess: async (_, variables) => {
      // 사용자 프로필 업데이트
      const { user } = await signInWithEmailAndPassword(
        authService,
        variables.email,
        variables.password
      );
      await updateProfile(user, {
        displayName: variables.nickname,
        photoURL: "/img/default.svg",
      });
      router.push("/login");
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
};

export default useAuthHandler;
