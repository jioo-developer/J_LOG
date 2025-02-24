import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

export async function GoogleLoginHandler() {
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
    const text = await response.text();
    console.error("Error response body:", text); // 응답 본문 출력
    try {
      const errorData = JSON.parse(text); // 텍스트를 JSON으로 파싱 시도
      throw new Error(errorData.error);
    } catch (error) {
      throw new Error("Unexpected response format");
    }
  }

  return response;
}
