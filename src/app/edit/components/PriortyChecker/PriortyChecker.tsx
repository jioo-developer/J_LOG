import useCashQueryHook from "@/apis/market/query/useGetCashQuery";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import { popuprHandler } from "@/utils/popupHandler";
import React, { ChangeEvent, forwardRef, useState } from "react";

const PriortyChecker = forwardRef<HTMLInputElement>((_, ref) => {
  const { CashData } = useCashQueryHook();
  const [checked, setChecked] = useState(false);
  const isCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!CashData[0].item) {
      popuprHandler({
        message: "아이템을 보유 하고 있지 않습니다, 구매하러 가시겠습니까?",
        type: "confirm",
      });
      e.target.checked = false;
    }
  };

  return (
    <div
      className="use__item flex-Set"
      style={{ justifyContent: "flex-start" }}
    >
      <input
        ref={ref}
        type="checkbox"
        className="eachCheckbox"
        id="use__Check"
        onChange={(e) => {
          isCheckHandler(e);
        }}
      />
      <CommonCheckbox stateValue={checked} setStateHandler={setChecked} />
      <label htmlFor="use__Check" className="check">
        <p>노출 우선권 사용하기</p>
      </label>
    </div>
  );
});

export default PriortyChecker;
