import { db } from "@/db/prisma.db";
import { NextRequest, NextResponse } from "next/server";

type LoginRequestBody = {
  email: string;
  password: string;
};
type LoginResponse = {
  data: {
    email: string;
    username: string;
    password: string;
  } | null;
  success: boolean;
  error: string | null;
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<LoginResponse>> {
  const body: LoginRequestBody = await request.json();
  const { email, password } = body;
  console.log("body :: ", body);

  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        email: true,
        password: true,
        username: true,
      },
    });

    console.log("user :: ", user);

    // TODO: add check for password
    if (!user) {
      return NextResponse.json({
        data: null,
        success: false,
        error: "User Not Found!",
      });
    }

    return NextResponse.json({
      data: { email, password, username: "xx" },
      success: true,
      error: null,
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      success: false,
      error: "Server Error: Failed to login!",
    });
  }
}
