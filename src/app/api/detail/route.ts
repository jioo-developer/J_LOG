import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { pageId } = await request.json();
  const collectionRef = collection(db, "post");
  const snapshot = await getDocs(collectionRef);

  if (snapshot.docs.length > 0) {
    const filterDocs = snapshot.docs.filter((item) => item.id === pageId);
    const docData = filterDocs.map((doc) => doc.data());
    return docData[0];
  } else {
    return null;
  }
}
