import { authService } from "@/lib/firebase";
import { apiUrl } from "@/static/constants/common";
import { User } from "firebase/auth";

type propsType = {
  cash: number;
  item: number;
};

export async function useSetCashHandler({ cash, item }: propsType) {
  const user = authService.currentUser as User;
  const response = await fetch(`${apiUrl}/api/market`, {
    method: "POST",
    body: JSON.stringify({ user: user.uid, cash, item }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
