import useCashMutation from "@/apis/market/useMutation";

type propsType = {
  value: number;
  cashData: { cash: number; item: number };
};
export const usePurchaseHandler = ({ value, cashData }: propsType) => {
  const { mutate } = useCashMutation();
  const itemLength = value;
  const buyHandler = () => {
    mutate({
      cash: cashData.cash - itemLength * 2500,
      item: cashData.item + itemLength,
    });
  };

  return buyHandler;
};
