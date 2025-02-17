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
    title: "마이페이지 - J.log",
    description: "내 정보를 확인하고 관리할 수 있는 페이지입니다.",
    openGraph: {
      title: "J.log 마이페이지",
      description: "내 정보를 확인하고 관리할 수 있는 페이지입니다.",
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
