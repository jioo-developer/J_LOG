/** @jsxImportSource @emotion/react */
"use client";
import { inputStyle } from "@/components/atoms/CommonInput/CommonInputStyle";
<<<<<<< HEAD
import { useSearchStore } from "@/store/common";
=======
import { useSearchStore } from "@/store/searchStore";
>>>>>>> d333fc1963018e3847176f94d92528819df0a49d
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    height: 100px;
    margin-top: Calc(var(--gap-xlarge) * 2);
    border-radius: 0;
    text-indent: 20px !important;
    outline: none;
    font-size: Calc(var(--fontsize-large) * 1.5);

    &::placeholder {
      font-size: Calc(var(--fontsize-large) * 1.5);
    }
  }
`;
