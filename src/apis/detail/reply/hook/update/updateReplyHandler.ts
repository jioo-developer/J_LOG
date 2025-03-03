import { apiUrl } from "@/static/constants/common";

type propsType = {
  replyId: string;
  pageId: string;
  comment: string;
};

export async function updateReply({ pageId, replyId, comment }: propsType) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageId, replyId, comment }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}
