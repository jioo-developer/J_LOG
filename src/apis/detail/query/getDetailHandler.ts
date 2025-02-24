import { apiUrl } from "@/static/constants/common";
import { FirebaseData } from "@/static/types/common";

type responseType = {
  data: FirebaseData;
};

export const getDetailHandler = async (
  pageId: string
): Promise<responseType> => {
  const response = await fetch(`${apiUrl}/api/detail?pageId=${pageId}`, {
    method: "GET", // GET 요청
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

  // response.json()을 통해 반환된 객체를 responseType으로 타입 지정
  const { data } = await response.json();
  return data;
};
