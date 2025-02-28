import { apiUrl } from "@/static/constants/common";

type propsType = {
  id: string;
  replyId: string;
};

export async function deleteReply({ id, replyId }: propsType) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, replyId }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}
