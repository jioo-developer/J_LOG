import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CommonPopup from "./CommonPopup";
import { usePopupStore } from "@/store/popupStore";
import CommonButton from "../CommonButton/CommonButton";

// Storybook metadata
const meta: Meta<typeof CommonPopup> = {
  title: "Components/CommonPopup",
  component: CommonPopup,
  argTypes: {
    type: {
      control: { type: "select", options: ["alert", "custom"] },
    },
    textAlign: {
      control: { type: "select", options: ["left", "center"] },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CommonPopup>;

// Default story
export const Default: Story = {
  args: {
    type: "alert",
    width: "25rem",
    height: "auto",
    textAlign: "left",
    subText: "This is a subtext example",
  },
  render: (args) => {
    const { setMessage } = usePopupStore();

    return (
      <CommonPopup {...args}>
        <CommonButton theme="success" onClick={() => setMessage("")}>
          Close
        </CommonButton>
      </CommonPopup>
    );
  },
};

// Alert story
export const Alert: Story = {
  args: {
    type: "alert",
    width: "30rem",
    height: "auto",
    textAlign: "center",
    subText: "Alert Popup Example",
    customText: "This is an alert message",
  },
  render: (args) => {
    const { setMessage } = usePopupStore();

    return (
      <CommonPopup {...args}>
        <CommonButton theme="success" onClick={() => setMessage("")}>
          Close
        </CommonButton>
      </CommonPopup>
    );
  },
};

// Custom content story
export const Custom: Story = {
  args: {
    type: "custom",
    width: "35rem",
    height: "auto",
    textAlign: "center",
    subText: "Custom Popup Content",
  },
  render: (args) => {
    const { setMessage } = usePopupStore();

    return (
      <CommonPopup {...args}>
        <CommonButton theme="success" onClick={() => setMessage("")}>
          Close
        </CommonButton>
      </CommonPopup>
    );
  },
};
