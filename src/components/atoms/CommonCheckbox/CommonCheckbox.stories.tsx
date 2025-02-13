import { Story } from "@/static/types/common";
import CommonCheckbox, { PropsType } from "./CommonCheckbox";
import { BadgeCheck, Badge } from "lucide-react";

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
    childrens: [<BadgeCheck size={20} />, <Badge size={20} color="#888" />],
    stateValue: false,
  },
};
