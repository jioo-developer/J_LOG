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
}

function CommonButton({
  children,
  onClick,
  disabled = false,
  size = "md",
  theme,
  type,
}: CommonButtonProps) {
  return (
    <button
      disabled={disabled}
      css={[themes[theme], buttonVariants[size]]}
      onClick={onClick}
      type={type ? type : "submit"}
    >
      {children}
    </button>
  );
}

export default CommonButton;
