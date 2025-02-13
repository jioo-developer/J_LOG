import { apiUrl } from "@/static/constants/common";
import { replyType } from "../../query/getReplyDataQuery";

export async function createReply(data: replyType) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { result } = await response.json();
  return result;
}
