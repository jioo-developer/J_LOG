import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { getCashHandler } from "./getCashHandler";

type propsType = {
  cash: number;
  item: number;
};

const useCashMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ cash, item }: propsType) => {
      await getCashHandler();
      return { cash, item };
    },
    onSuccess: (result) => {
      queryClient.setQueryData<propsType[]>(["getCash"], (oldData) => {
        if (!oldData) {
          return oldData;
        } else {
          return [result];
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
