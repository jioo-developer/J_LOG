import { firebaseAdmin } from "@/lib/firebaseAdmin";
export async function firebaseVerifyHandler(token: string) {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    const user = await firebaseAdmin.auth().getUser(decodedToken.uid);
    const newToken = await firebaseAdmin.auth().createCustomToken(user.uid);

    if (!user) {
      throw new Error("해당 UID의 사용자 정보를 찾을 수 없음");
    }

    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      picture: user.photoURL,
      provider: user.providerData,
      token: newToken,
    };
  } catch (error) {
    throw new Error(
      (error as Error).message + " => Firebase 로그인 토큰 검증 실패"
    );
  }
}
