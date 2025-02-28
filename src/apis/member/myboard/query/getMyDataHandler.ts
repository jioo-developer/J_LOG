import { apiUrl } from "@/static/constants/common";

async function getMyDataHandler(user: string) {
  const response = await fetch(`${apiUrl}/api/member/board?uid=${user}`, {
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

  const { data } = await response.json();
  return data;
}
export default getMyDataHandler;
