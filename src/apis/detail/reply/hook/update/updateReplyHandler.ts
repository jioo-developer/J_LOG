import { apiUrl } from "@/static/constants/common";

type propsType = {
  replyId: string;
  pageId: string;
  comment: string;
};

export async function updateReply({ pageId, replyId, comment }: propsType) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageId, replyId, comment }),
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
