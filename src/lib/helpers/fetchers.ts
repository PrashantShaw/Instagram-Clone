import { db } from "@/db/prisma.db";

export const fetchPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: { creator: true, comments: true, likes: true },
    });
    console.log("posts ::", posts);
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
