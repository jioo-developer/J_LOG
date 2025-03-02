/** @jsxImportSource @emotion/react */
"use client";
import { useSearchStore } from "@/store/searchStore";
import useSearchEffect from "./useActions/useSearchEffect";
import ItemList from "./component/ItemList";
import AddButton from "./component/AddPostButton";
import { SectionStyle } from "./style";

const MainPage = () => {
  const { searchText } = useSearchStore();

  // 데이터 필터링 및 상태 관리 훅
  const { filteredData } = useSearchEffect(searchText);

  return (
    <>
      <div className="post_section" css={SectionStyle}>
        <ItemList items={filteredData} />
      </div>
      <AddButton />
    </>
  );
};

export default MainPage;
