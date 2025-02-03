import { db } from "@/db/prisma.db";
import { LoginResponse } from "@/app/api/v1/login/route";

// TODO: add pagination/infitnite scroll
export const fetchPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: { creator: true, comments: true, likes: true },
      orderBy: { createdAt: "desc" },
    });
    // console.log("posts ::", posts);
    return {
      data: posts,
      success: true,
      error: null,
    };
  } catch (error) {
    console.log("Error fetching posts ::", error);
    return {
      data: null,
      success: false,
      error: "Error fetching posts!",
    };
  }
};

export const authenticateCredentialsLogin = async (
  email: string,
  password: string
) => {
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN || "";
  const LOGIN_URL = `${BASE_URL}/api/v1/login`;
  try {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    const { success, error, data }: LoginResponse = await res.json();
    // console.log("api result ::", result);
    return {
      success,
      error,
      data,
    };
  } catch (error) {
    console.log("Failed to login!", error);
    return {
      success: false,
      error: "Failed to login",
      data: null,
    };
  }
};
