import { QueryClient, UseQueryResult, useQuery } from "@tanstack/react-query";
import { getNicknameHandler } from "./getNicknameHandler";

// ✅ useQuery 훅 (타입 올바르게 지정)
const useNickNameQueryHook = () => {
  const queryClient = new QueryClient();
  const cachedData = queryClient.getQueryData<string[]>(["getNickname"]);

  const { data, isLoading, refetch, error }: UseQueryResult<string[]> =
    useQuery({
      queryKey: ["getNickname"],
      queryFn: getNicknameHandler,
      staleTime: 5 * 60 * 1000,
      enabled: !cachedData,
      initialData: [],
    });

  return { nicknameData: data, isLoading, refetch, error };
};

export default useNickNameQueryHook;
