import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("uid");
  const collectionRef = collection(db, "post");
  const queryData = query(collectionRef, orderBy("timestamp", "asc"));
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
            replyLength: replyLength > 0 && replyLength,
          };
        })
      );
      return NextResponse.json({ data: result });
    } else {
      return NextResponse.json({ data: [] });
    }
  } else {
    return NextResponse.json({ data: [] });
  }
}
