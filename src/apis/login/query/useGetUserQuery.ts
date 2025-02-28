import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import getUserStatusHandler from "./subHandler/getUserStatusHandler";

const useUserQueryHook = () => {
  // User | null을 반환하는 쿼리
  const { data, isLoading, refetch, error }: QueryObserverResult<User | null> =
    useQuery({
      queryKey: ["getuser"],
      queryFn: getUserStatusHandler,
      staleTime: 5 * 60 * 1000,
      initialData: null,
    });
  return { data, isLoading, refetch, error };
};

export default useUserQueryHook;
