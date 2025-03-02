import { authService } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithCustomToken,
  UserInfo,
} from "firebase/auth";

type responseUserType = {
  uid: string;
  email: string;
  name: string;
  picutre: string;
  provider: UserInfo[];
  token: string;
};

export default async function refreshTokenHandler(user: responseUserType) {
  let loginData;
  const providerRef = user.provider[0].providerId;
  if (providerRef !== "password") {
    const credential = GoogleAuthProvider.credential(user.token);
    loginData = await signInWithCredential(authService, credential);
  } else {
    loginData = await signInWithCustomToken(authService, user.token);
  }
  return { user: loginData.user };
}
