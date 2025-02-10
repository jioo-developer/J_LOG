import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetCashHandler } from "./useSetCashHandler";

type propsType = {
  cash: number;
  item: number;
};

const useCashMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cash, item }: propsType) => {
      await useSetCashHandler({ cash, item });
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<propsType[]>(["getCash"], (oldData) => {
        if (!oldData) {
          return oldData;
        } else {
          return [{ cash: variables.cash, item: variables.item }];
        }
      });
      // popuprHandler({ message: "구매가 완료 되었습니다" });
    },
    onError: () => {
      // popuprHandler({ message: "구매 중 오류가 발생하였습니다" });
    },
  });
};

export default useCashMutation;
