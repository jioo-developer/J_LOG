import { Metadata } from "next";
import Client from "./Client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "J.log 검색페이지지",
    description: "J.log의 검색 서비스를 이용해보세요",
    openGraph: {
      title: "J.log 회원가입",
      description: "J.log의 검색 서비스를 이용해보세요",
      images: ["/images/logo.svg"],
    },
  };
}

export default async function Page() {
  return <Client />;
}
