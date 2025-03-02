import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";

export async function LogoutHandler() {
  await authService.signOut();

  const response = await fetch(`${apiUrl}/api/login`, {
    method: "DELETE",
    credentials: "include",
  });

  return response;
}
