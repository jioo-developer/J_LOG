/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { buttonVariants, themes } from "./CommonButtonStyle";
import { ReactNode } from "react";
interface CommonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "rg" | "md" | "lg";
  theme: "white" | "success" | "primary" | "none";
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
