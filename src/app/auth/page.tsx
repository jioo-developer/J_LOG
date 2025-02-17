import { getNicknameHandler } from "@/apis/member/mypage/nicknameForm/getNicknameHandler";
import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "회원가입 - J.log",
    description: "J.log에 가입하고 다양한 기능을 이용하세요.",
    openGraph: {
      title: "J.log 회원가입",
      description: "J.log에 가입하고 다양한 기능을 이용하세요.",
      images: ["/images/logo.svg"],
    },
  };
}

export default async function ServerComponent() {
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
