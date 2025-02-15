import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = cookies();
  const token =
    cookiesStore.get("authToken")?.value ||
    cookiesStore.get("GoogleAuthToken")?.value;

  return NextResponse.json({ isToken: token ? token : false });
}
