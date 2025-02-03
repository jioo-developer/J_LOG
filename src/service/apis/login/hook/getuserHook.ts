import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/common";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { onAuthStateChanged, User } from "firebase/auth";

export async function getUser() {
  // Firebase Authentication 상태 변경 시 처리
  return new Promise<User>((resolve) => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        resolve(user);
      } else {
        const response = await fetch(`${apiUrl}/api/login`, {
          method: "GET",
          credentials: "include",
        });
        const { user } = await response.json();
        resolve(user);
      }
    });
  });
}

const useUserQueryHook = () => {
  // User | null을 반환하는 쿼리
  const { data, isLoading, refetch, error }: QueryObserverResult<User | null> =
    useQuery({
      queryKey: ["getuser"],
      queryFn: getUser,
      staleTime: 0,
    });

  return { data, isLoading, refetch, error };
};

export default useUserQueryHook;
