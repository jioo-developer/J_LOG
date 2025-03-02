import { db } from "@/lib/firebase";
import {
  collection,
  deleteField,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "nickname"));
    if (snapshot.empty) {
      return NextResponse.json(
        { data: [], message: "댓글이 없습니다." },
        { status: 200 }
      );
    }

    const nicknameList = snapshot.docs.map((doc) => doc.data().nickname);

    return NextResponse.json(
      { data: nicknameList, message: "닉네임 DB를 가져옵니다." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "닉네임 데이터를 가져오는 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

type requestType = {
  id: string;
  nickname: string;
};
export async function POST(request: NextRequest) {
  try {
    // 요청의 JSON 데이터 파싱
    const requestData: requestType = await request.json();

    // Firebase Firestore의 doc 참조 생성
    const userNameRef = doc(db, "nickname", requestData.id);

    await updateDoc(userNameRef, {
      nickname: deleteField(),
    });

    // 데이터 업데이트 또는 다른 로직을 추가하세요. 예시:
    await updateDoc(userNameRef, { nickname: requestData.nickname });

    // 성공적으로 처리되면 응답을 반환
    return NextResponse.json(
      { message: "닉네임이 성공적으로 변경되었습니다" },
      { status: 200 }
    );
  } catch (error) {
    // 오류 처리
    return NextResponse.json(
      {
        error: "닉네임이 업데이트 되지 않았습니다." + (error as Error).message,
      },
      { status: 500 }
    );
  }
}
