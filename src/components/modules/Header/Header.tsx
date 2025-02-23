"use client";
<<<<<<< HEAD
import useLogoutHook from "@/service/api-hooks/login/hook/useLogoutHook";
import { ChevronDown, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CommonButton from "../../atoms/CommonButton/CommonButton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { GoPoster, HeaderStyle, SubMenu, UIWrap } from "./Style";
import { getUser } from "@/service/api-hooks/login/hook/useGetUserHook";
import { usePathname } from "next/navigation";
import { usePageInfoStore } from "@/store/common";

const activePathName = ["/member/mypage", "/detail", "/", "/member/myBoard"];

function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLInputElement | null>(null);

  const { data: user } = useQuery<User | null>({
    queryKey: ["getuser"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (ref.current?.checked) {
      ref.current.checked = false;
    }
  }, [pathname]);

  const isActive = activePathName.some((path) =>
    new RegExp(`^${path}$`).test(pathname)
  );

  const { mutate: logoutHandler } = useLogoutHook();

  const { setEditMode } = usePageInfoStore();

  return (
    <>
      {isActive && (
        <header className="flex-Set" css={HeaderStyle}>
          <Link href="/" className="title">
            {user?.displayName ? user.displayName : "Loading..."}.log
          </Link>
          <div css={UIWrap}>
            <CommonButton theme="none" onClick={() => setEditMode(false)}>
              <Link href="/editor" css={GoPoster}>
                새&nbsp;글&nbsp;작성
              </Link>
              {/* pageInfoStore.setState({ editMode: false }); */}
            </CommonButton>
            <CommonButton theme="none">
              <Link href="/search">
                <SearchIcon style={{ marginTop: 10 }} />
              </Link>
            </CommonButton>
            <label htmlFor="menuToggle" className="flex-Set">
              <input type="checkbox" id="menuToggle" ref={ref} />
              <figure>
                <Image
                  width={40}
                  height={40}
                  src={user?.photoURL ? user.photoURL : "/images/default.svg"}
                  alt="프로필 이미지"
                  referrerPolicy="no-referrer"
                />
              </figure>
              <ChevronDown size={18} />
            </label>
=======
import { usePathname } from "next/navigation";
import Component from "./Component";

const activePathName = [
  "/member/mypage",
  "/detail",
  "/",
  "/member/myboard",
  "/search",
  "/updateEditor",
  "/edit",
];

function HeaderProvider() {
  const pathname = usePathname();
>>>>>>> d333fc1963018e3847176f94d92528819df0a49d

  function checkPathname(pathname: string) {
    // "/" 경로가 다른 경로에 영향을 주지 않도록 예외 처리
    return activePathName.some((path) => {
      if (path === "/") {
        return pathname === path; // "/"는 정확히 일치하는 경우만 true
      }
      return pathname.startsWith(path); // 다른 경로들은 startsWith로 처리
    });
  }

  return checkPathname(pathname) && <Component pathName={pathname} />;
}

export default HeaderProvider;
