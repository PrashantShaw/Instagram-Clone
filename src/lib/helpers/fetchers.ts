import { db } from "@/db/prisma.db";
import { sleep } from "../utils";

export const fetchPosts = async () => {
  try {
    // FIXME: remove sleep() before prod deployment
    await sleep();
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
