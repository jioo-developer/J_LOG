import { apiUrl } from "@/static/constants/common";

export async function getReplyHandler(pageId: string) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: pageId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { data } = await response.json();
  return data;
}
