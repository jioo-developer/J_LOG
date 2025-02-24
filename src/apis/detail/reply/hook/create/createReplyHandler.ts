import { apiUrl } from "@/static/constants/common";
import { replyType } from "../../query/getReplyDataQuery";

export async function createReply(data: replyType) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
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

  const { result } = await response.json();
  return result;
}
