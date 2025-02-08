import { getMyData } from "@/apis/member/mypage/query/useGetMyPostQuery";
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
    queryFn: getMyData,
  });

  const dehydratedState = dehydrate(queryClient);
  console.log(dehydratedState + "dehydrate");
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
