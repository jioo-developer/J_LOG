import { css } from "@emotion/react";

export const HeaderStyle = css`
  width: 95%;
  min-height: 40px;
  justify-content: space-between;
  padding-top: var(--gap-xlarge);
  margin: 0 auto;

  .title {
    font-size: 24px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  /* input이 체크된 상태일 때 */
  label:has(input:checked) ~ .sub_menu {
    visibility: visible;
  }

  label:has(input:checked) ~ .sub_menu li {
    height: 30px;
  }

  /* input이 체크되지 않은 상태일 때 */
  label:has(input:not(:checked)) ~ .sub_menu {
    visibility: hidden;
  }

  label:has(input:not(:checked)) ~ .sub_menu li {
    height: 0;
  }
`;

export const UIWrap = css`
  display: flex;
  align-items: center;
  gap: Calc(var(--gap-xlarge) * 2);

  button {
    padding: 0;
  }
`;

export const SubMenu = css`
  width: 100px;
  flex-direction: column;
  position: absolute;
  right: Calc(var(--gap-xlarge) * 2);
  top: 80px;
  background: #fff;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
  visibility: hidden;

  @media all and (max-width: 960px) {
    right: 10px;
  }

  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0;
    text-align: center;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;

    a {
      display: block;
      width: 100%;
    }
  }
`;

export const GoPoster = css`
  padding: 0 16px;
  font-size: 20px;
  border-radius: 18px;
  border: 1px solid #000;
`;
