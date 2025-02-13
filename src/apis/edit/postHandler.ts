import { apiUrl } from "@/static/constants/common";
import { FirebaseData } from "@/static/types/common";

type propsType = {
  data: FirebaseData;
  pageId: string;
};

export default async function postHandler({ data, pageId }: propsType) {
  const response = await fetch(`${apiUrl}/api/edit`, {
    method: "POST",
    body: JSON.stringify({ data, pageId }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
}
