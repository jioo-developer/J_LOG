import { authService } from "@/lib/firebase";
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
  const response = await fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response;
}
