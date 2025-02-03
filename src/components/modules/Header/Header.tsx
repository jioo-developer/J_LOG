/** @jsxImportSource @emotion/react */
"use client";
import useLogoutHook from "@/service/apis/login/hook/useLogoutHook";
import { ChevronDown, SearchIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import CommonButton from "../../atoms/CommonButton/CommonButton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { GoPoster, HeaderStyle, SubMenu, UIWrap } from "./Style";
import { getUser } from "@/service/apis/login/hook/getuserHook";

function Header() {
  const ref = useRef<HTMLInputElement | null>(null);

  const { data: user } = useQuery<User | null>({
    queryKey: ["getuser"],
    queryFn: getUser,
  });

  const { mutate: logoutHandler } = useLogoutHook();

  return (
    <header className="flex-Set" css={HeaderStyle}>
      <Link href="/" className="title">
        {user?.displayName ? user.displayName : "Loading..."}.log
      </Link>
      <div css={UIWrap}>
        <CommonButton theme="none">
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

        <ul className="sub_menu" css={SubMenu}>
          <li>
            <CommonButton theme="none">
              <Link href="member/myBoard">내 게시글</Link>
            </CommonButton>
          </li>
          <li>
            <CommonButton theme="none">
              <Link href="member/myPage">마이페이지</Link>
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
  );
}

export default Header;
