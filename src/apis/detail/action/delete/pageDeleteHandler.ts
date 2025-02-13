import { apiUrl } from "@/static/constants/common";

export async function pageDelete(id: string) {
  const response = await fetch(`${apiUrl}/api/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response;
}
