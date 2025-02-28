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
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}

// 회원가입 계정 생성 로직
