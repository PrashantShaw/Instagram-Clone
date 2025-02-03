import React from "react";
import Instagram from "./Instagram";
import TopbarLinks from "./TopbarLinks";
import { auth } from "@/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";

const TopBar = async () => {
  const session = await auth();
  const isAuthenticated = session && session.user;

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-50 border-b border-muted-foreground/50 px-4 py-1 w-full bg-background block ",
        isAuthenticated ? "md:hidden" : ""
      )}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="">
          <Instagram width={102} />
        </div>
        <div className="">
          {isAuthenticated ? <TopbarLinks /> : <AuthActionBtns />}
        </div>
      </div>
    </div>
  );
};

const AuthActionBtns = () => {
  return (
    <div className="">
      <Link href={"/signup"} className="mr-2">
        <Button variant={"secondary"} size={"sm"}>
          Signup
        </Button>
      </Link>
      <Link href={"/login"}>
        <Button size={"sm"}>Login</Button>
      </Link>
    </div>
  );
};

export default TopBar;
