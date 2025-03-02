import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { data, pageId } = await request.json();
  try {
    await setDoc(doc(db, "post", pageId), data);
    return NextResponse.json(
      { message: "게시글 작성에 성공 하였습니다." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
