import { Dispatch, SetStateAction } from "react";
import { useAgreeMentHandler } from "../../useActions/useAgreeMentHandler";
import AllChecker from "./AllChecker";
import AgreementItem from "./AgreementItem";

const authData = [
  { index: 0, id: "auth", text: "회원가입 및 운영약관 동의", important: true },
  { index: 1, id: "data", text: "개인정보 수집 및 동의", important: true },
  {
    index: 2,
    id: "location",
    text: "위치정보 이용약관 동의",
    important: false,
  },
];

type propsType = {
  disableHandler: Dispatch<SetStateAction<boolean>>;
};

function AgreementList({ disableHandler }: propsType) {
  const {
    checkboxRef,
    checkedItems,
    allCheckHandler,
    allChecked,
    handleItemChange,
  } = useAgreeMentHandler({
    disableHandler,
    itemLength: authData.length,
  });

  return (
    <div className="check__Wrap">
      {/* 전체 동의 체크박스 */}
      <AllChecker
        ref={checkboxRef}
        checked={allChecked}
        checkHandler={allCheckHandler}
      />
      {/* 개별 체크박스 */}
      <div className="check__items_Wrap">
        {authData.map((item, index) => (
          <AgreementItem
            key={item.id}
            item={item}
            index={item.index}
            isChecked={checkedItems[index]}
            onChange={() => handleItemChange(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default AgreementList;
