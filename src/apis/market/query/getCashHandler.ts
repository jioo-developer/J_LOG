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
    const error = await response.json();
    throw new Error(error.message);
  }

  const { data } = await response.json();
  return data[0];
}
