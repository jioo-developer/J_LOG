import { apiUrl } from "@/static/constants/common";
import setTokenRenturnHandler from "./subHandler/setTokenHandler";

export async function Postlogin(id: string, password: string) {
  // 토큰 생성
  const token = await setTokenRenturnHandler(id, password);

  const response = await fetch(`${apiUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}
