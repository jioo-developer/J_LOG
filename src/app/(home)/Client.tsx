/** @jsxImportSource @emotion/react */
"use client";
import { FirebaseData } from "@/components/type";
import { useEffect, useState } from "react";
import Item from "./component/Item";
import usePostQueryHook from "@/service/api-hooks/home/useGetDataFetchHook";
import { useSearchStore } from "@/store/common";

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
    if (array.length > 0) {
      return array.map((item: FirebaseData, index: number) => {
        return <Item item={item} index={index} key={index} />;
      });
    }
  };
  // 게시글 랜더링 함수

  return <div className="post_section">{showDataHandler()}</div>;
};

export default MainPage;
