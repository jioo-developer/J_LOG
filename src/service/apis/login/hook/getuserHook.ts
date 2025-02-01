import { authService } from "@/lib/firebase";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";

// 로그인 호출 관련 hook
export const getuser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject("유저 정보가 없습니다.");
      }
    });
  });
};

const useUserQueryHook = () => {
  // User | null을 반환하는 쿼리
  const { data, isLoading, refetch, error }: QueryObserverResult<User | null> =
    useQuery<User | null>({
      queryKey: ["getuser"],
      queryFn: getuser,
      staleTime: 1 * 60 * 1000, // 1분
      notifyOnChangeProps: ["data"],
    });

  return { data, isLoading, refetch, error };
};

export default useUserQueryHook;
