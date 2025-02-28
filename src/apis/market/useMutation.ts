import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCashHandler } from "./useSetCashHandler";
import { popuprHandler } from "@/utils/popupHandler";
import { useRouter } from "next/navigation";

type propsType = {
  cash: number;
  item: number;
};

const useCashMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cash, item }: propsType) => {
      return setCashHandler({ cash, item });
    },
    onSuccess: (_, variables) => {
      popuprHandler({ message: "구매가 완료 되었습니다" });
      router.back();
      queryClient.setQueryData<propsType[]>(["getCash"], (oldData) => {
        if (!oldData) {
          return oldData;
        } else {
          return [{ cash: variables.cash, item: variables.item }];
        }
      });
    },
    onError: () => {
      popuprHandler({ message: "구매 중 오류가 발생하였습니다" });
    },
  });
};

export default useCashMutation;
