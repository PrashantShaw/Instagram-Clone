import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const AvatarItem = () => {
  return (
    <Link href={"/profile"}>
      <div className="flex items-center gap-4 hover:bg-secondary rounded-md px-2 py-3 transition-all group">
        <Avatar className="w-6 h-6 group-hover:scale-[105%] transition-all">
          <AvatarImage src="https://github.com/shadcn.pngg" />
          <AvatarFallback className="text-xs bg-gray-800 font-semibold text-primary-foreground">
            P
          </AvatarFallback>
        </Avatar>
        <p className="">Profile</p>
      </div>
    </Link>
  );
};

export default AvatarItem;
