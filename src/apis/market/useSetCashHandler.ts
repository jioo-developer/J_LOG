import { authService } from "@/lib/firebase";
import { User } from "firebase/auth";

type propsType = {
  cash: number;
  item: number;
};

export async function setCashHandler({ cash, item }: propsType) {
  const user = authService.currentUser as User;
  const response = await fetch(`/api/market`, {
    method: "POST",
    body: JSON.stringify({ user: user.uid, cash, item }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
}
