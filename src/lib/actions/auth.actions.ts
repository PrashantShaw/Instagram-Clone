"use server";

import { signIn } from "@/auth";
import { db } from "@/db/prisma.db";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import {
  loginSchemaZ,
  SignupFormData,
  signupSchemaZ,
} from "@/lib/constants/definitions";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { sleep } from "../utils";

export const createUser = async (formData: SignupFormData) => {
  const result = signupSchemaZ.safeParse(formData);

  console.log(formData, result);
  if (result.success === false) {
    const fieldErrors = result.error.formErrors.fieldErrors;
    return {
      success: false,
      error: fieldErrors,
      data: null,
    };
  }

  const data = result.data;

  try {
    await sleep(2000);
    const user = await db.user.findUnique({
      where: { email: data.email },
      select: {
        email: true,
      },
    });
    if (user) {
      return {
        success: false,
        error: "An user with this email already exists!",
        data: null,
      };
    }

    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const createdUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });
    console.log("createdUser ::", createdUser);

    return {
      success: true,
      error: null,
      data: createdUser,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const isUsernameError =
        (error.meta?.target as Array<string>)[0] === "username";
      console.log(
        "PrismaClientKnownRequestError: Failed to Signup, isUsernameError :",
        isUsernameError
      );
      if (isUsernameError) {
        return {
          success: false,
          error: `username: ${formData.username} is already taken!`,
          data: null,
        };
      }
    }
    return {
      success: false,
      error: "Server Error: Failed to Signup -",
      data: null,
    };
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
