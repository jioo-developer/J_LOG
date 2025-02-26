/** @jsxImportSource @emotion/react */
"use client";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";
import CommonButton from "../../atoms/CommonButton/CommonButton";
import Link from "next/link";
import { HeaderStyle, SubMenu, UIWrap } from "./Style";
import { Skeleton } from "@mui/material";
import { useSearchStore } from "@/store/searchStore";
import useLogoutHook from "@/apis/login/hook/useLogoutHook";
import useUserQueryHook from "@/apis/login/hook/useGetUserQuery";
import { getTokenHandler } from "@/apis/common/getTokenHandler";
import { FaChevronDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

type propsType = {
  pathName: string;
};

function Header({ pathName }: propsType) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [tokenState, setToken] = useState<boolean | null>(null);
  const { setSearch } = useSearchStore();
  const { data: user, refetch } = useUserQueryHook();
  const { mutate: logout } = useLogoutHook();

  useEffect(() => {
    fetchToken();
    if (ref.current?.checked) {
      ref.current.checked = false;
    }
  }, [pathName]); // pathName 변경 시마다 실행

  const fetchToken = async () => {
    const isTokened = await getTokenHandler();
    setToken(isTokened);
  };

  useEffect(() => {
    if ((tokenState && !user) || !user) {
      refetch();
    } else {
      fetchToken();
    }
  }, [tokenState, user]);

  useEffect(() => {
    if (typeof tokenState === "boolean" && !tokenState && user) {
      logout();
    }
  }, [tokenState, user]);

  return (
    <header className="flex-Set" data-testid="header-test" css={HeaderStyle}>
      <Link href="/" className="title" onClick={() => setSearch("")}>
        {user ? (
          user.displayName + ".log"
        ) : (
          <Skeleton variant="text" width={110} />
        )}
      </Link>
      <div css={UIWrap}>
        <CommonButton theme="none" testId="search-test">
          <Link href="/search">
            <IoIosSearch size={32} style={{ marginTop: 10 }} />
          </Link>
        </CommonButton>
        <label htmlFor="menuToggle" className="flex-Set">
          <input type="checkbox" id="menuToggle" ref={ref} />
          <figure>
            {user ? (
              <Image
                width={40}
                height={40}
                src={user?.photoURL ? user.photoURL : "/images/default.svg"}
                alt="프로필 이미지"
                referrerPolicy="no-referrer"
              />
            ) : (
              <Skeleton variant="circular" width={40} height={40} /> // user가 로드되기 전 Skeleton 표시
            )}
          </figure>
          <FaChevronDown size={16} />
        </label>

        <ul className="sub_menu" css={SubMenu}>
          <li>
            <CommonButton theme="none" type="button">
              <Link href="/member/mypage">마이페이지</Link>
            </CommonButton>
          </li>
          <li>
            <CommonButton theme="none" type="button">
              <Link href="/member/myboard">내 게시글</Link>
            </CommonButton>
          </li>
          <li>
            <CommonButton theme="none" type="button" onClick={logout}>
              로그아웃
            </CommonButton>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
