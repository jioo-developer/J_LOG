import { NextResponse } from "next/server";
import { authService, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

<<<<<<< HEAD
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "nickname"));
    if (snapshot.empty) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const nicknameList = snapshot.docs.map((doc) => doc.data().nickname);

    return NextResponse.json(
      { success: true, data: nicknameList },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "닉네임 데이터를 가져오는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

=======
>>>>>>> d333fc1963018e3847176f94d92528819df0a49d
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

    return NextResponse.json({ status: 200 });
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
