import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";

async function QuitHandler() {
  const user = authService.currentUser;
  const response = await fetch(`${apiUrl}/api/member/quit`, {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({ user }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}

export default QuitHandler;
