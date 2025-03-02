/** @jsxImportSource @emotion/react */
"use client";
import SearchForm from "./components/SearchForm";
import { InputWrap } from "./style";

const SearchPage = () => {
  return (
    <div className="is__white_bg" css={InputWrap}>
      <SearchForm />
    </div>
  );
};

export default SearchPage;
