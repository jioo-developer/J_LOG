import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { pageId } = await request.json();
  const collectionRef = collection(db, "post");
  const queryData = query(collectionRef, where("id", "==", pageId));
  const snapshot = await getDocs(queryData);

  if (!snapshot.empty) {
    return NextResponse.json({ data: snapshot.docs[0].data() });
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
