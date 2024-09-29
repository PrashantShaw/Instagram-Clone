"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { createUser } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";
import { useForm, SubmitHandler, Controller, Control } from "react-hook-form";
import { SignupFormData, signupSchemaZ } from "@/lib/constants/definitions";
import clsx from "clsx";

const SignupForm = () => {
  // const [_errors, formAction] = useFormState(createUser, {});
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

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    console.log("Signup form data ::", data);
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
            <Button type="submit" className="w-full">
              Create account
            </Button>
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

export default SignupForm;
