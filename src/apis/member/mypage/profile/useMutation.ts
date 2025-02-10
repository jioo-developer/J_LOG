import { updateProfile, User } from "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/firebase";
import storageUploadHandler from "@/utils/storageUploadHandler";
import { popuprHandler } from "@/utils/popupHandler";

type propsType = {
  url: string[];
  files: File[];
};

function useImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, files }: propsType) => {
      const uploadUrl = await storageUploadHandler(url, files);
      const result = uploadUrl[0];
      await updateProfile(authService.currentUser as User, {
        photoURL: result,
      });
      return result;
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
