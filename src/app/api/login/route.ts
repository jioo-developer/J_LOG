import { authService } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 요청 본문에서 id와 password를 파싱
    const { id, password } = await request.json();

    // Firebase 인증을 사용해 사용자 인증
    const userCredential = await signInWithEmailAndPassword(
      authService,
      id,
      password
    );
    const token = await userCredential.user.getIdToken();
    // 쿠키 설정
    const response = NextResponse.redirect("/");

    response.cookies.set("authToken", token, {
      httpOnly: true, // 보안상 브라우저에서 쿠키 접근 금지
      secure: process.env.NODE_ENV === "production", // 프로덕션에서만 secure 사용
      path: "/", // 쿠키가 모든 경로에서 유효
      maxAge: 36000, // 쿠키 만료 시간 (1시간)
    });

    return response; // 성공 응답 반환
  } catch (error) {
    // 인증 실패 시 401 상태 반환
    return NextResponse.json(
      {
        error: "계정 인증에 실패 하였습니다.",
        details: (error as Error).message,
      },
      { status: 401 }
    );
  }
}
