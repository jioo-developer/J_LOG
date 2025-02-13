import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(request: NextRequest) {
  const { data, pageId } = await request.json();
  try {
    setDoc(doc(db, "post", pageId), data);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
