"use client";
import React from "react";
import { credentialsUserLogin } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormData, loginSchemaZ } from "@/lib/constants/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { ControllerInput } from "../common/ControllerInput";
import { LoaderCircle } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    // reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchemaZ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    // console.log("Signup form data ::", formData);
    try {
      const { success, error } = await credentialsUserLogin(formData);
      if (success) {
        toast.success("Welcome!", {
          position: "top-center",
          duration: 5000,
        });
        router.replace("/");
      } else {
        toast.error(JSON.stringify(error), {
          position: "top-right",
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Failed to Login!", {
        position: "top-right",
        duration: 5000,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <ControllerInput
            control={control}
            name="email"
            type="email"
            placeholder="Enter your email"
            label="Email"
          />
          <ControllerInput
            control={control}
            name="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
          />
          <div className="mt-2">
            <LoginButton isSubmitting={isSubmitting} />
          </div>
        </div>
      </form>
    </div>
  );
};

const LoginButton = ({ isSubmitting = false }) => {
  const buttonContent = isSubmitting ? (
    <>
      <LoaderCircle className="animate-spin" />
      &nbsp; Logging In...
    </>
  ) : (
    "Login"
  );
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {buttonContent}
    </Button>
  );
};

export default LoginForm;
