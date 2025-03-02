/** @jsxImportSource @emotion/react */
import { buttonVariants, themes } from "./CommonButtonStyle";
import { ButtonHTMLAttributes, ReactNode } from "react";

export interface CommonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "rg" | "md" | "lg";
  theme: "white" | "success" | "primary" | "disable" | "warnning" | "none";
  padding?: "none";
  testId?: string;
}

function CommonButton({
  children,
  onClick,
  disabled = false,
  size = "rg",
  theme,
  type,
  padding,
  testId,
}: CommonButtonProps) {
  return (
    <button
      className={padding === "none" ? "no-padding" : undefined}
      data-testid={testId}
      data-cy={testId}
      disabled={disabled}
      css={[themes[theme], buttonVariants[size]]}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default CommonButton;
