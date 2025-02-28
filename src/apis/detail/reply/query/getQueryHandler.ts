import { apiUrl } from "@/static/constants/common";
import { replyType } from "./getReplyDataQuery";

type responseType = {
  data: replyType;
};

export async function getReplyHandler(pageId: string): Promise<responseType> {
  const response = await fetch(`${apiUrl}/api/reply?pageId=${pageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  const { data } = await response.json();
  return data;
}
