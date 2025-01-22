import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { SETTINGS_LINK } from "@/lib/constants/atoms";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col px-6 md:py-6 pt-[4.25rem] pb-6 gap-8 relative">
      <div className="flex justify-between gap-2 items-center">
        <h1 className="text-4xl font-semibold">Profile</h1>
        {/* <div className="absolute right-6 top-6"> */}
        <div className="flex items-center gap-1">
          <LogoutButton />
          <Button asChild variant={"ghost"} size={"icon"}>
            <Link className="md:hidden" href={SETTINGS_LINK.href}>
              <SETTINGS_LINK.iconSolid size={18} />
            </Link>
          </Button>
        </div>
        {/* </div> */}
      </div>
      <hr />
      <div className="">
        <h2 className="pb-4 font-semibold">User Session -</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
};

const LogoutButton = async () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <Button variant={"ghost"} type="submit">
        <div className=" flex items-center gap-2 ">
          <LogOut size={18} className="" />
          <p className="font-medium hidden md:block">Logout</p>
        </div>
      </Button>
    </form>
  );
};
export default ProfilePage;
