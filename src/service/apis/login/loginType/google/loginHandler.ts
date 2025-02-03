import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/common";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

export async function GoogleLogin() {
  // onError이 없기 때문에 try/catch를 씀
  await setPersistence(authService, browserSessionPersistence);
  // 세션에 저장

  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(authService, provider);
  // 로그인
  const token = await result.user.getIdToken();
  // 토큰
  const response = await fetch(`${apiUrl}/api/login/snsLogin/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ googleToken: token }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response;
}
