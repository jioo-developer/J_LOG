import { css } from "@emotion/react";

export const wrap = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

export const Style = css`
  width: 28rem;
  margin: 0 auto;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 8px;
  padding: 2rem;
  display: flex;
  box-sizing: border-box;
  border-radius: 4px;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--gap-medium);

  @media all and (max-width: 500px) {
    width: 90%;
  }

  .item_area {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  span {
    width: 100%;
    text-align: left;
    font-size: 1.125rem;
    margin: 0px;
    color: rgb(61, 61, 62);
  }

  .button__group {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`;
