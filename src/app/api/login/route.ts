import { authService } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    // Firebase 인증을 사용해 사용자 인증
    const userCredential = await signInWithEmailAndPassword(
      authService,
      id,
      password
    );
    const token = await userCredential.user.getIdToken();

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set("authToken", token, {
      httpOnly: true, // 보안상 브라우저에서 쿠키 접근 금지
      secure: process.env.NODE_ENV === "production",
      path: "/", // 쿠키가 모든 경로에서 유효
      maxAge: 36000, // 쿠키 만료 시간
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
  const response = new Response(JSON.stringify({ message: "쿠키 삭제 성공" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": [
        "authToken=; Path=/; HttpOnly; Secure; SameSite=None; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "GoogleAuthToken=; Path=/; HttpOnly; Secure; SameSite=None; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      ].join(", "),
    },
  });

  return response;
}
