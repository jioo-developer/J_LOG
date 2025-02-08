import { FirebaseData } from "@/components/type";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import getMyDataHandler from "./getMyDataHandler";

const useMyDataQueryHook = () => {
  const { data, isLoading, error }: QueryObserverResult<FirebaseData[], Error> =
    useQuery({
      queryKey: ["getMyData"],
      queryFn: getMyDataHandler,
      staleTime: 1 * 60 * 1000, // 1분
    });

  const myData = data ? data : [];

  return { myData, isLoading, error };
};

export default useMyDataQueryHook;
