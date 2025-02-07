import useNickNameQueryHook from "@/service/userAuth/auth/hook/useGetNicknameHook";
import useUserQueryHook from "@/service/userAuth/login/hook/useGetUserHook";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";

function useGetQueryHandler() {
  const queryClient = useQueryClient();

  // 캐시에서 데이터 가져오기
  const cachedUser = queryClient.getQueryData<User>(["getuser"]);
  const cachedNicknameData = queryClient.getQueryData<string[]>([
    "getNickname",
  ]);

  // API 호출을 통해 데이터 가져오기
  const { data: user } = useUserQueryHook();
  const { nicknameData } = useNickNameQueryHook();

  return {
    user: cachedUser || user,
    nicknameData: cachedNicknameData || nicknameData,
  };
}

export default useGetQueryHandler;
