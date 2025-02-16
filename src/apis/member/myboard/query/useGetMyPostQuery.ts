import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { FirebaseData } from "@/static/types/common";
import getMyDataHandler from "./getMyDataHandler";

const useMyDataQueryHook = (user: string) => {
  const { data, isLoading, error }: QueryObserverResult<FirebaseData[], Error> =
    useQuery({
      queryKey: ["getMyData", user],
      queryFn: async (queryKey) => {
        const keyParams = queryKey.queryKey[1] as string;
        return await getMyDataHandler(keyParams);
      },
      staleTime: 5 * 60 * 1000,
      retry: 3,
    });

  const myData = data ? data : [];

  return { myData, isLoading, error };
};

export default useMyDataQueryHook;
