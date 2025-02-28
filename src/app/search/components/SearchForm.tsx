import { inputStyle } from "@/components/atoms/CommonInput/CommonInputStyle";
import useSearchHandler from "../useActions/useSearchHandler";

export default function SearchForm() {
  const { value, setValue, keydownHandler } = useSearchHandler();
  return (
    <input
      value={value}
      placeholder="검색어를 입력하세요"
      css={inputStyle}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={keydownHandler}
    />
  );
}
