"use server";

import { signIn } from "@/auth";
import { db } from "@/db/prisma.db";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchemaZ = z.object({
  username: z.string().min(1, { message: "Required!" }),
  email: z.string().email({ message: "Should be a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});
const loginSchemaZ = z.object({
  email: z.string().email({ message: "Should be a valid email address" }),
  password: z.string().min(1, { message: "Password can't be empty!" }),
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

export const credentialsUserLogin = async (
  prevState: unknown,
  formData: FormData
) => {
  const parsedFormData = Object.fromEntries(formData.entries());
  const result = loginSchemaZ.safeParse(parsedFormData);

  console.log(parsedFormData, result);
  if (result.success === false) {
    const fieldErrors = result.error.formErrors.fieldErrors;
    return fieldErrors;
  }

  try {
    await signIn("credentials", {
      ...result.data,
      redirect: false,
    });
  } catch (error: any) {
    console.log("Login Failed ::", error);
    if (error instanceof AuthError) {
      const errorMessage = error.cause?.err?.message;
      console.log("Login Failed, AuthError ::", errorMessage);
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: error.message,
            data: null,
          };
        default:
          return {
            success: false,
            error: "Auth Error: Failed to Login!",
            data: null,
          };
      }
    }
    return {
      success: false,
      error: "Server Error: Failed to Login!",
      data: null,
    };
  }

  // redirect("/");
};
