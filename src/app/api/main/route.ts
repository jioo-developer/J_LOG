import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const collectionRef = collection(db, "post");
  const queryData = query(collectionRef, orderBy("timestamp", "asc"));
  try {
    const response = await getDocs(queryData);
    if (response.empty) {
      return NextResponse.json({ postdata: [] }, { status: 200 });
    }
    const postArray = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return NextResponse.json({ postdata: postArray }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
