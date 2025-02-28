import { db } from "@/lib/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid") as string;
  const snapshot = await getDocs(collection(db, "cash"));
  try {
    if (snapshot.docs.length > 0) {
      const filterDocs = snapshot.docs.filter((item) => item.id === uid);
      const result = filterDocs.map((doc) => ({ ...doc.data() }))[0];
      return NextResponse.json({ data: result }, { status: 200 });
    } else {
      return NextResponse.json({ data: { cash: 0, item: 0 } }, { status: 200 });
    }
  } catch {
    return NextResponse.json({ data: { cash: 0, item: 0 } }, { status: 204 });
  }
}

export async function POST(request: NextRequest) {
  const { user, cash, item } = await request.json();

  try {
    const Ref = doc(db, "cash", user);

    await updateDoc(Ref, {
      cash: cash,
      item: item,
    });
    return NextResponse.json(
      { message: "우선권 구매가 완료 되었습니다." },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
