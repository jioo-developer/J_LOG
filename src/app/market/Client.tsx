/** @jsxImportSource @emotion/react */
"use client";
import CommonButton from "@/components/atoms/CommonButton/CommonButton";
import Item from "./component/Item";
import useCashMutation from "@/apis/market/useMutation";
import { useState } from "react";
import { convertPrice } from "@/utils/convertPrice";
import { css } from "@emotion/react";
import { useRouter } from "next/navigation";
import useCashQueryHook from "@/apis/market/query/useGetCashQuery";

const ItemStore = () => {
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
  console.log(cashData);
  console.log(convertPrice(cashData.cash));

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

export default ItemStore;

const wrap = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

const Style = css`
  width: 28rem;
  margin: 0 auto;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 8px;
  padding: 2rem;
  display: flex;
  box-sizing: border-box;
  border-radius: 4px;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--gap-medium);

  @media all and (max-width: 500px) {
    width: 90%;
  }

  .item_area {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  span {
    width: 100%;
    text-align: left;
    font-size: 1.125rem;
    margin: 0px;
    color: rgb(61, 61, 62);
  }

  .button__group {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`;
