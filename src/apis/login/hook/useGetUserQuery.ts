import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import getUserStatusHandler from "../commonHandler/getUserStatusHandler";

const useUserQueryHook = () => {
  // User | null을 반환하는 쿼리
  const { data, isLoading, refetch, error }: QueryObserverResult<User | null> =
    useQuery({
      queryKey: ["getuser"],
      queryFn: getUserStatusHandler,
      staleTime: 5 * 60 * 1000,
    });
  return { data: data ?? null, isLoading, refetch, error };
};

export default useUserQueryHook;
