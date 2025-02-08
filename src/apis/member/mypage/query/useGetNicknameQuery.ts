import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getNicknameHandler } from "../nicknameForm/getNicknameHandler";

// ✅ useQuery 훅 (타입 올바르게 지정)
const useNickNameQueryHook = () => {
  const { data, isLoading, refetch, error }: UseQueryResult<string[]> =
    useQuery({
      queryKey: ["getNickname"],
      queryFn: getNicknameHandler,
      staleTime: 5 * 60 * 1000, // ✅ 5분 동안 캐시 유지 (최적화)
    });

  const nicknameData = data ? data : [];

  return { nicknameData, isLoading, refetch, error };
};

export default useNickNameQueryHook;
