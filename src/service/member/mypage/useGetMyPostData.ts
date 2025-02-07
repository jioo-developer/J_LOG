import { FirebaseData } from "@/components/type";
import { apiUrl } from "@/static/constants/common";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";

async function getMyData() {
  const response = await fetch(`${apiUrl}/api/mypage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}

const useMyDataQueryHook = () => {
  const { data, isLoading, error }: QueryObserverResult<FirebaseData[], Error> =
    useQuery({
      queryKey: ["getMyData"],
      queryFn: getMyData,
      staleTime: 1 * 60 * 1000, // 1분
    });

  const myData = data ? data : [];

  return { myData, isLoading, error };
};

export default useMyDataQueryHook;
