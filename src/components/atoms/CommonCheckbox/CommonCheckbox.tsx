"use client";
import { SquareCheckBigIcon, SquareIcon } from "lucide-react";
import { ReactNode } from "react";

export type PropsType = {
  childrens?: ReactNode[];
  stateValue: boolean;
  setStateHandler: (stateValue: boolean) => void;
};

function CommonCheckbox({ childrens, stateValue, setStateHandler }: PropsType) {
  const renderContent = () => {
    if (childrens) {
      return stateValue ? childrens[0] : childrens[1];
    }
    return stateValue ? (
      <SquareCheckBigIcon key="check-on" size={25} color="gray" />
    ) : (
      <SquareIcon key="check-off" size={25} color="gray" />
    );
  };

  return (
    <button
      type="button"
      className="check__Toggle"
      onClick={() => {
        setStateHandler(!stateValue);
      }}
    >
      {renderContent()}
    </button>
  );
}

export default CommonCheckbox;
