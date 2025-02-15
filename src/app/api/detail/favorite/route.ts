import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// GET 요청 처리
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const user = url.searchParams.get("user");
  const id = url.searchParams.get("id");

  const likeDocRef = doc(db, `posts/${id}/likes/${user}`);
  const likeDocSnap = await getDoc(likeDocRef);

  return NextResponse.json({ statusValue: likeDocSnap.exists() });
}

// POST 요청 처리
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const user = url.searchParams.get("user");
  const id = url.searchParams.get("id");

  const likeDocRef = doc(db, `posts/${id}/likes/${user}`);

  const likeDocSnap = await getDoc(likeDocRef);

  if (likeDocSnap.exists()) {
    // 이미 좋아요를 눌렀다면 삭제
    await deleteDoc(likeDocRef);
  } else {
    // 좋아요 추가 (user.uid를 likedBy 필드에 저장)
    await setDoc(likeDocRef, {
      likedAt: new Date(),
      likedBy: user, // user.uid를 likedBy에 저장
    });
  }

  return NextResponse.json({ message: "좋아요 처리가 완료되었습니다." });
}
