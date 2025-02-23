import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUser } from "@/apis/login/hook/useGetUserQuery";
import { getPostHandler } from "@/apis/main/query/getPostHanlder";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "J.log",
    description: "J.log의 다양한 게시글들을 이용하세요.",
    openGraph: {
      title: "J.log 회원가입",
      description: "J.log의 다양한 게시글들을 이용하세요.",
      images: ["/images/logo.svg"],
    },
  };
}

export default async function ServerComponent() {
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
