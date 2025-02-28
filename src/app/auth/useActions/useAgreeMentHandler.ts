import { useEffect, useRef, useState } from "react";

type propsType = {
  disableHandler: (value: boolean) => void;
  itemLength: number;
};

export const useAgreeMentHandler = ({
  disableHandler,
  itemLength,
}: propsType) => {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const [allChecked, setAllChecked] = useState(false);

  const allCheckHandler = (checked: boolean) => {
    setCheckedItems((prev) => Array(prev.length).fill(checked));
  };

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(itemLength).fill(false)
  );

  const handleItemChange = (index: number) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  useEffect(() => {
    if (checkboxRef.current) {
      // 전체 체크박스 상태 변경 함수
      if (checkedItems.every((item) => item)) {
        checkboxRef.current.checked = true;
        setAllChecked(true);
        // checkedItem이 전부 true 일 때
      } else {
        checkboxRef.current.checked = false;
        setAllChecked(false);
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
    } else {
      return;
    }
  }, [checkedItems, checkboxRef]);

  return {
    allChecked,
    checkedItems,
    checkboxRef,
    allCheckHandler,
    handleItemChange,
  };
};
