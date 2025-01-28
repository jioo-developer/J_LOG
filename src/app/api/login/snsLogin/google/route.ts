import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { googleToken } = await request.json();

    const response = NextResponse.json({
      message: "로그인 성공",
    });

    response.cookies.set("GoogleAuthToken", googleToken, {
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
        error: (error as Error).message,
        details: (error as Error).message,
      },
      { status: 401 }
    );
  }
}
