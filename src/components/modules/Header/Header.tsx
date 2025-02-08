/** @jsxImportSource @emotion/react */
"use client";
import useLogoutHook from "@/service/userAuth/login/hook/useLogoutHook";
import { ChevronDown, SearchIcon } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import CommonButton from "../../atoms/CommonButton/CommonButton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { GoPoster, HeaderStyle, SubMenu, UIWrap } from "./Style";
import { getUser } from "@/service/userAuth/login/hook/useGetUserHook";
import { usePathname } from "next/navigation";
import { usePageInfoStore, useSearchStore } from "@/store/common";
import { Skeleton } from "@mui/material";

const activePathName = [
  "/mypage",
  "/detail",
  "/",
  "/mypage/myboard",
  "/search",
];

type propsType = {
  accessToken?: string;
};

function Header({ accessToken }: propsType) {
  const pathname = usePathname();
  const ref = useRef<HTMLInputElement | null>(null);

  const { data: user } = useQuery<User | null>({
    queryKey: ["getuser"],
    queryFn: getUser,
  });

  const { mutate } = useLogoutHook();

  useEffect(() => {
    if (!accessToken && user) {
      mutate();
    }
  }, [accessToken]);

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

  const { setSearch } = useSearchStore();

  return (
    <>
      {isActive && (
        <header className="flex-Set" css={HeaderStyle}>
          <Link
            href="/"
            className="title"
            onClick={() => {
              setSearch("");
            }}
          >
            <Suspense fallback={<Skeleton variant="text" />}>
              {user ? (
                user.displayName + ".log"
              ) : (
                <Skeleton variant="text" width={110} />
              )}
            </Suspense>
          </Link>
          <div css={UIWrap}>
            <CommonButton theme="none" onClick={() => setEditMode(false)}>
              <Link href="/edit" css={GoPoster}>
                새&nbsp;글&nbsp;작성
              </Link>
            </CommonButton>
            <CommonButton theme="none">
              <Link href="/search">
                <SearchIcon style={{ marginTop: 10 }} />
              </Link>
            </CommonButton>
            <label htmlFor="menuToggle" className="flex-Set">
              <input type="checkbox" id="menuToggle" ref={ref} />
              <figure>
                <Suspense
                  fallback={
                    <Skeleton variant="circular" width={40} height={40} />
                  }
                >
                  {user ? (
                    <Image
                      width={40}
                      height={40}
                      src={
                        user?.photoURL ? user.photoURL : "/images/default.svg"
                      }
                      alt="프로필 이미지"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <Skeleton variant="circular" width={40} height={40} /> // user가 로드되기 전 Skeleton 표시
                  )}
                </Suspense>
              </figure>
              <ChevronDown size={18} />
            </label>

            <ul className="sub_menu" css={SubMenu}>
              <li>
                <CommonButton theme="none">
                  <Link href="/mypage">마이페이지</Link>
                </CommonButton>
              </li>
              <li>
                <CommonButton theme="none">
                  <Link href="/mypage/myboard">내 게시글</Link>
                </CommonButton>
              </li>
              <li>
                <CommonButton
                  theme="none"
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  로그아웃
                </CommonButton>
              </li>
            </ul>
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
