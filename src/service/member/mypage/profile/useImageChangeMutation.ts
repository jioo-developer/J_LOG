import { updateProfile, User } from "firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/firebase";
import storageUploadHandler from "@/utils/storageUploadHandler";

type propsType = {
  url: string[];
  files: File[];
};

function useImageChanger() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ url, files }: propsType) => {
      const uploadUrl = await storageUploadHandler(url, files);
      await updateProfile(authService.currentUser as User, {
        photoURL: uploadUrl[0],
      });
      return uploadUrl[0];
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
    onError: () => {
      //   popuprHandler({ message: "프로필 변경에 실패하였습니다." });
    },
  });
}

export default useImageChanger;
