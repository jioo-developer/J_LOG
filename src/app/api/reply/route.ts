import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("pageId");
  if (id) {
    const docRef = doc(db, "post", id); // 'post' 컬렉션 내 'id' 문서 참조
    const collectionRef = collection(docRef, "reply"); // 'reply' 컬렉션 참조
    const snapshot = await getDocs(collectionRef);

    if (snapshot.docs.length > 0) {
      const docData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return NextResponse.json({ data: docData });
    } else {
      return NextResponse.json({ data: null });
    }
  } else {
    return NextResponse.json({ data: null });
  }
}

export async function POST(request: NextRequest) {
  const { id, data } = await request.json();
  const replyCollectionRef = collection(db, "post", id, "reply");

  await addDoc(replyCollectionRef, data);

  return NextResponse.json({ result: data });
}
