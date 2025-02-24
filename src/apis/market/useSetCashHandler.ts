import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { User } from "firebase/auth";

type propsType = {
  cash: number;
  item: number;
};

export async function setCashHandler({ cash, item }: propsType) {
  const user = authService.currentUser as User;
  const response = await fetch(`${apiUrl}/api/market`, {
    method: "POST",
    body: JSON.stringify({ user: user.uid, cash, item }),
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

  return response.json();
}
