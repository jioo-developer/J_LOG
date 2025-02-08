import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPostData } from "@/apis/main/useGetDataFetchHook";
export default async function MainPageServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getPost"],
    queryFn: getPostData,
  });

  const dehydratedState = dehydrate(queryClient);
  console.log(dehydratedState + "dehydrate");
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
