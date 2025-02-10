import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getDetailHandler(pageId: string) {
  const collectionRef = collection(db, "post");
  // const queryData = query(collectionRef, orderBy("timeStamp", "asc"));
  // const snapshot = await getDocs(queryData);
  const snapshot = await getDocs(collectionRef);
  if (snapshot.docs.length > 0) {
    const filterDocs = snapshot.docs.filter((item) => item.id === pageId);
    const docData = filterDocs.map((doc) => doc.data());
    return docData[0];
  } else {
    return null;
  }
}
