import { apiUrl } from "@/static/constants/common";
import { User } from "firebase/auth";
import refreshTokenHandler from "./subHandler/refreshTokenHandler";

async function getUserHandler(): Promise<{ user: User | null }> {
  const response = await fetch(`${apiUrl}/api/login`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    const { user } = await response.json();
    return user ? refreshTokenHandler(user) : { user: null };
  } else {
    const text = await response.text();
    const errorData = JSON.parse(text);
    throw new Error(errorData.error);
  }
}

// 해당 handler는 유저정보를 가져오며
// 유저 상태관리는 getUserStatusHandler 에서 진행함
export default getUserHandler;
