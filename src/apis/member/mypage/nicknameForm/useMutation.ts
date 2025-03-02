import { authService, db } from "@/lib/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, User } from "firebase/auth";
import ChangeNicknameHandler from "./ChangeNicknameHandler";
import { popuprHandler } from "@/utils/popupHandler";

export type changeHanlderType = {
  nickname: string;
};

function useNameChangeMutation() {
  const queryClient = useQueryClient();
  const user = authService.currentUser as User;
  return useMutation({
    mutationFn: async ({ nickname }: changeHanlderType) => {
      return ChangeNicknameHandler({ nickname, user });
      // 여기서 return 되는 nickname이 onSuccess의 params로 들어감
    },
    onSuccess: async (_, variables) => {
      await updateProfile(user, {
        displayName: variables.nickname,
      });

      await queryClient.refetchQueries({
        queryKey: ["getuser"], // 리페칭할 쿼리의 키를 지정
      });
      queryClient.setQueryData<User>(["getuser"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          displayName: variables.nickname,
        };
      });
    },
    onError: (error) => {
      popuprHandler({ message: (error as Error).message });
    },
  });
}

export default useNameChangeMutation;
