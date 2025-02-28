import { FirebaseData } from "@/static/types/common";
import { popuprHandler } from "@/utils/popupHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HandleFavorite } from "./favoriteHandler";

type favoriteType = {
  value: number;
  id: string;
  user: string;
};

const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ value, id, user }: favoriteType) => {
      return HandleFavorite({ value, id, user });
    },
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: ["getPage", variables.id],
      });
      queryClient.setQueryData<FirebaseData>(
        ["getPage", variables.id],
        (oldData) => {
          const oldValue = oldData as FirebaseData;
          return {
            ...oldValue,
            favorite: variables.value,
          };
        }
      );
    },
    onError: () => {
      popuprHandler({ message: "좋아요 반영이 되지 않았습니다." });
    },
  });
};

export default useFavoriteMutation;
