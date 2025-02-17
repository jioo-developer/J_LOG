import getMyDataHandler from "@/apis/member/myboard/query/getMyDataHandler";
import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { firebaseVerifyHandler } from "@/app/api/login/tokenVerifyHandler";
import { cookies } from "next/headers";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "내 게시글 - J.log",
    description: "내 게시글을 확인하고 관리할 수 있는 페이지입니다.",
    openGraph: {
      title: "내 게시글 - J.log",
      description: "내 게시글을 확인하고 관리할 수 있는 페이지입니다.",
      images: ["/images/logo.svg"],
    },
  };
}

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
