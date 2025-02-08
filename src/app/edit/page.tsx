import { NextRequest } from "next/server";
import ClientComponent from "./Client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDetailHandler } from "@/apis/detail/hook/useGetDetaillHook";

export default async function ServerComponent(request: NextRequest) {
  const queryClient = new QueryClient();
  const id = request.nextUrl.pathname.split("/").pop();

  await queryClient.prefetchQuery({
    queryKey: ["getDetail"],
    queryFn: () => getDetailHandler(id as string),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
