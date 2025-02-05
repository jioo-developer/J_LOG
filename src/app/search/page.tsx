/** @jsxImportSource @emotion/react */
"use client";
import { inputStyle } from "@/components/atoms/CommonInput/CommonInputStyle";
import { useSearchStore } from "@/store/common";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [search, setSearchHandler] = useState("");

  const router = useRouter();

  const { setSearch } = useSearchStore();

  function goSearch() {
    router.push("/");
    setSearch(search);
  }

  function keydownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      goSearch();
    }
  }

  return (
    <div className="is__white_bg" css={InputWrap}>
      <input
        placeholder="검색어를 입력하세요"
        css={inputStyle}
        onChange={(e) => setSearchHandler(e.target.value)}
        onKeyDown={(e) => {
          keydownHandler(e);
        }}
      />
    </div>
  );
};

export default SearchPage;

const InputWrap = css`
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  & > input {
    height: 70px;
    margin-top: Calc(var(--gap-xlarge) * 2);
    border-radius: 0;
    text-indent: 20px !important;
    outline: none;
    &:placehorder {
      font-size: var(--fontsize-large);
    }
  }
`;
