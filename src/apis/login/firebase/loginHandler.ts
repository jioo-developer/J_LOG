import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function Postlogin(id: string, password: string) {
  await setPersistence(authService, browserSessionPersistence);
  // 세션에 저장
  const userCredential = await signInWithEmailAndPassword(
    authService,
    id,
    password
  );
  // 로그인
  const token = await userCredential.user.getIdToken();
  // 토큰
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
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
