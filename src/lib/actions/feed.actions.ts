"use server";
import { db } from "@/db/prisma.db";
import fs from "fs/promises";
import { z } from "zod";

const fileSchemaZ = z.instanceof(File, { message: "Required!" });
const imageSchemaZ = fileSchemaZ.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);
const feedSchemaZ = z.object({
  image: imageSchemaZ.refine((file) => file.size > 0, "Required!"),
  content: z.string().min(1, { message: "Required!" }),
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
  //   console.log("formData ::", formData);
  //   console.log("parsedFormData ::", parsedFormData);
  //   console.log("result ::", result);

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
        creatorId: 1,
      },
    });
    console.log("createdFeed ::", createdFeed);
  } catch (error) {
    console.log("error creating feed ::", error);
  }
};
