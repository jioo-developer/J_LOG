import { authService } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import getUserHandler from "./getUserHandler";

export default async function getUserStatusHandler() {
  // Firebase Authentication 상태 변경 시 처리
  return new Promise<User | null>((resolve) => {
    onAuthStateChanged(authService, async (userData) => {
      if (userData) {
        resolve(userData);
      } else {
        const { user } = await getUserHandler();
        resolve(user);
      }
    });
  });
}
