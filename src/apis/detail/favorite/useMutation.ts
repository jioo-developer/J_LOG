import { FirebaseData } from "@/static/types/common";
import { popuprHandler } from "@/utils/popupHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HandleFavorite } from "./handler";

type favoriteType = {
  value: number;
  id: string;
};

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ value, id }: favoriteType) => {
      return HandleFavorite({ value, id });
    },
    onSuccess: (result, { id }) => {
      queryClient.refetchQueries({
        queryKey: ["getPage", id],
      });
      queryClient.setQueryData<FirebaseData>(["getPage", id], (oldData) => {
        const oldValue = oldData as FirebaseData;
        return {
          ...oldValue,
          result,
        };
      });
    },
    onError: () => {
      popuprHandler({ message: "좋아요 반영이 되지 않았습니다." });
    },
  });
};

export default useFavoriteMutation;
