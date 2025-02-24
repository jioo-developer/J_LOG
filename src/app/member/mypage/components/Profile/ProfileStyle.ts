import { css } from "@emotion/react";

export const ImageWrap = css`
  width: 25%;
  flex-direction: column;
  border-right: 1px solid #eee;
  padding-right: var(--gap-xlarge);
  box-sizing: border-box;
  gap: var(--gap-xlarge) calc(var(--gap-xlarge) / 2);

  @media all and (max-width: 1000px) {
    width: 100%;
    border: 0;
    padding: 0;
  }

  input[type="file"] {
    display: none;
  }

  .uploads {
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
`;

export const ProfileImage = css`
  width: 130px;
  cursor: pointer;
`;
