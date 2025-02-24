import { apiUrl } from "@/static/constants/common";
import { AuthPropsType } from "@/static/types/common";

export async function AuthHandler({
  email,
  password,
  nickname,
}: AuthPropsType) {
  const response = await fetch(`${apiUrl}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, nickname }),
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

// 회원가입 계정 생성 로직
