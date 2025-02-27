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
    const getUser = await response.json();
    let login;
    if (getUser.provider === "google.com") {
      const credential = GoogleAuthProvider.credential(getUser.token);
      login = await signInWithCredential(authService, credential);
    } else {
      login = await signInWithCustomToken(authService, getUser.token);
    }
    return { user: login.user };
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
