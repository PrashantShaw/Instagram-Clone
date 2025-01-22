import Instagram from "@/components/common/Instagram";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignupForm from "../_components/SignupForm";

const page = () => {
  return (
    <div className="flex sm:items-center pt-12 sm:pt-0 justify-center h-screen relative">
      <div className="fixed right-4 top-4 ">
        <Link href={"/login"}>
          <Button variant={"ghost"} className="font-semibold">
            Login
          </Button>
        </Link>
      </div>
      <div className="fixed left-6 top-6 text-2xl">
        <Instagram />
      </div>
      <div className="w-full p-4 max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <GithubLoginButton />
              <GoogleLoginButton />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const GithubLoginButton = () => {
  return (
    <Button variant="secondary">
      <FaGithub className="text-[1rem] mr-2" />
      Github
    </Button>
  );
};
const GoogleLoginButton = () => {
  return (
    <Button variant="secondary">
      <FcGoogle className="text-[1rem] mr-2" />
      Google
    </Button>
  );
};

export default page;
