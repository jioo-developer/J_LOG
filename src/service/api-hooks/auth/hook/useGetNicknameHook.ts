import { apiUrl } from "@/static/common";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

// ✅ API 호출 함수 (반환 타입 명확히 지정)
export async function getNicknameHandler(): Promise<string[]> {
  const response = await fetch(`${apiUrl}/api/auth`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { data } = await response.json();
  return data;
}

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
