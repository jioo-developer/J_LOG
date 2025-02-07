import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";

export async function getCashData() {
  const user = authService.currentUser as User;
  const response = await fetch(`${apiUrl}/api/market`, {
    method: "GET",
    body: JSON.stringify({ user: user.uid }),
  });
  return response.json();
}

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
    queryFn: getCashData,
    staleTime: 1 * 60 * 1000, // 1분
    notifyOnChangeProps: ["data"],
    refetchOnMount: "always",
  });

  const CashData = data ? data : [];

  return { CashData, error, isLoading, refetch };
};

export default useCashQueryHook;
