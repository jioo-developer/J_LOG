import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";

async function QuitHandler() {
  const user = authService.currentUser;
  const response = await fetch(`${apiUrl}/api/member/quit`, {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({ user }),
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

export default QuitHandler;
