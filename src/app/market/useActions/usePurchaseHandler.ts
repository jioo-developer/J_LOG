import useCashMutation from "@/apis/market/useMutation";

type propsType = {
  value: number;
  cashData: { cash: number; item: number };
};
export const usePurchaseHandler = ({ value, cashData }: propsType) => {
  const { mutate } = useCashMutation();

  const buyHandler = () => {
    const money = cashData.cash;
    const cash = money - value * 2500;
    const length = cashData.item + value;
    mutate({ cash, item: length });
  };

  return buyHandler;
};
