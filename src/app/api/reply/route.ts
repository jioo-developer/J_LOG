import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { id } = await request.json();

  const collectionRef = collection(doc(collection(db, "post"), id), "reply");
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
}

export async function POST(request: NextRequest) {
  const { id, data } = await request.json();
  const replyCollectionRef = collection(db, "post", id, "reply");

  await addDoc(replyCollectionRef, data);

  return NextResponse.json({ result: data });
}
