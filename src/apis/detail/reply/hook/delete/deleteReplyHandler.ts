import { apiUrl } from "@/static/constants/common";

export async function deleteReply(data: any) {
  const response = await fetch(`${apiUrl}/api/reply`, {
    method: "DELETE",
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
