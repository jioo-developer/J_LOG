import { apiUrl } from "@/static/constants/common";

export async function updateReply(data: any) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "PUT",
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
