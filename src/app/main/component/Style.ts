import { css } from "@emotion/react";

export const postItemStyle = css`
  display: flex;
  width: 20rem;
  height: auto;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 4px var(--gap-medium) 0 rgba(0, 0, 0, 0.05);
  margin: var(--gap-medium);
  position: relative;
  transition-duration: 0.35s;
  bottom: 0;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    bottom: 10px;
    box-shadow: 0 4px 16px 0 $hoverRgb;
  }

  &:nth-of-type(1) {
    margin-left: 0;
  }

  @media all and (max-width: 1000px) {
    width: 100%;
  }

  .thumbnail {
    width: 100%;
    height: 180px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    display: flex;

    img {
      width: 100%;
    }
  }

  .text_wrap {
    display: flex;
    flex-direction: column;
    gap: var(--gap-medium);
    padding: var(--gap-medium);
    height: 150px;
    box-sizing: border-box;
    position: relative;

    .post_title {
      font-weight: 500;
    }

    .post_text {
      font-weight: 300;
      height: 65px;
      color: #333;
      margin-top: 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }

    .post_date {
      font-size: Calc(var(--fontsize-small) * 1.2);
      color: gray;
      bottom: var(--gap-medium);
    }
  }
`;

export const writeWrap = css`
    justify-content: space-between;
    border-top: 1px solid #eee;
    box-sizing: border-box;
    padding: var(--gap-medium);
    .id {
      display: flex;
      align-items: center;

      img {
        width: 24px;
        height: 24px;
        margin-right: var(--gap-small);
      }

      .profile_id {
        font-size: var(--fontsize-small);
        line-height: 1;
      }
    }

    .favorite {
      font-size: var(--fontsize-small);
      line-height: 1;
      cursor: pointer;
    }
  }

  .new-post {
    position: fixed;
    bottom: Calc(var(--gap-xlarge) * 2.5);
    right: Calc(var(--gap-xlarge) * 1.8);
    width: 57px;
    transition-duration: 0.4s;

    &:hover {
      bottom: Calc(var(--gap-xlarge) * 3.3);
    }

    @media all and (max-width: 1000px) {
      width: 50px;
      bottom: Calc(var(--gap-xlarge) * 2);
      right: 10px;
      z-index: 1000;
    }

    img {
      width: 100%;
    }
`;
