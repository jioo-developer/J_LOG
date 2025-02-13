import { db } from "@/lib/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { user } = await request.json();
  const snapshot = await getDocs(collection(db, "cash"));

  if (snapshot.docs.length > 0) {
    const filterDocs = snapshot.docs.filter((item) => item.id === user.uid);
    return filterDocs.map((doc) => ({ ...doc.data() }));
  } else {
    return [{ cash: 0, item: 0 }];
  }
}

export async function POST(request: NextRequest) {
  const { user, cash, item } = await request.json();

  try {
    const Ref = doc(db, "cash", user.uid as string);

    await updateDoc(Ref, {
      cash: cash,
      item: item,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
