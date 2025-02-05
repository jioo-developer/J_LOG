"use client";
import "./myboard.scss";
import useMyDataQueryHook from "@/service/api-hooks/mypage/useGetMyPostData";
import { usePageInfoStore } from "@/store/common";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

const MyBoardPage = () => {
  const user = useQueryClient().getQueryData<User>(["getuser"]);

  const { myData } = useMyDataQueryHook();

  const { setPgId } = usePageInfoStore();

  function routeHandler() {
    setPgId(myData[0].pageId);
  }

  return (
    <div className="wrap board_wrap">
      <section className="board__header">
        <Image
          width={128}
          height={128}
          src={user ? (user.photoURL as string) : "images/default.svg"}
          alt="프로필 이미지"
          className="header_img"
        />
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
