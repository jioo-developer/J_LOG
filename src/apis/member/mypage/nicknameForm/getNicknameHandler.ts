import { apiUrl } from "@/static/constants/common";

// ✅ API 호출 함수 (반환 타입 명확히 지정)
export async function getNicknameHandler(): Promise<string[]> {
  const response = await fetch(`${apiUrl}/api/member/mypage/nickname`, {
    method: "GET",
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

  const { data } = await response.json();
  return data;
}
