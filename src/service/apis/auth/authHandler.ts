import { apiUrl } from "@/static/common";

type propsType = {
  email: string;
  password: string;
  nickname: string;
};

async function AuthHandler({ email, password, nickname }: propsType) {
  const response = await fetch(`${apiUrl}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, nickname }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
}

export default AuthHandler;
