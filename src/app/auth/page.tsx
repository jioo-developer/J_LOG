<<<<<<< HEAD
=======
import { getNicknameHandler } from "@/apis/member/mypage/nicknameForm/getNicknameHandler";
>>>>>>> d333fc1963018e3847176f94d92528819df0a49d
import ClientComponent from "./Client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
<<<<<<< HEAD
import { getNicknameHandler } from "@/service/api-hooks/auth/hook/useGetNicknameHook";

export default async function NicknameServerComponent() {
=======
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
>>>>>>> d333fc1963018e3847176f94d92528819df0a49d
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getNickname"],
    queryFn: getNicknameHandler,
  });
<<<<<<< HEAD

  const dehydratedState = dehydrate(queryClient);

=======

  const dehydratedState = dehydrate(queryClient);

>>>>>>> d333fc1963018e3847176f94d92528819df0a49d
  return (
    <HydrationBoundary state={dehydratedState}>
      <ClientComponent />
    </HydrationBoundary>
  );
}
