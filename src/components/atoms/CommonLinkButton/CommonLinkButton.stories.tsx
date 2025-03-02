import { Story } from "@/static/types/common";
import CommonLinkButton, { CommonLinkButtonProps } from "./CommonLinkButton";
export default {
  title: "Components/CommonButton",
  component: CommonLinkButton,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["white", "success", "primary", "disable", "warnning", "none"],
    },
    size: {
      control: "select",
      options: ["sm", "rg", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export const Default: Story<CommonLinkButtonProps> = {
  args: {
    theme: "primary",
    size: "md",
  },
};

export const Active: Story<CommonLinkButtonProps> = {
  args: {
    theme: "primary",
    size: "md",
  },
};

export const Success: Story<CommonLinkButtonProps> = {
  args: {
    theme: "success",
    size: "lg",
  },
};

export const White: Story<CommonLinkButtonProps> = {
  args: {
    theme: "white",
    size: "sm",
  },
};

export const Disabled: Story<CommonLinkButtonProps> = {
  args: {
    theme: "disable",
    size: "sm",
  },
};

export const Warnning: Story<CommonLinkButtonProps> = {
  args: {
    theme: "warnning",
    size: "sm",
  },
};
