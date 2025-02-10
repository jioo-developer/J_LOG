import { css } from "@emotion/react";

export const Form = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const TextArea = css`
    .textarea {
      width: 100%;
      outline: 0;
      border: 0;
      text-indent: 7px;
      font-size: 18px;
      border: 1px solid #eee;
      box-sizing: border-box;
      min-height: 600px;
      margin-bottom: 30px;
      padding-top: 15px;
      position: relative;

      .att {
        float: left;
        width: 100%;

        @media all and (max-width: 1000px) {
          width: 90%;
          height: auto;
        }
`;
