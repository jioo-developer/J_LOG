import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from "@/apis/userAuth/login/hook/useGetUserHook";
import { getNicknameHandler } from "@/apis/userAuth/auth/hook/useGetNicknameHook";
export default async function MainPageServerComponent() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["getUser"],
      queryFn: getUser,
    }),
    queryClient.prefetchQuery({
      queryKey: ["getNickname"],
      queryFn: getNicknameHandler,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
