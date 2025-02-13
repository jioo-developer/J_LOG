/** @jsxImportSource @emotion/react */
"use client";
import { useEffect, useState } from "react";
import Item from "./component/Item";
import usePostQueryHook from "@/apis/main/query/useGetQuery";
import { css } from "@emotion/react";
import { useSearchStore } from "@/store/searchStore";
import { usePopupStore } from "@/store/popupStore";
import { popuprHandler } from "@/utils/popupHandler";
import { FirebaseData } from "@/static/types/common";

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
      popuprHandler({ message: "검색 결과가 존재 하지 않습니다." });
      return null;
    }

    return array.map((item: FirebaseData, index: number) => {
      return <Item item={item} index={index} key={index} />;
    });
  };
  // 게시글 랜더링 함수

  return (
    <div className="post_section" css={SectionStyle}>
      {showDataHandler()}
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
