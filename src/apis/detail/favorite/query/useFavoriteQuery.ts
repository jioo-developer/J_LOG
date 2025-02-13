import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getIsFavoriteHandler } from "./getIsFavorite";

type propsType = {
  user: string;
  pageId: string;
};
const useDetailQueryHook = ({ user, pageId }: propsType) => {
  const { data, isLoading, error }: QueryObserverResult<boolean> = useQuery({
    queryKey: ["getFavorite", pageId, user],
    queryFn: async (queryKey) => {
      const keyParams = queryKey.queryKey[1] as string;
      return await getIsFavoriteHandler({ user, pageId });
    },
    staleTime: 1 * 60 * 1000, // 1분
    enabled: !!pageId,
  });

  return { pageData: data, isLoading, error };
};
export default useDetailQueryHook;
