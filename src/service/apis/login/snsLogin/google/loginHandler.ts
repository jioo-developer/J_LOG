import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/common";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(authService, provider);
    const token = await userCredential.user.getIdToken();

    // 서버로 ID 토큰 보내기
    await fetch(`${apiUrl}/api/login/snsLogin/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ googleToken: token }),
    });
  } catch (error) {
    window.alert((error as Error).message);
  }
}
