/** @jsxImportSource @emotion/react */
"use client";
import { useSearchStore } from "@/store/searchStore";
import useSearchEffect from "./useActions/useSearchEffect";
import ItemList from "./component/ItemList";
import AddButton from "./component/AddPostButton";
import { SectionStyle } from "./style";
import usePostQueryHook from "@/apis/main/query/useGetQuery";

const MainPage = () => {
  const { searchText } = useSearchStore();
  const { postData } = usePostQueryHook();

  // 데이터 필터링 및 상태 관리 훅
  const { filteredData } = useSearchEffect(postData, searchText);

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
