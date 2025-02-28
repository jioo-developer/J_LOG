/** @jsxImportSource @emotion/react */
import { convertPrice } from "@/utils/convertPrice";
import { itemStyle } from "./Style";
import { Dispatch, SetStateAction } from "react";

type propsType = {
  value: number;
  setItem: Dispatch<SetStateAction<number>>;
};

const Item = ({ value, setItem }: propsType) => {
  return (
    <div className="item__wrap" css={itemStyle} onClick={() => setItem(value)}>
      <p className="product_name">우선권 {value}회권</p>
      <p className="product_length">+{value}</p>
      <p className="product_price" data-testid={`itemPrice-${value}`}>
        {convertPrice(2500 * value)}
      </p>
      <p className="product_sale"></p>
    </div>
  );
};

export default Item;
