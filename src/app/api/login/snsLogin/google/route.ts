import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { googleToken } = await req.json(); // 🔹 `googleToken`을 요청 body에서 가져옴

    // 🔹 Firebase Admin SDK로 `idToken` 검증
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(googleToken);

    const response = NextResponse.json({
      message: "인증 성공",
      uid: decodedToken.uid,
    });

    response.cookies.set("GoogleAuthToken", googleToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/", // 쿠키가 모든 경로에서 유효
      maxAge: 3600, // 쿠키 만료 시간
    });

    return response;
  } catch (error) {
    console.error("인증 실패:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 401 }
    );
  }
}
