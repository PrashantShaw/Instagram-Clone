"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { createUser } from "@/lib/actions/auth.actions";
import { Button } from "../ui/button";

const SignupForm = () => {
  const [errors, formAction] = useFormState(createUser, {});
  return (
    <div>
      <form action={formAction}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="Create an username for your identity "
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a strong password"
            />
          </div>
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

export default SignupForm;
