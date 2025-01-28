import { css } from "@emotion/react";

export const input = css`
  display: flex;
  width: 100%;
  alignitems: center;
  outline: 0;
  border: 1px solid #eee;
  box-sizing: border-box;
  height: 45px;
  border-radius: 8px;
  text-indent: 10px;
  cursor: auto;

  &::placeholder {
    color: gray;
    font-size: calc(var(--fontsize-small) * 1.2);
  }
`;
