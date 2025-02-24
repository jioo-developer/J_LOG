import { apiUrl } from "@/static/constants/common";
import { FirebaseData } from "@/static/types/common";

type propsType = {
  data: FirebaseData;
  pageId: string;
};

export default async function postHandler({ data, pageId }: propsType) {
  const response = await fetch(`${apiUrl}/api/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
    },
    body: JSON.stringify({ data, pageId }),
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
