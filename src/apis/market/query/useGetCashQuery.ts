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
    staleTime: 5 * 60 * 1000,
  });

  const CashData = data ? data : [];

  return { CashData, error, isLoading, refetch };
};

export default useCashQueryHook;
