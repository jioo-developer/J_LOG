import useUserQueryHook from "@/apis/login/hook/useGetUserQuery";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import useNickNameQueryHook from "../nicknameForm/useGetNicknameHook";

function useGetQueryHandler() {
  const queryClient = useQueryClient();

  // 캐시에서 데이터 가져오기
  const cachedUser = queryClient.getQueryData<User>(["getuser"]) || null;
  const cachedNicknameData =
    queryClient.getQueryData<string[]>(["getNickname"]) || [];

  // API 호출을 통해 데이터 가져오기
  const { data } = useUserQueryHook();
  const { nicknameData } = useNickNameQueryHook();

  return {
    user: cachedUser || data,
    nicknameData: cachedNicknameData || nicknameData,
  };
}

export default useGetQueryHandler;
