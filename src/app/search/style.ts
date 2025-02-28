import { css } from "@emotion/react";

export const InputWrap = css`
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
  & > input {
    height: 100px;
    margin-top: Calc(var(--gap-xlarge) * 2);
    border-radius: 0;
    text-indent: 20px !important;
    outline: none;
    font-size: Calc(var(--fontsize-large) * 1.5);

    &::placeholder {
      font-size: Calc(var(--fontsize-large) * 1.5);
    }
  }
`;
