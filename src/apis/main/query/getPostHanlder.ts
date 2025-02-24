import { apiUrl } from "@/static/constants/common";

export async function getPostHandler() {
  const response = await fetch(`${apiUrl}/api/main`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
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

  const { postdata } = await response.json();
  return postdata;
}
