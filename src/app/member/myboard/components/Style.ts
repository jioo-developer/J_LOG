import { css } from "@emotion/react";

export const ArticleWrap = css`
   padding-bottom: calc(--var(--gap-xlarge) * 2.4);
    border-bottom: 1px solid #ddd;
    cursor: pointer;
  }

  figure,
  figcaption {
    width: 100%;
  }

  figure {
    margin: var(--gap-regular) 0;
    overflow: hidden;
  }

  figcaption {
    display: flex;
    flex-direction: column;
    gap: var(--gap-xlarge);
    .caption__bottom {
      width: 100%;
      display: flex;
      gap: var(--gap-regular);
      p {
        font-size: var(--fontsize-regular);
        color: #888;
      }
    }

    .content__title {
      font-size: calc(var(--fontsize-large) * 2.4);
    }
    .content__text {
      font-size: var(--fontsize-regular);
    }
`;
