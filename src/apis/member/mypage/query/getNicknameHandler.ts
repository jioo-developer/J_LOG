import { apiUrl } from "@/static/constants/common";

// ✅ API 호출 함수 (반환 타입 명확히 지정)
export async function getNicknameHandler(): Promise<string[]> {
  const response = await fetch(`${apiUrl}/api/member/mypage/nickname`, {
    method: "GET",
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }
  const { data } = await response.json();
  return data;
}
