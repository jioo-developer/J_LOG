import type { Metadata } from "next";
import TanstackProvider from "@/provider/TanstackProvider";
import "./globals.css";
import "@/asset/common.scss";
import Header from "@/components/modules/Header/Component";
import { ReturnPopup } from "@/utils/popupHandler";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "J-LOG",
  description: "벨로그 클론코딩 프로젝트",
  keywords: ["벨로그", "클론코딩", "커뮤니티"], // SEO 키워드 목록
  creator: "JIOO",
  icons: {
    icon: "/images/default.svg", // 기본 아이콘 경로
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <TanstackProvider>
          <Header />
          {children}
          {modal}
          <div id="modal-root"></div>
          <ReturnPopup />
        </TanstackProvider>
      </body>
    </html>
  );
}
