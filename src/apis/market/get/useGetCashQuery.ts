import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getCashHandler } from "./getCashHandler";

type CashItem = {
  cash: number;
  item: number;
};

const useCashQueryHook = () => {
  const {
    data,
    error,
    isLoading,
    refetch,
  }: QueryObserverResult<CashItem[], Error> = useQuery({
    queryKey: ["getCash"],
    queryFn: getCashHandler,
    staleTime: 1 * 60 * 1000, // 1분
    notifyOnChangeProps: ["data"],
    refetchOnMount: "always",
  });

  const CashData = data ? data : [];

  return { CashData, error, isLoading, refetch };
};

export default useCashQueryHook;
