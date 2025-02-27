import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithCustomToken,
  User,
} from "firebase/auth";

async function getUserHandler(): Promise<{ user: User | null }> {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    let loginData;
    const { user } = await response.json();
    const providerRef = user.provider[0].providerId;
    if (providerRef !== "password") {
      const credential = GoogleAuthProvider.credential(user.token);
      loginData = await signInWithCredential(authService, credential);
    } else {
      loginData = await signInWithCustomToken(authService, user.token);
    }
    return { user: loginData.user };
  } else {
    const text = await response.text();
    try {
      const errorData = JSON.parse(text);
      throw new Error(errorData.error);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
export default getUserHandler;
