import deleteUserDB from "@/app/member/quit/handler/deleteDBHandler";
import { deleteUser } from "firebase/auth";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const { user } = await request.json();
  try {
    await deleteUserDB(user);
    await deleteUser(user);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
