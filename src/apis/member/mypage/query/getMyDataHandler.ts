import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";

async function getMyDataHandler() {
  const user = authService.currentUser?.uid;
  const response = await fetch(`${apiUrl}/api/member/mypage/board`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid: user }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response.json();
}
export default getMyDataHandler;
