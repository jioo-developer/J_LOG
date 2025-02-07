import { Story } from "@/components/type";
import CommonButton, { CommonButtonProps } from "./CommonButton";
export default {
  title: "Components/CommonButton",
  component: CommonButton,
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

export const Default: Story<CommonButtonProps> = {
  args: {
    theme: "primary",
    size: "md",
    disabled: false,
  },
};

export const active: Story<CommonButtonProps> = {
  args: {
    theme: "primary",
    size: "md",
    disabled: true,
  },
};

export const Success: Story<CommonButtonProps> = {
  args: {
    theme: "success",
    size: "lg",
  },
};

export const White: Story<CommonButtonProps> = {
  args: {
    theme: "white",
    size: "sm",
  },
};

export const Disabled: Story<CommonButtonProps> = {
  args: {
    theme: "disable",
    size: "sm",
  },
};

export const warnning: Story<CommonButtonProps> = {
  args: {
    theme: "warnning",
    size: "sm",
  },
};
