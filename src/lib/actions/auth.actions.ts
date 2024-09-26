"use server";

import { db } from "@/db/prisma.db";
import { z } from "zod";

const signupSchemaZ = z.object({
  username: z.string().min(1, { message: "Required!" }),
  email: z.string().email({ message: "Should be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

// FIXME: improve this function, check if user already exist, hash the passowrd before storing, also add confirm password check
export const createUser = async (prevState: unknown, formData: FormData) => {
  const parsedFormData = Object.fromEntries(formData.entries());
  const result = signupSchemaZ.safeParse(parsedFormData);

  console.log(parsedFormData, result);
  if (result.success === false) {
    const fieldErrors = result.error.formErrors.fieldErrors;
    return fieldErrors;
  }

  const data = result.data;
  try {
    const createdUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    console.log("createdUser ::", createdUser);
  } catch (error) {
    console.log("error creating user ::", error);
  }
};
