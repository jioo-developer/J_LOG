import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pageId = request.nextUrl.searchParams.get("pageId");
  const collectionRef = collection(db, "post");
  const snapshot = await getDocs(collectionRef);
  if (snapshot.docs.length > 0) {
    const filterDocs = snapshot.docs.filter((item) => item.id === pageId);
    const docData = filterDocs.map((doc) => doc.data());
    return NextResponse.json({ data: docData[0] });
  } else {
    return NextResponse.json({ data: null });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  try {
    const ref = doc(db, "post", id);
    await deleteDoc(ref);
  } catch (error) {
    throw new Error((error as Error).message);
  }

  return NextResponse.json({ message: "게시글이 삭제되었습니다." });
}
