/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";
import CommonButton from "../CommonButton/CommonButton";
import { usePopupStore } from "@/store/popupStore";
import {
  darkLayer,
  flexDirection,
  fullscreen,
  whiteBox,
  whiteBoxWrapper,
} from "./Style";

type propsType = {
  type?: "alert" | string;
  top?: boolean;
  width?: number | string;
  height?: number | string;
  textAlign?: "left" | "center";
  subText?: string;
  children?: ReactNode;
  customText?: string;
};

const CommonPopup = ({
  type = "alert",
  width = "25rem;",
  height = "auto;",
  top = false,
  textAlign = "left",
  subText,
  children,
  customText = "",
}: propsType) => {
  const { message, setMessage } = usePopupStore();

  return (
    <>
      <div
        className="popup"
        data-testid="popup-test"
        data-cy="popup-test"
        css={[fullscreen, darkLayer]}
      ></div>
      <div css={[fullscreen, whiteBoxWrapper, top && { position: "relative" }]}>
        <div css={[whiteBox(width, height), flexDirection]}>
          <p
            css={css`
              margin-bottom: 1.5rem !important;
              text-align: ${textAlign} !important;
              font-weight: bold;
            `}
          >
            {customText === "" ? message : customText}
          </p>
          {subText && (
            <p
              css={css`
                margin-bottom: 1.5rem !important;
                font-size: 16px !important;
                text-align: ${textAlign} !important;
              `}
            >
              {subText}
            </p>
          )}
          {type === "alert" ? (
            <CommonButton theme="success" onClick={() => setMessage("")}>
              확인
            </CommonButton>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
};

export default CommonPopup;
