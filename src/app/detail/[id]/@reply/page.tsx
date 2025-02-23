import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getReplyHandler } from "@/apis/detail/reply/query/getQueryHandler";
import { headers } from "next/headers";
export default async function ServerComponent() {
  const headerUrl = headers().get("x-url") || "";

  // URL에서 "detail/" 이후의 부분을 추출
  const pageId = headerUrl.split("/detail/")[1];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getReply", pageId],
    queryFn: async () => {
      return await getReplyHandler(pageId);
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent pageId={pageId} />
    </HydrationBoundary>
  );
}
