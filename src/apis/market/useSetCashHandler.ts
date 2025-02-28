import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { User } from "firebase/auth";

type propsType = {
  cash: number;
  item: number;
};

export async function setCashHandler({ cash, item }: propsType) {
  const user = authService.currentUser as User;
  const response = await fetch(`${apiUrl}/api/market`, {
    method: "POST",
    body: JSON.stringify({ user: user.uid, cash, item }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response.json();
}
