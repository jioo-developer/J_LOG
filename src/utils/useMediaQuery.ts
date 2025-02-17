import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // 브라우저에서 media query 체크
    const media = window.matchMedia(query);

    // 상태를 초기화
    const listener = () => setMatches(media.matches);
    listener(); // init

    // 이벤트 리스너 추가
    media.addEventListener("change", listener);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      media.removeEventListener("change", listener);
    };
  }, [query]); // query가 변경될 때마다 다시 실행

  return matches; // true or false 반환
};

export default useMediaQuery;
