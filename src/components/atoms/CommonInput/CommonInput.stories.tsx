import { Story } from "@/components/type";
import CommonInput, { CommonInputProps } from "./CommonInput";
import { FieldValues, Path } from "react-hook-form";

export default {
  title: "Components/CommonInput",
  component: CommonInput,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "number", "email", "password"],
    },
    placeholder: {
      control: "text",
    },
    value: {
      control: "text",
    },
    error: {
      control: "object",
    },
  },
};

export const Default: Story<CommonInputProps<FieldValues>> = {
  args: {
    id: "default" as Path<FieldValues>,
    type: "text",
    placeholder: "Enter text...",
    value: "",
  },
};

export const EmailInput: Story<CommonInputProps<FieldValues>> = {
  args: {
    id: "email" as Path<FieldValues>,
    type: "email",
    placeholder: "이메일을 입력하세요",
    value: "",
    validation: {
      required: "이메일을 입력해야 합니다.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "올바른 이메일 형식이 아닙니다.",
      },
    },
  },
};

export const PasswordInput: Story<CommonInputProps<FieldValues>> = {
  args: {
    id: "password" as Path<FieldValues>,
    type: "password",
    placeholder: "비밀번호를 입력하세요",
    value: "",
    validation: {
      required: "비밀번호를 입력해야 합니다.",
      minLength: {
        value: 8,
        message: "비밀번호는 최소 8자 이상이어야 합니다.",
      },
    },
  },
};
