import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const pageId = request.nextUrl.searchParams.get("pageId");
  const collectionRef = collection(db, "post");
  const snapshot = await getDocs(collectionRef);
  if (snapshot.docs.length > 0) {
    const filterDocs = snapshot.docs.filter((item) => item.id === pageId);
    const docData = filterDocs.map((doc) => doc.data())[0];
    return NextResponse.json({ data: docData }, { status: 200 });
  } else {
    return NextResponse.json({ data: null }, { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    // "reply" 하위 컬렉션 삭제
    const replyRef = collection(db, "post", id, "reply");
    const replyDocs = await getDocs(replyRef);
    if (!replyDocs.empty) {
      replyDocs.forEach(async (docSnap) => {
        await deleteDoc(docSnap.ref); // 각 "reply" 문서 삭제
      });
    }

    // "favorite" 하위 컬렉션 삭제
    const favoriteRef = collection(db, "post", id, "like");
    const favoriteDocs = await getDocs(favoriteRef);
    if (!favoriteDocs.empty) {
      favoriteDocs.forEach(async (docSnap) => {
        await deleteDoc(docSnap.ref); // 각 "favorite" 문서 삭제
      });
    }

    const ref = doc(db, "post", id);
    await deleteDoc(ref);

    return NextResponse.json(
      { success: true, message: "게시글이 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
