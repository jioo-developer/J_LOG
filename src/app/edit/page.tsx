import { getCashHandler } from "@/apis/market/query/getCashHandler";
import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "게시글 수정 - J.log",
    description: "내 게시글을 수정할 수 있는 페이지입니다.",
    openGraph: {
      title: "J.log 회원정보 수정",
      description: "내 게시글을 수정할 수 있는 페이지입니다.",
      images: ["/images/logo.svg"],
    },
  };
}

export default async function ServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getCash"],
    queryFn: getCashHandler,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
