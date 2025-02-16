"use client";
import "./Style.scss";
import useMyDataQueryHook from "@/apis/member/myboard/query/useGetMyPostQuery";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Item from "./components/Item";
import { usePageInfoStore } from "@/store/pageInfoStore";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import useUserQueryHook from "@/apis/login/hook/useGetUserQuery";

const MyBoardPage = () => {
  const { data: user } = useUserQueryHook();

  const { myData } = useMyDataQueryHook(user ? user.uid : "");

  const { setPgId } = usePageInfoStore();

  return (
    <div className="wrap board_wrap">
      <section className="board__header">
        <figure className="profileImg">
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
        </figure>
        {user ? (
          <b className="board__nickname">{user.displayName}</b>
        ) : (
          <Skeleton variant="text" width={"100%"} height={35} />
        )}
      </section>
      <section className="board__content">
        <div className="content__in">
          <p className="all_view">
            전체보기
            <span>&nbsp;{`(${myData.length})`}</span>
          </p>
          {myData.length > 0 &&
            myData.map((item, index) => {
              return (
                <CommonButton theme="none">
                  <Link
                    key={index}
                    onClick={() => setPgId(item.pageId)}
                    href={`/detail/${myData[index].pageId}`}
                  >
                    <Item item={item} />
                  </Link>
                </CommonButton>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default MyBoardPage;
