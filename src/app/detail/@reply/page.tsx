import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getReplyHandler } from "@/apis/detail/reply/query/getQueryHandler";
import { NextRequest } from "next/server";
export default async function ServerComponent(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pageId = pathname.split("/")[2];

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
