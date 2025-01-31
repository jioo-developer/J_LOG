/** @jsxImportSource @emotion/react */
import { buttonVariants, themes } from "./CommonButtonStyle";
import { ReactNode } from "react";
export interface CommonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "rg" | "md" | "lg";
  theme: "white" | "success" | "primary" | "disable" | "none";
}

function CommonButton({
  children,
  onClick,
  disabled = false,
  size = "md",
  theme,
}: CommonButtonProps) {
  return (
    <button
      disabled={disabled}
      css={[themes[theme], buttonVariants[size]]}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CommonButton;
