import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getDetailHandler } from "./getDetailHandler";
import { FirebaseData } from "@/static/types/common";

const useDetailQueryHook = (pageId: string) => {
  const { data, isLoading, error }: QueryObserverResult<FirebaseData> =
    useQuery({
      queryKey: ["getPage", pageId],
      queryFn: async (queryKey) => {
        const keyParams = queryKey.queryKey[1] as string;
        return await getDetailHandler(keyParams);
      },
      staleTime: 1 * 60 * 1000, // 1분
      enabled: !!pageId,
    });

  return { pageData: data, isLoading, error };
};
export default useDetailQueryHook;
