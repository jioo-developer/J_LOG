"use client";
import "./Style.scss";
import useGetQueryHandler from "@/apis/member/mypage/query/getMyDataQuery";
import useMyDataQueryHook from "@/apis/member/mypage/query/useGetMyPostQuery";
import { usePageInfoStore } from "@/store/common";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const MyBoardPage = () => {
  const { user } = useGetQueryHandler();

  const { myData } = useMyDataQueryHook();

  const { setPgId } = usePageInfoStore();

  function routeHandler() {
    setPgId(myData[0].pageId);
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
              <Link href={`/pages/detail/${myData[0].pageId}`}>
                <article onClick={routeHandler} key={index}>
                  <figure>
                    <Image
                      src={item.url[0] ? item.url[0] : "/img/no-image.jpg"}
                      width={768}
                      height={400}
                      alt="프로필 이미지"
                    />
                  </figure>
                  <figcaption>
                    <p className="content__title">{item.title}</p>
                    <p className="content__text">{item.text}</p>
                    <div className="caption__bottom">
                      <p>{item.date}</p>
                      <p>{`${item.replyLength}개의 댓글`}</p>
                      <p>
                        ♥&nbsp;
                        {item.favorite}
                      </p>
                    </div>
                  </figcaption>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MyBoardPage;
