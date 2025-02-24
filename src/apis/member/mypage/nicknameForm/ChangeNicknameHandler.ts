import { User } from "firebase/auth";

type propsType = {
  nickname: string;
  user: User;
};

async function ChangeNicknameHandler({ nickname, user }: propsType) {
  const response = await fetch(`/api/member/mypage/nickname`, {
    method: "POST",
    body: JSON.stringify({ id: user.uid, nickname }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
}

export default ChangeNicknameHandler;
