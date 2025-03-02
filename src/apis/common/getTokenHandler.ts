import { apiUrl } from "@/static/constants/common";

type ResponseData = {
  isToken: boolean;
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

  if (response.status === 204) {
    return null; // 204 응답에는 본문이 없으므로 null을 반환
  }

  const { isToken }: ResponseData = await response.json();

  return isToken;
}
