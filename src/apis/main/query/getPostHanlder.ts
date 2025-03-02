import { apiUrl } from "@/static/constants/common";

export async function getPostHandler() {
  const response = await fetch(`${apiUrl}/api/main`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  const { postdata } = await response.json();
  return postdata;
}
