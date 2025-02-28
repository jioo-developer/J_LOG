import deleteUserDB from "@/app/member/quit/handler/deleteDBHandler";
import { deleteUser } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const { user } = await request.json();
  try {
    await deleteUserDB(user);
    await deleteUser(user);

    return NextResponse.json(
      { message: "계정 삭제에 성공하였습니다" },
      { status: 204 } // 상태 코드 200 - 성공
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
