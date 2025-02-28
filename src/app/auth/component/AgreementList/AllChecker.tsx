import React, { ChangeEvent, forwardRef } from "react";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";

type propsType = {
  checked: boolean;
  checkHandler: (checked: boolean) => void;
};

const AllChecker = forwardRef<HTMLInputElement, propsType>(
  ({ checked, checkHandler }, ref) => {
    return (
      <>
        <input
          type="checkbox"
          id="allCheck"
          data-testid="allCheck_button"
          ref={ref}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            checkHandler(e.target.checked)
          }
        />
        <label
          htmlFor="allCheck"
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName !== "INPUT") {
              e.stopPropagation(); // 이벤트 버블링을 막음
            }
          }}
        >
          <CommonCheckbox stateValue={checked} setStateHandler={checkHandler} />
          <p>전체 동의</p>
        </label>
      </>
    );
  }
);

AllChecker.displayName = "AllChecker";

export default AllChecker;
