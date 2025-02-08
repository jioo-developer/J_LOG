import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getNicknameHandler } from "@/apis/userAuth/auth/hook/useGetNicknameHook";

export default async function NicknameServerComponent() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getNickname"],
    queryFn: getNicknameHandler,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
