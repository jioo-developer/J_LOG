import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { googleToken } = await req.json();
    // `googleToken`을 요청 body에서 가져옴

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(googleToken);
    // Firebase Admin SDK로 `idToken` 검증

    const response = NextResponse.json(
      { message: "인증 성공, 로그인 쿠키를 생성합니다" },
      // uid: decodedToken.uid
      { status: 200 }
    );

    response.cookies.set("GoogleAuthToken", googleToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/", // 쿠키가 모든 경로에서 유효
      maxAge: 3600, // 쿠키 만료 시간
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 401 }
    );
  }
}
