/** @jsxImportSource @emotion/react */
"use client";
import { FirebaseData } from "@/components/type";
import { Suspense, useEffect, useState } from "react";
import Item from "./component/Item";
import usePostQueryHook from "@/apis/main/useGetQuery";
import { useSearchStore } from "@/store/common";
import { css } from "@emotion/react";
import { Skeleton } from "@mui/material";

const MainPage = ({}) => {
  const [postState, setState] = useState<FirebaseData[]>([]);

  const { searchText } = useSearchStore();

  const { postData } = usePostQueryHook();

  const searchInfo = {
    params: searchText,
    isSearch: searchText !== "" ? true : false,
  };

  useEffect(() => {
    if (searchInfo.isSearch) {
      const target = searchInfo.params;
      const filterArray = postData.filter(
        (item) => item.title === target || item.text === target
      );
      setState(filterArray);
    }
  }, [searchInfo.isSearch]);

  const showDataHandler = () => {
    const array = searchInfo.isSearch ? postState : postData;
    if (array.length === 0) {
      return <Skeleton variant="rectangular" width={300} height={300} />;
    }

    return array.map((item: FirebaseData, index: number) => {
      return <Item item={item} index={index} key={index} />;
    });
  };
  // 게시글 랜더링 함수

  return (
    <div className="post_section" css={SectionStyle}>
      <Suspense fallback={<Skeleton variant="rectangular" />}>
        {showDataHandler()}
      </Suspense>
    </div>
  );
};

export default MainPage;

const SectionStyle = css`
  display: flex;
  width: 95%;
  margin: 0 auto;
  margin-top: 32px;
  flex-wrap: wrap;
`;
