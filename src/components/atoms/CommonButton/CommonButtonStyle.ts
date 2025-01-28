import { css } from "@emotion/react";

export const themes = {
  white: css`
    background: transparent;
    color: var(--mainTextcolor);
    border: 1px solid #d1d1d1;
    box-sizing: border-box;
  `,
  success: css`
    background: var(--pointTextcolor);
    color: var(--whiteColor);
  `,
  primary: css`
    background: #2a96ee;
    color: var(--whiteColor);
  `,
  none: css`
    background: transparent;
    color: var(--mainTextcolor);
    border: 0;
  `,
};

// (독립) 버튼 테마 설정

export const baseButton = css`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-sizing: border-box;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;

// 기반이 되는 기본 default style

export const buttonVariants = {
  sm: css`
    ${baseButton};
    font-size: 12px;
    padding: 0.666em 1em;
  `,
  rg: css`
    ${baseButton};
    font-size: 16px;
    padding: 0.75em 1em;
  `,
  md: css`
    ${baseButton};
    font-size: 18px;
    padding: 0.888em 1.5em;
  `,
  lg: css`
    ${baseButton};
    font-size: 20px;
    padding: 1.2em 1.6em;
  `,
};

// 버튼 사이즈 설정
