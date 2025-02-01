"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/lib/actions/auth.actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormData, signupSchemaZ } from "@/lib/constants/definitions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { ControllerInput } from "@/components/common/ControllerInput";
import { Button } from "@/components/ui/button";

const SignupForm = () => {
  const [loading, setLoading] = useState(false); // redirect takes longer, thats why this loading state
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    // reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchemaZ),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (formData) => {
    // console.log("Signup form data ::", formData);
    try {
      setLoading(true);
      const { success, error } = await createUser(formData);
      if (success) {
        toast.success("User successfully Created!", {
          position: "top-center",
          duration: 5000,
        });
        router.replace("/");
      } else {
        setLoading(false);
        toast.error(JSON.stringify(error), {
          position: "top-right",
          duration: 5000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to Create User!", {
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
            name="username"
            type="text"
            placeholder="Create an username"
            label="Username"
          />
          <ControllerInput
            control={control}
            name="email"
            type="email"
            placeholder="Enter your email address"
            label="Email"
          />
          <ControllerInput
            control={control}
            name="password"
            type="password"
            placeholder="Create a strong password"
            label="Password"
          />
          <ControllerInput
            control={control}
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            label="Confirm Password"
          />
          <div className="mt-2">
            <CreateAccountButton isSubmitting={isSubmitting || loading} />
          </div>
        </div>
      </form>
    </div>
  );
};

const CreateAccountButton = ({ isSubmitting = false }) => {
  const buttonContent = isSubmitting ? (
    <>
      <LoaderCircle className="animate-spin" />
      &nbsp; Creating...
    </>
  ) : (
    "Create account"
  );
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {buttonContent}
    </Button>
  );
};

export default SignupForm;
