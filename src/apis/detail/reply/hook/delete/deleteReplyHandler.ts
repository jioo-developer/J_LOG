import { apiUrl } from "@/static/constants/common";

type propsType = {
  id: string;
  replyId: string;
};

export async function deleteReply({ id, replyId }: propsType) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, replyId }),
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
