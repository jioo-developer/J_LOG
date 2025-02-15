import getMyDataHandler from "@/apis/member/mypage/query/getMyDataHandler";
import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function ServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getMyData"],
    queryFn: getMyDataHandler,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
