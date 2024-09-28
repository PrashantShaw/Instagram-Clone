import SignupForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
    <Button variant="outline">
      <Image
        src="/images/common/github-icon.png"
        alt="Github Icon"
        width={16}
        height={16}
        className="mr-[6px]"
      />
      Github
    </Button>
  );
};
const GoogleLoginButton = () => {
  return (
    <Button variant="outline">
      <Image
        src="/images/common/google-icon.png"
        alt="Github Icon"
        width={16}
        height={16}
        className="mr-[6px]"
      />
      Google
    </Button>
  );
};

export default page;
