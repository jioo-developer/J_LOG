/** @jsxImportSource @emotion/react */
import { convertPrice } from "@/utils/convertPrice";
import { ActiveItem, itemStyle } from "./Style";
import { Dispatch, SetStateAction } from "react";

type propsType = {
  item: number;
  value: number;
  setItem: Dispatch<SetStateAction<number>>;
};

const Item = ({ item, value, setItem }: propsType) => {
  return (
    <div
      className="item__wrap"
      css={item === value ? ActiveItem : itemStyle}
      onClick={() => setItem(item)}
    >
      <p className="product_name">우선권 {item}회권</p>
      <p className="product_length">+{item}</p>
      <p className="product_price" data-testid={`itemPrice-${item}`}>
        {convertPrice(2500 * item)}
      </p>
      <p className="product_sale"></p>
    </div>
  );
};

export default Item;
