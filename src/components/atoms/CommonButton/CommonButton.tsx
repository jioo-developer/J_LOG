/** @jsxImportSource @emotion/react */
import { buttonVariants, themes } from "./CommonButtonStyle";
import { ReactNode } from "react";
export interface CommonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "rg" | "md" | "lg";
  type?: "button" | "submit";
  theme: "white" | "success" | "primary" | "disable" | "warnning" | "none";
  padding?: "none";
}

function CommonButton({
  children,
  onClick,
  disabled = false,
  size = "rg",
  theme,
  type,
  padding,
}: CommonButtonProps) {
  return (
    <button
      disabled={disabled}
      css={[themes[theme], buttonVariants[size]]}
      onClick={onClick}
      type={type ? type : "submit"}
      style={padding && { padding: "0 !important" }}
    >
      {children}
    </button>
  );
}

export default CommonButton;
