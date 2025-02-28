import { apiUrl } from "@/static/constants/common";

type ResponseData = {
  isToken: boolean; // 응답 객체에 isToken 프로퍼티가 있다
};

export async function getTokenHandler() {
  const response = await fetch(`${apiUrl}/api/common/token`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  const { isToken }: ResponseData = await response.json();

  return isToken;
}
