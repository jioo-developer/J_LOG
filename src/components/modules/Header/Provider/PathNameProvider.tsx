"use client";
import { usePathname } from "next/navigation";
import UserProvider from "./UserProvider";

const activePathName = [
  "/member/mypage",
  "/detail",
  "/",
  "/member/myboard",
  "/search",
  "/updateEditor",
  "/edit",
];

function PathNameProvider() {
  const pathname = usePathname();

  function checkPathname(pathname: string) {
    // "/" 경로가 다른 경로에 영향을 주지 않도록 예외 처리
    return activePathName.some((path) => {
      if (path === "/") {
        return pathname === path; // "/"는 정확히 일치하는 경우만 true
      }
      return pathname.startsWith(path); // 다른 경로들은 startsWith로 처리
    });
  }

  return checkPathname(pathname) && <UserProvider pathName={pathname} />;
}

export default PathNameProvider;
