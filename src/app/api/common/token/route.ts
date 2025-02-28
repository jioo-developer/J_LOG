import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = cookies();

  const token =
    cookiesStore.get("authToken")?.value ||
    cookiesStore.get("GoogleAuthToken")?.value;

  const tokenStatus = token ?? false;

  console.log("is Tokened:" + tokenStatus);

  return NextResponse.json(
    { isToken: tokenStatus, message: `is token : ${tokenStatus}` },
    { status: 200 }
  );
}
