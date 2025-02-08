import { authService, db } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, User } from "firebase/auth";

export type changeHanlderType = {
  nickname: string;
};

function useNameChangeHandler() {
  const user = authService.currentUser as User;
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ nickname }: changeHanlderType) => {
      await fetch(`${apiUrl}/api/member/mypage/profile/nickname`, {
        method: "POST",
        body: JSON.stringify({ id: user.uid, nickname }),
      });
      return nickname;
      // 여기서 return 되는 nickname이 onSuccess의 params로 들어감
    },
    onSuccess: async (nickname) => {
      await updateProfile(user, {
        displayName: nickname,
      });

      await queryClient.refetchQueries({
        queryKey: ["getuser"], // 리페칭할 쿼리의 키를 지정
      });
      queryClient.setQueryData<User>(["getuser"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          displayName: nickname,
        };
      });
    },
    onError: (error) => {
      window.alert((error as Error).message);
      //   popuprHandler({ message: "닉네임을 변경에 실패하였습니다." });
    },
  });
}

export default useNameChangeHandler;
