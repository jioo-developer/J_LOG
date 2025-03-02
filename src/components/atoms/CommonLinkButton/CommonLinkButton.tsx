/** @jsxImportSource @emotion/react */
import { buttonVariants, themes } from "./style";
import { ReactNode } from "react";

export interface CommonLinkButtonProps {
  children: ReactNode;
  size?: "sm" | "rg" | "md" | "lg";
  theme?: "white" | "success" | "primary" | "disable" | "warnning" | "none";
  padding?: "none" | "";
  testId?: string;
  onClick?: () => void;
  className?: string;
}

function CommonLinkButton({
  children,
  onClick,
  size = "rg",
  theme = "none",
  testId,
  padding = "",
  className = "",
}: CommonLinkButtonProps) {
  return (
    <div
      className={padding === "none" ? "no-padding" : undefined}
      data-testid={testId}
      data-cy={testId}
      css={[themes[theme], buttonVariants[size]]}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default CommonLinkButton;
