"use client";
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa";
import { ReactNode } from "react";

export type PropsType = {
  childrens?: ReactNode[];
  stateValue: boolean;
  setStateHandler: (stateValue: boolean) => void;
  testId?: string;
};

function CommonCheckbox({
  childrens,
  stateValue,
  setStateHandler,
  testId,
}: PropsType) {
  const renderContent = () => {
    if (childrens) {
      return stateValue ? childrens[0] : childrens[1];
    }
    return stateValue ? (
      <FaRegCheckSquare key="check-on" size={25} color="gray" />
    ) : (
      <FaRegSquare key="check-off" size={25} color="gray" />
    );
  };

  return (
    <button
      type="button"
      className="check__Toggle"
      data-testid={stateValue ? `${testId}-on` : `${testId}-off`}
      style={{ maxHeight: 25 }}
      onClick={() => {
        setStateHandler(!stateValue);
      }}
    >
      {renderContent()}
    </button>
  );
}

export default CommonCheckbox;
