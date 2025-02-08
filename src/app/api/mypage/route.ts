import deleteUserDB from "@/apis/member/quit/deleteDBHandler";
import { deleteUser } from "firebase/auth";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const { user } = await request.json();
  await deleteUserDB(user);
  await deleteUser(user);
}
