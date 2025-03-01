/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import CommonButton from "../CommonButton/CommonButton";
import { usePopupStore } from "@/store/popupStore";
import {
  darkLayer,
  flexDirection,
  fullscreen,
  textStyle,
  whiteBox,
  whiteBoxWrapper,
} from "./Style";

type propsType = {
  type?: "alert" | string;
  width?: number | string;
  height?: number | string;
  textAlign?: "left" | "center";
  children?: ReactNode;
};

const CommonPopup = ({
  type = "alert",
  width = "25rem;",
  height = "auto;",
  textAlign = "left",
  children,
}: propsType) => {
  const { message, setMessage } = usePopupStore();

  const defaultPopupType = type === "alert";

  return (
    <>
      <div
        className="popup"
        data-testid="popup-test"
        data-cy="popup-test"
        css={[fullscreen, darkLayer]}
      ></div>
      <div css={[fullscreen, whiteBoxWrapper]}>
        <div css={[whiteBox(width, height), flexDirection]}>
          <p css={textStyle(textAlign)}>{message}</p>
          {defaultPopupType ? (
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
