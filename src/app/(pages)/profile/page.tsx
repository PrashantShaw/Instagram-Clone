import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col p-6 gap-8 relative">
      <h1 className="text-4xl font-semibold">Profile</h1>
      <div className="absolute right-6 top-6">
        <LogoutButton />
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
          <p className="font-medium">Logout</p>
        </div>
      </Button>
    </form>
  );
};
export default ProfilePage;
