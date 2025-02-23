import { Story } from "@/static/types/common";
import CommonCheckbox, { PropsType } from "./CommonCheckbox";

export default {
  title: "Components/CommonCheckbox",
  component: CommonCheckbox,
  tags: ["autodocs"],
  argTypes: {
    stateValue: {
      control: "boolean",
    },
    setStateHanlder: { action: "toggled" },
  },
};
export const Default: Story<PropsType> = {
  args: {
    stateValue: false,
  },
};
