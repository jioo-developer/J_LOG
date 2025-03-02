import useCashQueryHook from "@/apis/market/query/useGetCashQuery";
import { useEditDetailStore } from "@/app/updateEditor/store";
import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import { usePopupStore } from "@/store/popupStore";
import { popuprHandler } from "@/utils/popupHandler";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, forwardRef, useEffect, useState } from "react";

const PriortyChecker = forwardRef<HTMLInputElement>((_, ref) => {
  const router = useRouter();
  const [checkedState, setChecked] = useState(false);

  const { cashData } = useCashQueryHook(); // cashData를 반환하도록 수정
  const getCash = Array.isArray(cashData) ? cashData[0] : cashData;

  const { setMessage } = usePopupStore();

  const { checked } = useEditDetailStore();

  useEffect(() => {
    if (checked) setChecked(checked);
  }, [checked]);

  const handleCallback = () => {
    router.push("/member/mypage");
    setMessage("");
  };

  const isCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (cashData && getCash.item === 0) {
      // cashData를 사용
      popuprHandler({
        message: "아이템을 보유하고 있지 않습니다, 구매하러 가시겠습니까?",
        type: "confirm",
        callback: () => handleCallback(),
      });
      setChecked(false);
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
      <label
        htmlFor="use__Check"
        className="check flex-Set"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName !== "INPUT") {
            e.stopPropagation(); // 이벤트 버블링을 막음
          }
        }}
      >
        <CommonCheckbox
          stateValue={checkedState}
          setStateHandler={setChecked}
        />
        <p>&nbsp;노출 우선권 사용하기</p>
      </label>
    </div>
  );
});

PriortyChecker.displayName = "PriortyChecker";

export default PriortyChecker;
