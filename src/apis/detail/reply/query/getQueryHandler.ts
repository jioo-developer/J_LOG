import { replyType } from "./getReplyDataQuery";

type responseType = {
  data: replyType;
};

export async function getReplyHandler(pageId: string): Promise<responseType> {
  const response = await fetch(`/api/reply?pageId=${pageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { data } = await response.json();
  return data;
}
