/** @jsxImportSource @emotion/react */
"use client";
import { useEffect, useState } from "react";
import Item from "./component/Item";
import usePostQueryHook from "@/apis/main/query/useGetQuery";
import { useSearchStore } from "@/store/searchStore";
import { popuprHandler } from "@/utils/popupHandler";
import { FirebaseData } from "@/static/types/common";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Image from "next/image";
import Link from "next/link";
import { usePageInfoStore } from "@/store/pageInfoStore";
import { addButton, SectionStyle } from "./style";

const MainPage = ({}) => {
  const [postState, setState] = useState<FirebaseData[]>([]);

  const { searchText } = useSearchStore();

  const { setEditMode } = usePageInfoStore();

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
  }, [searchInfo.isSearch, searchInfo.params]);

  const showDataHandler = () => {
    const array = searchInfo.isSearch ? postState : postData;
    if (searchInfo.isSearch && array.length === 0) {
      popuprHandler({ message: "검색 결과가 존재 하지 않습니다." });
      return null;
    }

    return array.map((item: FirebaseData, index: number) => {
      return <Item item={item} index={index} key={index} />;
    });
  };
  // 게시글 랜더링 함수

  return (
    <>
      <div className="post_section" css={SectionStyle}>
        {showDataHandler()}
      </div>
      <div className="add_button_wrap" css={addButton}>
        <CommonButton theme="none" onClick={() => setEditMode(false)}>
          <Link href="/edit">
            <Image
              src="/images/add.svg"
              width={60}
              height={60}
              alt="edit 버튼"
            />
          </Link>
        </CommonButton>
      </div>
    </>
  );
};

export default MainPage;
