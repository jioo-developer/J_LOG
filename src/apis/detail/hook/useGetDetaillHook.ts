import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { apiUrl } from "@/static/constants/common";

export type FirebaseData = {
  user: string;
  pageId: string;
  profile: string;
  date: string;
  timestamp: Timestamp;
  title: string;
  fileName: string[];
  url: string[];
  favorite: number;
  text: string;
  writer: string;
  id: string;
  priority?: boolean;
  replyLength?: number;
};

export async function getDetailHandler(pageId: string) {
  const response = await fetch(`${apiUrl}/api/detail`, {
    method: "GET",
    body: JSON.stringify({ pageId }),
  });
  return response.json();
}

const useDetailQueryHook = (pageId: string) => {
  const { data, isLoading, error }: QueryObserverResult<FirebaseData> =
    useQuery({
      queryKey: ["getPage", pageId],
      queryFn: async (queryKey) => {
        const keyParams = queryKey.queryKey[1] as string;
        return await getDetailHandler(keyParams);
      },
      staleTime: 1 * 60 * 1000, // 1분
      notifyOnChangeProps: ["data"],
      refetchOnMount: "always",
      enabled: !!pageId,
    });

  return { pageData: data, isLoading, error };
};
export default useDetailQueryHook;
