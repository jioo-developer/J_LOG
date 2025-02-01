"use client";
import useLogoutHook from "@/service/apis/login/hook/useLogoutHook";
import { ChevronDown, SearchIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import CommonButton from "../../atoms/CommonButton/CommonButton";
import Link from "next/link";
import { getuser } from "@/service/apis/login/hook/getuserHook";
import { useQuery } from "@tanstack/react-query";
import { User } from "firebase/auth";

const activePathName = [
  "/pages/member/mypage",
  "/pages/detail",
  "/pages/main",
  "/pages/member/myBoard",
];

function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLInputElement | null>(null);
  const { data: user, error } = useQuery<User | null>({
    queryKey: ["getuser"],
    queryFn: getuser,
  });

  const { mutate: logoutHandler } = useLogoutHook();

  useEffect(() => {
    if (ref.current?.checked) {
      ref.current.checked = false;
    }
  }, [pathname]);

  const isActive = activePathName.some((path) =>
    new RegExp(`^${path}`).test(pathname)
  );

  return (
    <>
      {isActive && (
        <header>
          <div className="title">
            <Link href="/">
              {user?.displayName ? user.displayName : "...loadng"}.log
            </Link>
          </div>
          <div className="ui_wrap">
            <button className="go__poster">
              <Link href="/editor"> 새&nbsp;글&nbsp;작성</Link>
              {/* pageInfoStore.setState({ editMode: false }); */}
            </button>
            <button>
              <Link href="/search">
                <SearchIcon />
              </Link>
            </button>
            <label className="menu" htmlFor="menuToggle">
              <input type="checkbox" id="menuToggle" ref={ref} />
              <figure>
                <Image
                  width={40}
                  height={40}
                  src={user?.photoURL ? user.photoURL : "/images/default.svg"}
                  alt="프로필 이미지"
                  className="profile"
                  referrerPolicy="no-referrer"
                />
              </figure>
              <ChevronDown size={10} />
            </label>

            <ul className="sub_menu">
              <li>
                <CommonButton theme="none">
                  <Link href="member/myBoard"> 내 게시글</Link>
                </CommonButton>
              </li>
              <li>
                <CommonButton theme="none">
                  <Link href="member/myPage"> 마이페이지</Link>
                </CommonButton>
              </li>
              <li>
                <CommonButton theme="none" onClick={logoutHandler}>
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
