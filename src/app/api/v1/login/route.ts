import { db } from "@/db/prisma.db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

type LoginRequestBody = {
  email: string;
  password: string;
};

export type LoginResponse = {
  data: {
    id: number;
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

  try {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        username: true,
      },
    });

    console.log("user :: ", user);

    if (!user) {
      return NextResponse.json({
        data: null,
        success: false,
        error: "User Not Found!",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return NextResponse.json({
        data: null,
        success: false,
        error: "Invalid Credentials!",
      });
    }

    return NextResponse.json({
      data: user,
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
