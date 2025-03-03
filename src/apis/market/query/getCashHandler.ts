import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { User } from "firebase/auth";

export async function getCashHandler() {
  const user = authService.currentUser as User;
  const response = await fetch(`${apiUrl}/api/market?uid=${user.uid}`, {
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
