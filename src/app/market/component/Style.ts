import { css } from "@emotion/react";

export const itemStyle = css`
  background: transparent;
  color: var(--mainTextcolor);
  border: 3px solid #d1d1d1;
  box-sizing: border-box;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: #12b886;
    border: 3px solid #12b886;
    p {
      color: #fff;
    }
  }
`;

export const ActiveItem = css`
  ${itemStyle}
  background: #12b886;
  border: 3px solid #12b886;
  p {
    color: #fff;
  }
`;
