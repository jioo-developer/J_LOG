/** @jsxImportSource @emotion/react */
"use client";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Item from "./component/Item";
import useCashMutation from "@/apis/market/useMutation";
import { useState } from "react";
import { convertPrice } from "@/utils/convertPrice";
import { useRouter } from "next/navigation";
import useCashQueryHook from "@/apis/market/query/useGetCashQuery";
import { Style, wrap } from "./style";

const MarketPage = () => {
  const router = useRouter();
  const { cashData } = useCashQueryHook();

  const [value, setValue] = useState(0);

  const getItem = (val: number) => {
    return setValue(val);
  };

  const mutation = useCashMutation();

  const buying = async () => {
    const money = cashData.cash;
    const cash = money - value * 2500;
    const length = cashData.item + value;
    await mutation.mutateAsync({ cash, item: length });
  };

  return (
    <div css={wrap} className="flex-Set">
      <div css={Style}>
        <div className="item_area">
          {[1, 5, 10].map((item) => {
            return <Item value={item} key={item} setItem={getItem} />;
          })}
        </div>
        <span>
          현재 포인트 :&nbsp;{cashData ? convertPrice(cashData.cash) : 0} +
        </span>
        <div className="button__group">
          <CommonButton theme="white" onClick={() => router.back()}>
            취소
          </CommonButton>
          <CommonButton theme="success" onClick={buying}>
            확인
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;

