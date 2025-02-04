/** @jsxImportSource @emotion/react */
"use client";
import { inputStyle } from "@/components/atoms/CommonInput/CommonInputStyle";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  function goSearch() {
    // router.push("/");
    console.log("실행");
    // searchStore.setState({ searchText: search });
  }

  function keydownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      goSearch();
    }
  }

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div className="is__white_bg" css={InputWrap}>
      <input
        placeholder="검색어를 입력하세요"
        css={inputStyle}
        onChange={(e) => setSearch(e.target.value)}
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
