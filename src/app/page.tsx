"use client";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import useLogoutHook from "@/service/apis/login/hook/useLogoutHook";

export default function Home() {
  const { mutate } = useLogoutHook();
  return (
    <div style={{ width: 150, height: 45 }}>
      <CommonButton size="rg" theme="success" onClick={mutate}>
        로그아웃
      </CommonButton>
    </div>
  );
}
