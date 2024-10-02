"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";
import { useForm, SubmitHandler, Controller, Control } from "react-hook-form";
import { SignupFormData, signupSchemaZ } from "@/lib/constants/definitions";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const SignupForm = () => {
  // const [_errors, formAction] = useFormState(createUser, {});
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
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
      const { success, error, data } = await createUser(formData);
      if (success) {
        toast.success("User successfully Created!", {
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
            <CreateAccountButton isSubmitting={isSubmitting} />
          </div>
        </div>
      </form>
    </div>
  );
};

type ControllerInputProps = {
  control: Control<SignupFormData, any>;
  name: keyof SignupFormData;
  type: HTMLInputElement["type"];
  placeholder: string;
  label: string;
};
const ControllerInput = ({
  control,
  name,
  type,
  placeholder,
  label,
}: ControllerInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <Label htmlFor={name}>{label}</Label>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={clsx(
              " focus-visible:ring-2 focus-visible:ring-offset-0",
              error ? "ring-2 ring-red-600  focus-visible:ring-red-600" : ""
            )}
          />
          {error ? (
            <p className="absolute top-[105%] right-0 text-xs text-red-600">
              {error.message}
            </p>
          ) : null}
        </div>
      )}
    />
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
