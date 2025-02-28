import { User } from "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { popuprHandler } from "@/utils/popupHandler";
import profileHandler from "./profileHandler";

type propsType = {
  user: User;
  url: string[];
  files: File[];
};

function useImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ user, url, files }: propsType) => {
      return await profileHandler({ user, url, files });
    },
    onSuccess: async (imgurl) => {
      await queryClient.refetchQueries({
        queryKey: ["getuser"], // 리페칭할 쿼리의 키를 지정
      });
      queryClient.setQueryData<User>(["getuser"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          photoURL: imgurl,
        };
      });
    },
    onError: (error) => {
      popuprHandler({ message: (error as Error).message });
    },
  });
}

export default useImageMutation;
