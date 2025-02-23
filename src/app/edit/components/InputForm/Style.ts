import { css } from "@emotion/react";

export const Form = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--gap-large);
`;

export const TextArea = css`
  width: 100%;
  outline: 0;
  border: 0;
  text-indent: 7px;
  font-size: 18px;
  border: 1px solid #eee;
  box-sizing: border-box;
  min-height: 600px;
  position: relative;
  cursor: inherit;
  resize: none;
  overflow: hidden;
  padding: var(--gap-medium) 0 0 Calc(var(--gap-small) * 0.5);
`;
