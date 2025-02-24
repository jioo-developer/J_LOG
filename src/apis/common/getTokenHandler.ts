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
    console.error("Error response body:", text); // 응답 본문 출력
    try {
      const errorData = JSON.parse(text); // 텍스트를 JSON으로 파싱 시도
      throw new Error(errorData.error);
    } catch (error) {
      throw new Error("Unexpected response format");
    }
  }

  const { isToken }: ResponseData = await response.json();

  return isToken;
}
