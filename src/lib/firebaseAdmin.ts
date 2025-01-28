import admin from "firebase-admin";

// Firebase Admin SDK 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// ID 토큰 검증 함수
export const verifyIdToken = (token: string) => {
  return admin.auth().verifyIdToken(token);
};
