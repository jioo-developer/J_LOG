import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// GET 요청 처리
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as string;
  const uid = request.nextUrl.searchParams.get("userUid") as string;

  // like 컬렉션이 존재하는지 확인

  const likeRef = collection(db, "post", id, "like");

  try {
    const likeSnapshot = await getDocs(likeRef);

    if (likeSnapshot.empty) {
      return NextResponse.json({ statusValue: false });
    } else {
      // like 컬렉션이 존재하는지 확인
      const likeDocRef = doc(db, "post", id, "like", uid);
      const likeDocSnap = await getDoc(likeDocRef);

      // likeDocSnap이 존재하면 좋아요가 눌렸다는 의미
      return NextResponse.json(
        {
          statusValue: likeDocSnap.exists(),
          message: likeDocSnap.exists()
            ? "좋아요가 존재합니다."
            : "좋아요가 존재하지 않습니다.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST 요청 처리

export async function POST(request: NextRequest) {
  const { value, id, user } = await request.json();
  const postDocRef = doc(db, "post", id);
  // 페이지 정보의 favorite 개수 수정을 위해 페이지의 doc을 불러옴

  // like collection이 있는지 검증
  try {
    const likeRef = collection(db, "post", id, "like");
    const likeSnapshot = await getDocs(likeRef);
    // like collection이 있는지 검증

    let newFavorite;
    // favorite값 제어 변수

    // like collection이 없을 때
    if (likeSnapshot.empty) {
      const likeDocRef = doc(likeRef, user);
      // user.uid를 문서 ID로 사용

      await setDoc(likeDocRef, {
        likedAt: new Date(),
        likedBy: user,
      });
      newFavorite = value + 1;

      // like collection이 없을 때

      // like collection이 있을 때
    } else {
      const likeDocRef = doc(likeRef, user); // user.uid를 문서 ID로 사용
      const likeDocSnap = await getDoc(likeDocRef);
      const isLiked = likeDocSnap.exists();
      newFavorite = isLiked ? value - 1 : value + 1;
      if (isLiked) {
        // 좋아요 취소
        await deleteDoc(likeDocRef);
      } else {
        // 좋아요 추가
        await setDoc(likeDocRef, {
          likedAt: new Date(),
          likedBy: user.uid,
        });
      }
    }
    // like collection이 있을 때

    // 공통 적용
    await updateDoc(postDocRef, {
      favorite: newFavorite,
    });
    return NextResponse.json(
      {
        message: "좋아요 반영이 완료되었습니다.",
      },
      { status: 200 }
    );
    // 공통 적용
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
