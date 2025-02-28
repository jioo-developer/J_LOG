import { apiUrl } from "@/static/constants/common";

export async function pageDeleteHandler(id: string) {
  const response = await fetch(`${apiUrl}/api/detail`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}
