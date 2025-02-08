import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
export async function GET(request: NextRequest) {
  const { user } = await request.json();
  try {
    // ✅ Firestore에서 직접 필터링하여 불필요한 데이터 조회 방지
    const collectionRef = collection(db, "post");
    const queryData = query(
      collectionRef,
      where("writer", "==", user), // ✅ Firestore에서 필터링
      orderBy("timestamp", "asc")
    );

    const snapshot = await getDocs(queryData);
    if (snapshot.empty) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    // ✅ Firestore 서브컬렉션 (reply) 병렬 조회
    const result = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const replyCollection = collection(doc.ref, "reply");
        const replySnapshot = await getDocs(replyCollection);

        return {
          ...doc.data(),
          id: doc.id,
          replyLength: replySnapshot.size || 0, // ✅ reply 개수 최적화
        };
      })
    );

    return NextResponse.json({ posts: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
