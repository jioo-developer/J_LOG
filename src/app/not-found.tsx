"use client";
import React from "react";
import "@/app/_asset/css/404.css";
import { useRouter } from "next/navigation";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";

const ErrorPage = () => {
  const router = useRouter();
  return (
    <div id="notfound">
      <div className="notfound">
        <h1>페이지를 찾을 수 없습니다.</h1>
        <CommonButton theme="success" onClick={() => router.push("/")}>
          돌아가기
        </CommonButton>
      </div>
    </div>
  );
};

export default ErrorPage;
