// hooks/useAuthSubmit.ts

import useAuthMutation from "@/apis/auth/useMutation";
import { authInputType } from "../Client";

export default function useAuthSubmitHook() {
  const { mutate } = useAuthMutation();

  // form의 handleSubmit 함수가 form의 내용을 자동으로 data로 전송
  async function submitHandler(data: authInputType) {
    await mutate({
      email: data.emailRequired,
      password: data.passwordRequired,
      nickname: data.nickNameRequired,
    });
  }

  return submitHandler;
}
