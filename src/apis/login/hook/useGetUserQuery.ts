import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithCustomToken,
  User,
} from "firebase/auth";
import getUserHandler from "./getUserHandler";

export async function getUser() {
  // Firebase Authentication 상태 변경 시 처리
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(authService, async (user) => {
      if (user) {
        resolve(user);
      } else {
        const { user: userData } = await getUserHandler();
        if (userData) {
          let login;
          if (userData.provider === "google.com") {
            const credential = GoogleAuthProvider.credential(userData.token);
            login = await signInWithCredential(authService, credential);
          } else {
            login = await signInWithCustomToken(authService, userData.token);
          }
          resolve(login.user);
        } else {
          resolve(null);
        }
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
      staleTime: 5 * 60 * 1000,
    });
  return { data: data ?? null, isLoading, refetch, error };
};

export default useUserQueryHook;
