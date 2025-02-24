import { css } from "@emotion/react";

export const wrap = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
`;

export const Style = css`
  width: 28rem;
  height: auto;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 8px;
  padding: 2rem;
  display: flex;
  box-sizing: border-box;
  border-radius: 4px;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--gap-medium);

  @media all and (max-width: 440px) {
    width: 95%;
  }

  .label__area {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: var(--gap-large);
    span {
      width: 100%;
      text-align: left;
      font-size: 1.125rem;
      margin: 0px;
      color: rgb(61, 61, 62);
    }
  }
`;