import { NextResponse } from "next/server";
import { authService, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

export async function POST(request: Request) {
  const { email, password, nickname } = await request.json();
  try {
    const { user }: UserCredential = await createUserWithEmailAndPassword(
      authService,
      email,
      password
    );
    // Firestore에 닉네임 저장
    await setDoc(doc(db, "nickname", user.uid), {
      id: user.uid,
      nickname: nickname,
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "회원가입 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
