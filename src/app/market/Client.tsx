/** @jsxImportSource @emotion/react */
"use client";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Item from "./component/Item";
import { convertPrice } from "@/utils/convertPrice";
import { useRouter } from "next/navigation";
import useCashQueryHook from "@/apis/market/query/useGetCashQuery";
import { Style, wrap } from "./style";
import { usePurchaseHandler } from "./useActions/usePurchaseHandler";
import { useState } from "react";

const MarketPage = () => {
  const router = useRouter();
  const { cashData } = useCashQueryHook();

  const [value, setValue] = useState(0);

  return (
    <div css={wrap} className="flex-Set">
      <div css={Style}>
        <div className="item_area">
          {[1, 5, 10].map((item) => {
            return <Item value={item} key={item} setItem={setValue} />;
          })}
        </div>
        <span>현재 포인트 :&nbsp;{convertPrice(cashData.cash)} +</span>
        <div className="button__group">
          <CommonButton theme="white" onClick={() => router.back()}>
            취소
          </CommonButton>
          <CommonButton
            theme="success"
            onClick={usePurchaseHandler({ value, cashData })}
          >
            확인
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
