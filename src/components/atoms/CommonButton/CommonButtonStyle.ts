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
  disable: css`
    background: gray;
    color: var(--whiteColor);
  `,
  warnning: css`
    background: rgb(255, 135, 135);
    color: var(--whiteColor);
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
`;

// 기반이 되는 기본 default style

export const buttonVariants = {
  sm: css`
    ${baseButton};
    font-size: var(--fontsize-small);
    padding: 0.666em 1em;
  `,
  rg: css`
    ${baseButton};
    font-size: var(--fontsize-regular);
    padding: 0.75em 1em;
  `,
  md: css`
    ${baseButton};
    font-size: var(--fontsize-medium);
    padding: 0.888em 1.5em;
  `,
  lg: css`
    ${baseButton};
    font-size: var(--fontsize-large);
    padding: 1.2em 1.6em;
  `,
};

// 버튼 사이즈 설정
