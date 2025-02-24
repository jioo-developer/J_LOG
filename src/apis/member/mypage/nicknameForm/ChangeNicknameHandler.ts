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
    console.error("Error response body:", text); // 응답 본문 출력
    try {
      const errorData = JSON.parse(text); // 텍스트를 JSON으로 파싱 시도
      throw new Error(errorData.error);
    } catch (error) {
      throw new Error("Unexpected response format");
    }
  }
  return response;
}

export default ChangeNicknameHandler;
