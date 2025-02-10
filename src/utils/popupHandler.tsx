"use client";
import CommonPopup from "@/components/atoms/CommonPopup/CommonPopup";
import ConfirmPopup from "@/components/modules/Popup/Confirm/ConfirmPopup";
import { usePopupStore } from "@/store/popupStore";
import { Dispatch, SetStateAction } from "react";

type popupPropsType = {
  message: string;
  type?: string;
  state?: (params?: any) => void | Dispatch<SetStateAction<string>> | undefined;
};

export function popupInit() {
  usePopupStore.setState({ message: "", isClick: false });
}

const isSetState = (state: any): state is Dispatch<SetStateAction<string>> => {
  return typeof state === "function";
};

export const popuprHandler = ({
  message,
  type = "alert",
  state,
}: popupPropsType) => {
  if (type === "alert") {
    usePopupStore.setState({
      message,
    });
  } else if (type === "confirm") {
    usePopupStore.setState({
      message,
      type,
    });
  } else if (type === "prompt") {
    if (isSetState(state)) {
      usePopupStore.setState({
        message,
        state: state,
        type,
      });
    }
  }
};

export const ReturnPopup = () => {
  const popupMsg = usePopupStore();
  const popupType = popupMsg.type;
  if (popupMsg.message !== "") {
    if (popupType === "alert") {
      return <CommonPopup />;
    } else if (popupType === "confirm") {
      return <ConfirmPopup />;
    } else if (popupType === "prompt") {
      // return <PromptPopup />;
    }
  }
};
