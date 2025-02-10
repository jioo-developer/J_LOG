/** @jsxImportSource @emotion/react */
"use client";
import useLogoutHook from "@/apis/login/hook/useLogoutHook";
import { ChevronDown, SearchIcon } from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useRef } from "react";
import CommonButton from "../../atoms/CommonButton/CommonButton";
import Link from "next/link";
import { GoPoster, HeaderStyle, SubMenu, UIWrap } from "./Style";
import { usePathname } from "next/navigation";
import { Skeleton } from "@mui/material";
import { usePageInfoStore } from "@/store/pageInfoStore";
import { useSearchStore } from "@/store/searchStore";
import useGetQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";

const activePathName = [
  "/member/mypage",
  "/detail",
  "/",
  "/member/myboard",
  "/search",
];

type propsType = {
  accessToken?: string;
};

function Header({ accessToken }: propsType) {
  const ref = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const isActive = activePathName.some((path) =>
    new RegExp(`^${path}$`).test(pathname)
  );

  const { user } = useGetQueryHandler();

  const { mutate: logout } = useLogoutHook();

  const { setEditMode } = usePageInfoStore();

  const { setSearch } = useSearchStore();

  useEffect(() => {
    if (!accessToken && user) logout();
  }, [accessToken, user]);

  useEffect(() => {
    if (ref.current?.checked) {
      ref.current.checked = false;
    }
  }, [pathname]);

  return (
    <>
      {isActive && (
        <header className="flex-Set" css={HeaderStyle}>
          <Link href="/" className="title" onClick={() => setSearch("")}>
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
                  <Link href="/member/mypage">마이페이지</Link>
                </CommonButton>
              </li>
              <li>
                <CommonButton theme="none">
                  <Link href="/member/myboard">내 게시글</Link>
                </CommonButton>
              </li>
              <li>
                <CommonButton theme="none" onClick={logout}>
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
