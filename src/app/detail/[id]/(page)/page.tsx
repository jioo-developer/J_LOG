import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDetailHandler } from "@/apis/detail/query/getDetailHandler";
import { headers } from "next/headers";
export default async function ServerComponent() {
  const headerUrl = headers().get("x-url") || "";

  // URL에서 "detail/" 이후의 부분을 추출
  const pageId = headerUrl.split("/detail/")[1];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getPage", pageId],
    queryFn: async () => {
      return await getDetailHandler(pageId);
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent pageId={pageId} />
    </HydrationBoundary>
  );
}
