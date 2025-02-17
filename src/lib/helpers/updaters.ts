"use server";
import { db } from "@/db/prisma.db";
import { deleteImageFromCloudinaryV2 } from "./cloudinary";
import { getPublicIdFromImageUrl } from "../utils";

export const updateLike = async (
  postId: number,
  userId: number,
  operation: "LIKE" | "REMOVE_LIKE"
) => {
  let res;
  // const random = Math.random();
  try {
    // if (random > 0.5) throw new Error("Custom Error For Test!");
    if (operation === "LIKE") {
      res = await db.like.create({
        data: {
          userId,
          postId,
        },
      });
    } else if (operation === "REMOVE_LIKE") {
      res = await db.like.delete({
        where: {
          userId_postId: {
            postId,
            userId,
          },
        },
      });
    }
    console.log("Operation : ", operation, "Successful, Res: ", res);
    return {
      success: true,
      data: res,
      error: null,
    };
  } catch (error) {
    console.error("Failed to like the post ::", error);
    return {
      success: false,
      data: null,
      error: "Failed to like the post!",
    };
  }
};

export const deletePost = async (postId: number, imagePath: string) => {
  // const random = Math.random();
  try {
    // if (random > 0.5) throw new Error("Custom Error For Test!");
    const res = await db.post.delete({
      where: {
        id: postId,
      },
    });
    const publicId = getPublicIdFromImageUrl(imagePath);
    const { success } = await deleteImageFromCloudinaryV2(publicId);

    if (!success) {
      throw new Error("Failed to delete the image!");
    }
    return {
      success: true,
      data: res,
      error: null,
    };
  } catch (error) {
    console.log("Failed to delete the post", error);
    return {
      success: false,
      data: null,
      error: "Failed to delete post!",
    };
  }
};
