import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { getReplyHandler } from "./getQueryHandler";

export type replyType = {
  comment: string;
  uid: string;
  replyrer: string;
  date: string;
  timestamp: { second: number; nanoseconds: number };
  profile: string;
  id: string; // REPLYID
};

export const useReplyQueryHook = (pageId: string) => {
  const { data, isLoading, error }: QueryObserverResult<replyType[]> = useQuery(
    {
      queryKey: ["getReply", pageId],
      queryFn: async (queryKey) => {
        const keyParams = queryKey.queryKey[1] as string;
        return await getReplyHandler(keyParams);
      },
      staleTime: 5 * 60 * 1000,
      enabled: !!pageId,
    }
  );

  return { replyData: data ?? [], isLoading, error };
};
