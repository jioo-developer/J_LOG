import { authService } from "@/lib/firebase";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default async function setTokenRenturnHandler(
  id: string,
  password: string
) {
  await setPersistence(authService, browserSessionPersistence);
  // 세션에 저장
  const userCredential = await signInWithEmailAndPassword(
    authService,
    id,
    password
  );
  // 로그인
  return await userCredential.user.getIdToken();
}
