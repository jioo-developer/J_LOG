import { apiUrl } from "@/static/constants/common";
import setGoogleTokenReturnHandler from "./subHandler/setTokenReutnHandler";

export async function GoogleLoginHandler() {
  // onError이 없기 때문에 try/catch를 씀

  const token = await setGoogleTokenReturnHandler();

  const response = await fetch(`${apiUrl}/api/login/snsLogin/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ googleToken: token }),
  });

  if (!response.ok) {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }

  return response;
}
