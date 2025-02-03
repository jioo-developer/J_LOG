import { firebaseAdmin } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authToken =
      request.cookies.get("authToken")?.value ||
      request.cookies.get("GoogleAuthToken")?.value;

    if (!authToken) {
      return NextResponse.json({ message: "토큰 없음", user: null });
    } else {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(authToken);

      const user = await firebaseAdmin.auth().getUser(decodedToken.uid);
      return NextResponse.json({
        user,
      });
    }
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.json({ authToken: null }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return NextResponse.json(
        { success: false, message: "verifyIdToken 인증 실패" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: "인증 성공",
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
  const response = NextResponse.json({ message: "로그아웃 완료, 쿠키 삭제됨" });
  response.cookies.delete("authToken");
  response.cookies.delete("GoogleAuthToken");

  return response;
}
