import { Story } from "@/components/type";
import CommonCheckbox, { propsType } from "./CommonCheckbox";
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
export const Default: Story<propsType> = {
  args: {
    childrens: [<BadgeCheck size={20} />, <Badge size={20} color="#888" />],
    stateValue: false,
  },
};
