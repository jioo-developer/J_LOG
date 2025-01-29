"use client";

import { ReactNode } from "react";

export type propsType = {
  childrens: ReactNode[];
  stateValue: boolean;
  setStateHanlder: (stateValue: boolean) => void;
};

function CommonCheckbox({ childrens, stateValue, setStateHanlder }: propsType) {
  return (
    <button
      type="button"
      className="check__toggle"
      onClick={() => setStateHanlder(!stateValue)}
    >
      {stateValue ? childrens[0] : childrens[1]}
    </button>
  );
}

export default CommonCheckbox;
