import { authService } from "@/lib/firebase";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

export default async function setGoogleTokenReturnHandler() {
  await setPersistence(authService, browserSessionPersistence);
  // 세션에 저장

  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(authService, provider);
  // 로그인
  return await result.user.getIdToken();
  // 토큰
}
