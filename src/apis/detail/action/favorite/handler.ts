import { apiUrl } from "@/static/constants/common";

type propsType = {
  value: number;
  id: string;
  user: string;
};

export async function HandleFavorite({ value, id, user }: propsType) {
  const response = await fetch(`${apiUrl}/api/detail/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value, id, user }),
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
