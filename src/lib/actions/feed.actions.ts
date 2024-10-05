"use server";
import { db } from "@/db/prisma.db";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { z } from "zod";

const fileSchemaZ = z.instanceof(File, { message: "Required!" });
const imageSchemaZ = fileSchemaZ.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);
const feedSchemaZ = z.object({
  image: imageSchemaZ.refine((file) => file.size > 0, "Required!"),
  content: z.string().min(1, { message: "Required!" }),
  creatorId: z.coerce.number().min(1, { message: "creator Id is Required!" }),
});

export const createImage = async (image: File): Promise<string> => {
  await fs.mkdir("public/feedImages", { recursive: true });
  const imagePath = `/feedImages/${crypto.randomUUID()}-${image.name}`;
  const imageArrayBuffer = await image.arrayBuffer();
  const imageBuffer = Buffer.from(imageArrayBuffer);
  await fs.writeFile(`public${imagePath}`, imageBuffer);

  return imagePath;
};

export const createFeed = async (prevState: unknown, formData: FormData) => {
  const parsedFormData = Object.fromEntries(formData.entries());
  const result = feedSchemaZ.safeParse(parsedFormData);

  if (result.success === false) {
    const fieldErrors = result.error.formErrors.fieldErrors;
    console.log("errors ::", fieldErrors);
    return fieldErrors;
  }

  const data = result.data;
  const imagePath = await createImage(data.image);

  try {
    const createdFeed = await db.post.create({
      data: {
        imagePath,
        content: data.content,
        creatorId: data.creatorId,
      },
    });
    console.log("createdFeed ::", createdFeed);
  } catch (error) {
    console.log("error creating feed ::", error);
  }
  redirect("/");
};

const CommentSchemaZ = z.object({
  comment: z.string().min(1, { message: "Can't put empty comment!" }),
  userId: z.coerce.number().min(1, { message: "User Id is missing!" }),
  postId: z.coerce.number().min(1, { message: "Post Id is missing!" }),
});
export type CommentFormData = z.infer<typeof CommentSchemaZ>;

export const addComment = async (commentFormData: CommentFormData) => {
  const result = CommentSchemaZ.safeParse(commentFormData);

  if (result.success === false) {
    const fieldErrors = result.error.formErrors.fieldErrors;
    console.log("errors ::", fieldErrors);
    return {
      success: false,
      error: fieldErrors,
      data: null,
    };
  }

  const data = result.data;

  // const random = Math.random();
  try {
    // if (random > 0.5) throw new Error("Custom Error For Test!");
    // await sleep();
    const addedComment = await db.comment.create({
      data: {
        comment: data.comment,
        userId: data.userId,
        postId: data.postId,
      },
    });

    console.log("addedComment ::", addedComment);
    return {
      success: true,
      data: addedComment,
      error: null,
    };
  } catch (error) {
    console.log("Error creting comment :", error);
    return {
      success: false,
      error: "Error Adding Comment!",
      data: null,
    };
  }
};
