type propsType = {
  pageId: string;
  uid: string;
};

export async function getIsFavoriteHandler({ pageId, uid }: propsType) {
  const response = await fetch(
    `/api/detail/favorite?userUid=${encodeURIComponent(
      uid
    )}&id=${encodeURIComponent(pageId)}`,
    {
      method: "GET",
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
