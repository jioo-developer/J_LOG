import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { User } from "firebase/auth";

type propsType = {
  nickname: string;
  user: User;
};

async function ChangeNicknameHandler({ nickname, user }: propsType) {
  const response = await fetch(`${apiUrl}/api/member/mypage/nickname`, {
    method: "POST",
    body: JSON.stringify({ id: user.uid, nickname }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}

export default ChangeNicknameHandler;
