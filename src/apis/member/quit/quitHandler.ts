import { authService } from "@/lib/firebase";

async function QuitHandler() {
  const user = authService.currentUser;
  const response = await fetch(`/api/member/quit`, {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify({ user }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response;
}

export default QuitHandler;
