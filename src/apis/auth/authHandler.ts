import { AuthPropsType } from "@/static/types/common";

export async function AuthHandler({
  email,
  password,
  nickname,
}: AuthPropsType) {
  const response = await fetch(`/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, nickname }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
}

// 회원가입 계정 생성 로직
