import { apiUrl } from "@/static/constants/common";

type propsType = {
  pageId: string;
  uid: string;
};

export async function getIsFavoriteHandler({ pageId, uid }: propsType) {
  const response = await fetch(
    `${apiUrl}/api/detail/favorite?userUid=${encodeURIComponent(
      uid
    )}&id=${encodeURIComponent(pageId)}`,
    {
      method: "GET",
    }
  );

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

  // 응답을 JSON 형식으로 반환
  return response.json();
}
