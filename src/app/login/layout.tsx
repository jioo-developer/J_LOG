// layouts/LoginLayout.tsx
"use client";
import "./style.scss";
import Image from "next/image";
import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="page-Reset sign__Wrap flex-Set">
      <div className="logo__Wrap">
        <Image
          src="/images/logo.svg"
          width={300}
          height={115}
          alt="로고"
          sizes="100vw"
          priority
          style={{ width: "100%", height: "auto" }}
        />
        <h1 className="logo__Title">J.log</h1>
      </div>
      {children}
    </div>
  );
}

export default LoginLayout;
