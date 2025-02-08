import { css } from "@emotion/react";

export const NameWrap = css`
  width: 100%;
  .name_area {
    display: flex;
    flex-direction: column;
    padding-left: var(--gap-xlarge);

    @media all and (max-width: 1000px) {
      padding-left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: calc(var(--gap-xlarge) / 2);
      width: 100%;
    }

    .nickname {
      font-size: calc(var(--fontsize-large) * 2.5);
    }
  }
`;

export const FormEditorButton = css`
  width: 120px;
  button {
    padding: 5px;
    justify-content: flex-start;
    color: #12b886;
    text-decoration: underline;
  }
`;
