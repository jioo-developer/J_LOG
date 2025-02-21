import CommonCheckbox from "@/components/atoms/CommonCheckbox/CommonCheckbox";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const authData = [
  { id: "auth", text: "회원가입 및 운영약관 동의", important: true },
  { id: "data", text: "개인정보 수집 및 동의", important: true },
  { id: "location", text: "위치정보 이용약관 동의", important: false },
];

type propsType = {
  disableHandler: Dispatch<SetStateAction<boolean>>;
};

function AgreementForm({ disableHandler }: propsType) {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  // 전체동의 체크박스 ref
  const [allCheck, setAllCheck] = useState(false);
  // 전체 체크박스 관련 상태들

  const allCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedItems((prev) => Array(prev.length).fill(e.target.checked));
  };
  // (개별) 전체동의 클릭시 체크박스 상태 변경 함수

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(authData.length).fill(false) // 들어오는 개수에 따라 boolean 추가
  ); // 개별 체크박스 상태

  const handleItemChange = (index: number) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };
  // 개별 체크박스 상태 변경 함수

  // 전체동의 & 개별동의 연결 useEffct

  useEffect(() => {
    if (checkboxRef.current) {
      // 전체 체크박스 상태 변경 함수
      if (checkedItems.every((item) => item)) {
        checkboxRef.current.checked = true;
        setAllCheck(true);
        // checkedItem이 전부 true 일 때
      } else {
        checkboxRef.current.checked = false;
        setAllCheck(false);
        // checkedItem이 전부 false 일 때
      }
      // 전체 체크박스 상태 변경 함수

      // 필수 활성화 상태 = disable 제어
      if (checkedItems[0] && checkedItems[1]) {
        disableHandler(false);
      } else {
        disableHandler(true);
      }
      // 필수 활성화 상태 = disable 제어
    } else return;
  }, [checkedItems, checkboxRef]);

  // 전체동의 & 개별동의 연결 useEffct

  return (
    <div className="check__Wrap">
      <input
        type="checkbox"
        id="allCheck"
        data-testid="allCheck_button"
        ref={checkboxRef}
        onChange={(e) => allCheckHandler(e)}
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
        <CommonCheckbox stateValue={allCheck} setStateHandler={setAllCheck} />
        <p>전체 동의</p>
      </label>

      <div className="check__items_Wrap">
        {authData.map((item, index) => {
          return (
            <div key={item.id} className="check__item flex-Set">
              <CommonCheckbox
                key={item.id}
                testId={item.id}
                stateValue={checkedItems[index]}
                setStateHandler={() => handleItemChange(index)}
              />
              <p
                className={
                  item.important ? "check_desc important-Mark" : "check_desc"
                }
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AgreementForm;
