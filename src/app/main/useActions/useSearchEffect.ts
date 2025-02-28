// useSearchEffect.ts
import { useState, useEffect } from "react";
import { popuprHandler } from "@/utils/popupHandler";
import { FirebaseData } from "@/static/types/common";
import usePostQueryHook from "@/apis/main/query/useGetQuery";
import { filterDataHandler } from "./filterAction";

const useSearchEffect = (searchText: string) => {
  const { postData } = usePostQueryHook();
  const [filteredData, setFilteredData] = useState<FirebaseData[]>([]);

  const searchInfo = {
    params: searchText,
    isSearch: !!searchText, // !!는 "" 일때 false를 의미
  };

  useEffect(() => {
    let result: FirebaseData[];

    if (searchInfo.isSearch) {
      result = filterDataHandler(postData, searchInfo.params);
    } else {
      result = postData;
    }

    if (searchInfo.isSearch && result.length === 0) {
      popuprHandler({ message: "검색 결과가 존재하지 않습니다." });
    }

    setFilteredData(result);
    // 필터
  }, [searchInfo.params, postData]);

  return { filteredData };
};

export default useSearchEffect;
