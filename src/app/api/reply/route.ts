import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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
  const { data } = await request.json();

  const replyRef = collection(db, "post", data.id, "reply");

  await addDoc(replyRef, data);

  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const { pageId, replyId, comment } = await request.json();
  const collectionRef = collection(db, "post", pageId, "reply");

  try {
    const snapshot = await getDocs(collectionRef);
    if (snapshot && !snapshot.empty) {
      const filterDocs = snapshot.docs.filter((item) => item.id === replyId);
      const docRef = doc(collectionRef, filterDocs[0].id);
      await updateDoc(docRef, { comment: comment });
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}

export async function DELETE(request: NextRequest) {
  const { id, replyId } = await request.json();
  const replyDocRef = doc(db, "post", id, "reply", replyId as string);
  try {
    await deleteDoc(replyDocRef);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message });
  }
}
