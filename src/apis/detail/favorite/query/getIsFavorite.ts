import { apiUrl } from "@/static/constants/common";

type propsType = {
  user: string;
  pageId: string;
};

export async function getIsFavoriteHandler({ user, pageId }: propsType) {
  // 쿼리 파라미터로 user와 pageId를 전달
  const response = await fetch(
    `${apiUrl}/api/detail/favorite?user=${encodeURIComponent(
      user
    )}&pageId=${encodeURIComponent(pageId)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // 응답이 실패한 경우 처리
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  // 응답을 JSON 형식으로 반환
  return response.json();
}
