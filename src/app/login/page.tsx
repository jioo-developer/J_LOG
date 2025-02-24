import { Metadata } from "next";
import ClientComponent from "./Client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "로그인 페이지 - J.log",
    description: "J.log에 로그인 하고 다양한 기능을 이용하세요.",
    openGraph: {
      title: "J.log 로그인 페이지",
      description: "J.log에 로그인 하고 다양한 기능을 이용하세요.",
      images: ["/images/logo.svg"],
    },
  };
}

export default async function Page() {
  return <ClientComponent />;
}
