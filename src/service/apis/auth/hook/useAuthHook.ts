import { db } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { LoginErrorHandler } from "../../login/error";
import AuthHandler from "../authHandler";

type propsType = {
  email: string;
  password: string;
  nickname: string;
};

// 회원가입 계정 생성 로직

const useAuthHandler = () => {
  return useMutation({
    mutationFn: async ({ email, password, nickname }: propsType) => {
      return AuthHandler({ email, password, nickname });
    },
    onSuccess: () => {},
    onError: (error) => {
      const errorMessage = LoginErrorHandler((error as Error).message);
      if (errorMessage) {
        window.alert(errorMessage);
      } else {
        window.alert(error.message);
      }
    },
  });
};

export default useAuthHandler;
