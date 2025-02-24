import useCashQueryHook from "@/apis/market/query/useGetCashQuery";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import { popuprHandler } from "@/utils/popupHandler";
import React, { ChangeEvent, forwardRef, useState } from "react";

const PriortyChecker = forwardRef<HTMLInputElement>((_, ref) => {
  const { cashData } = useCashQueryHook(); // cashData를 반환하도록 수정

  const [checked, setChecked] = useState(false);

  const isCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!cashData.item) {
      // cashData를 사용
      popuprHandler({
        message: "아이템을 보유하고 있지 않습니다, 구매하러 가시겠습니까?",
        type: "confirm",
      });
      e.target.checked = false;
    }
  };

  return (
    <div
      className="use__item flex-Set"
      style={{ justifyContent: "flex-start", gap: 8 }}
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

PriortyChecker.displayName = "PriortyChecker";

export default PriortyChecker;
