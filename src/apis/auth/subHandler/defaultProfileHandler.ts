import { authService } from "@/lib/firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

type propsType = {
  email: string;
  password: string;
  nickname: string;
};

export default async function defaultProfileHandler({
  email,
  password,
  nickname,
}: propsType) {
  const { user } = await signInWithEmailAndPassword(
    authService,
    email,
    password
  );
  await updateProfile(user, {
    displayName: nickname,
    photoURL: "/images/default.svg",
  }).then(() => authService.signOut());
}
