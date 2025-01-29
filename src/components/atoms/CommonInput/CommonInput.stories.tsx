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
