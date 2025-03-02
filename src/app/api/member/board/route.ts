import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("uid");

  const collectionRef = collection(db, "post");
  const queryData = query(collectionRef, orderBy("timestamp", "asc"));
  try {
    const snapshot = await getDocs(queryData);

    if (!snapshot.empty) {
      const filter = snapshot.docs.filter((doc) => {
        return doc.data().writer === user;
      });

      if (filter.length > 0) {
        const result = await Promise.all(
          filter.map(async (doc) => {
            const isReply = collection(doc.ref, "reply");
            const snapshot = await getDocs(isReply);
            let replyLength = 0;
            if (!snapshot.empty) {
              replyLength = snapshot.docs.length;
            }
            return {
              ...doc.data(),
              id: doc.id,
              replyLength: replyLength > 0 ? replyLength : 0, // 0이면 replyLength 필드가 없도록 처리
            };
          })
        );
        return NextResponse.json(
          {
            data: result,
            message: "게시글을 성공적으로 가져왔습니다.",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            data: [],
            message: "해당 사용자의 게시글이 없습니다.",
          },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        {
          data: [],
          message: "해당 사용자의 게시글이 없습니다.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    // 에러가 발생하면 상태 코드 500과 에러 메시지 반환
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
