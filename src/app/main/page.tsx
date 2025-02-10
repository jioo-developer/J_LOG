import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from "@/apis/login/hook/useGetUserQuery";
import { getPostHandler } from "@/apis/main/getPostHanlder";
export default async function MainPageServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getuser"],
    queryFn: getUser,
  });

  await queryClient.prefetchQuery({
    queryKey: ["getPost"],
    queryFn: getPostHandler,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
