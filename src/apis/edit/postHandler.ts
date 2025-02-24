import { FirebaseData } from "@/static/types/common";

type propsType = {
  data: FirebaseData;
  pageId: string;
};

export default async function postHandler({ data, pageId }: propsType) {
  const response = await fetch(`/api/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 형식으로 보내기 위한 헤더 추가
    },
    body: JSON.stringify({ data, pageId }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
}
