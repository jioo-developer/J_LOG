import { apiUrl } from "@/static/constants/common";

async function getUserHandler() {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
export default getUserHandler;
