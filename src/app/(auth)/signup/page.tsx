import SignupForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
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
              <Button variant="outline">
                {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
                Github
              </Button>
              <Button variant="outline">
                {/* <Icons.google className="mr-2 h-4 w-4" /> */}
                Google
              </Button>
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
          {/* <CardFooter>
            <Button className="w-full">Create account</Button>
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
};

export default page;
