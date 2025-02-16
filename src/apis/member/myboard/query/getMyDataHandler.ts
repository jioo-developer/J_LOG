import { apiUrl } from "@/static/constants/common";

async function getMyDataHandler(user: string) {
  console.log(user);
  const response = await fetch(`${apiUrl}/api/member/board?uid=${user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const { data } = await response.json();
  return data;
}
export default getMyDataHandler;
