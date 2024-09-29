import { z } from "zod";

export const signupSchemaZ = z
  .object({
    username: z.string().min(1, { message: "Required!" }),
    email: z.string().email({ message: "Should be a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const loginSchemaZ = z.object({
  email: z.string().email({ message: "Should be a valid email address" }),
  password: z.string().min(1, { message: "Password can't be empty!" }),
});

export type SignupFormData = z.infer<typeof signupSchemaZ>;
export type LoginFormData = z.infer<typeof loginSchemaZ>;
