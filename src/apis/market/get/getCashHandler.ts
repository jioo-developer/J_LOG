import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { User } from "firebase/auth";

export async function getCashHandler() {
  const user = authService.currentUser as User;
  const response = await fetch(`${apiUrl}/api/market`, {
    method: "GET",
    body: JSON.stringify({ user: user.uid }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
