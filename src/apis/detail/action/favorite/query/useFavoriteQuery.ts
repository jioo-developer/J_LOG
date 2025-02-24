import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getIsFavoriteHandler } from "./getIsFavorite";
import { User } from "firebase/auth";

type propsType = {
  pageId: string;
  user: string;
};

const useFavoriteQueryHook = ({ pageId, user }: propsType) => {
  const { data, isLoading, error }: QueryObserverResult<boolean> = useQuery({
    queryKey: ["getFavorite", pageId, user],
    queryFn: async (queryKey) => {
      const keyParams = queryKey.queryKey[1] as string;
      const userPrams = queryKey.queryKey[2] as string;
      return await getIsFavoriteHandler({ pageId: keyParams, uid: userPrams });
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!pageId && !!user,
  });

  return { data, isLoading, error };
};
export default useFavoriteQueryHook;
