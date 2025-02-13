import { updateProfile, User } from "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/firebase";
import { popuprHandler } from "@/utils/popupHandler";
import { profileHandler } from "./handler";

type propsType = {
  url: string[];
  files: File[];
};

function useImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, files }: propsType) => {
      const user = authService.currentUser?.uid as string;
      const resultUrl = await profileHandler({ user, url, files });
      await updateProfile(authService.currentUser as User, {
        photoURL: resultUrl,
      });
      return resultUrl;
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
