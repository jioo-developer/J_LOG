import { useMutation } from "@tanstack/react-query";
import {
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import AuthHandler from "../authHandler";
import { authService } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type propsType = {
  email: string;
  password: string;
  nickname: string;
};

// 회원가입 계정 생성 로직

const useAuthHandler = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password, nickname }: propsType) => {
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
