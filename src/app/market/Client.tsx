import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Item from "./component/Item";
import useCashMutation from "@/service/market/useSetCashHook";
import { useState } from "react";
import useCashQueryHook from "@/service/market/useGetCashHook";
import { convertPrice } from "@/utils/convertPrice";

const ItemStore = () => {
  const { CashData } = useCashQueryHook();
  const getData = CashData[0];
  const [value, setValue] = useState(0);

  const getItem = (val: number) => {
    return setValue(val);
  };

  const buying = async () => {
    const money = getData.cash;
    const cash = money - value * 2500;
    const length = getData.item + value;
    await mutation.mutateAsync({ cash, item: length });
  };

  const mutation = useCashMutation();
  return (
    <div>
      <div className="item_area">
        {[1, 5, 10].map((item) => {
          return <Item value={item} key={item} setItem={getItem} />;
        })}
      </div>
      <div className="flex-box">
        <p>현재 포인트 :{getData ? convertPrice(getData.cash) : 0} +</p>
        <div>
          <CommonButton theme="white">취소</CommonButton>
          <CommonButton theme="success" onClick={() => buying()}>
            확인
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default ItemStore;
