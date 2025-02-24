import { FirebaseData } from "@/static/types/common";

type responseType = {
  data: FirebaseData;
};

export const getDetailHandler = async (
  pageId: string
): Promise<responseType> => {
  const response = await fetch(`/api/detail?pageId=${pageId}`, {
    method: "GET", // GET 요청
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  // response.json()을 통해 반환된 객체를 responseType으로 타입 지정
  const { data } = await response.json();
  return data;
};
