"use client";
import "./Style.scss";
import useGetQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";
import useMyDataQueryHook from "@/apis/member/mypage/query/useGetMyPostQuery";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Item from "./components/Item";
import { usePageInfoStore } from "@/store/common";

const MyBoardPage = () => {
  const { user } = useGetQueryHandler();

  const { myData } = useMyDataQueryHook();

  const { setPgId } = usePageInfoStore();

  function routeHandler(index: number) {
    setPgId(myData[index].pageId);
  }

  return (
    <div className="wrap board_wrap">
      <section className="board__header">
        <figure className="profileImg">
          <Suspense
            fallback={<Skeleton variant="circular" width={135} height={135} />}
          >
            {user ? (
              <Image
                width={135}
                height={135}
                src={user.photoURL || "/images/default.svg"}
                alt="프로필 이미지"
              />
            ) : (
              <Skeleton variant="circular" width={135} height={135} />
            )}
          </Suspense>
        </figure>
        <b className="board__nickname">{user ? user.displayName : ""}</b>
      </section>
      <section className="board__content">
        <div className="content__in">
          <p className="all_view">
            전체보기
            <span>&nbsp;{`(${myData.length})`}</span>
          </p>
          {myData.map((item, index) => {
            return (
              <button onClick={() => routeHandler(index)}>
                <Link
                  key={index}
                  href={`/pages/detail/${myData[index].pageId}`}
                >
                  <Item item={item} />
                </Link>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MyBoardPage;
