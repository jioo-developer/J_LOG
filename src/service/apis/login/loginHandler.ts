import { apiUrl } from "@/static/common";

export async function Postlogin(id: string, password: string) {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error);
  }

  return response;
}
