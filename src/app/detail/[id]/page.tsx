import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDetailHandler } from "@/apis/detail/query/getDetailHandler";
import { NextRequest } from "next/server";
import { getIsFavoriteHandler } from "@/apis/detail/favorite/query/getIsFavorite";
import { User } from "firebase/auth";
export default async function ServerComponent(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pageId = pathname.split("/")[2];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getPage", pageId],
    queryFn: async () => {
      return await getDetailHandler(pageId);
    },
  });

  const user = queryClient.getQueryData<User>(["getuser"]) || null;
  if (user) {
    await queryClient.prefetchQuery({
      queryKey: ["getFavorite", pageId, user],
      queryFn: async () => {
        return await getIsFavoriteHandler({ user: user.uid, pageId });
      },
    });
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent pageId={pageId} />
    </HydrationBoundary>
  );
}
