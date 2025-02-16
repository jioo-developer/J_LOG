import getMyDataHandler from "@/apis/member/myboard/query/getMyDataHandler";
import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { firebaseVerifyHandler } from "@/app/api/login/tokenVerifyHandler";
import { cookies } from "next/headers";
export default async function ServerComponent() {
  const cookieStore = cookies();

  const queryClient = new QueryClient();

  const authToken =
    cookieStore.get("authToken")?.value ||
    cookieStore.get("GoogleAuthToken")?.value;

  const loginUser = await firebaseVerifyHandler(authToken as string);

  const user = loginUser.uid;

  await queryClient.prefetchQuery({
    queryKey: ["getMyData", user],
    queryFn: () => getMyDataHandler(user),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
