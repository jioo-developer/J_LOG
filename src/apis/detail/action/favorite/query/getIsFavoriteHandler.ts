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
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  // 응답을 JSON 형식으로 반환
  return response.json();
}
