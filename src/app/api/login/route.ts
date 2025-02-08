import { NextRequest, NextResponse } from "next/server";
import { firebaseVerifyHandler } from "./tokenVerifyHandler";

export async function GET(request: NextRequest) {
  try {
    const authToken =
      request.cookies.get("authToken")?.value ||
      request.cookies.get("GoogleAuthToken")?.value;

    if (!authToken) {
      return NextResponse.json({ user: null });
    }

    const user = await firebaseVerifyHandler(authToken);
    // 유효한 토큰인지 검증

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const response = NextResponse.json({
      message: "로그인 쿠키를 생성합니다",
    });

    response.cookies.set("authToken", token, {
      httpOnly: true, // 보안상 브라우저에서 쿠키 접근 금지
      secure: process.env.NODE_ENV === "production",
      path: "/", // 쿠키가 모든 경로에서 유효
      maxAge: 3600, // 쿠키 만료 시간
    });

    return response; // 성공 응답 반환
  } catch (error) {
    // 인증 실패 시 401 상태 반환
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    message: "로그아웃 완료, 쿠키 삭제를 삭제합니다",
  });
  response.cookies.delete("authToken");
  response.cookies.delete("GoogleAuthToken");

  return response;
}
