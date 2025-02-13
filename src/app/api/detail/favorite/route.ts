import { db } from "@/lib/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { user, id } = await request.json();
  const likeDocRef = doc(db, `posts/${id}/likes/${user}`);
  const likeDocSnap = await getDoc(likeDocRef);

  return NextResponse.json({ statusValue: likeDocSnap.exists() });
}

export async function POST(request: NextRequest) {
  const { user, id } = await request.json();
  const likeDocRef = doc(db, `posts/${id}/likes/${user}`);

  const likeDocSnap = await getDoc(likeDocRef);

  if (likeDocSnap.exists()) {
    // 이미 좋아요를 눌렀다면 삭제
    await deleteDoc(likeDocRef);
    console.log("좋아요 취소됨");
  } else {
    // 좋아요 추가
    await setDoc(likeDocRef, { likedAt: new Date() });
    console.log("좋아요 추가됨");
  }

  return NextResponse.json({ message: "좋아요 처리가 완료되었습니다." });
}
