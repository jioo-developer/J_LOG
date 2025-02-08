import { apiUrl } from "@/static/constants/common";

// ✅ API 호출 함수 (반환 타입 명확히 지정)
export async function getNicknameHandler(): Promise<string[]> {
  const response = await fetch(`${apiUrl}/api/member/mypage/profile/nickname`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { data } = await response.json();
  return data;
}
