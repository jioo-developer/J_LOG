import { useState, useEffect, useMemo } from "react";
import { popuprHandler } from "@/utils/popupHandler";
import { FirebaseData } from "@/static/types/common";
import { filterDataHandler } from "./filterAction";
import isEqual from "lodash/isEqual";

const useSearchEffect = (postData: FirebaseData[], searchText: string) => {
  const [filteredData, setFilteredData] = useState<FirebaseData[]>([]);

  // 🔄 searchInfo를 useMemo로 메모이제이션
  const { params, isSearch } = useMemo(
    () => ({
      params: searchText,
      isSearch: !!searchText,
    }),
    [searchText]
  );
  console.log(params);
  console.log(isSearch);

  useEffect(() => {
    let result: FirebaseData[];

    if (isSearch) {
      result = filterDataHandler(postData, params);
    } else {
      result = postData;
    }

    if (isSearch && result.length === 0) {
      popuprHandler({ message: "검색 결과가 존재하지 않습니다." });
    }

    // 🔄 상태가 변할 때만 setState 호출
    if (!isEqual(result, filteredData)) {
      setFilteredData(result);
    }
  }, [params, isSearch, postData, filteredData]);

  return { filteredData };
};

export default useSearchEffect;
