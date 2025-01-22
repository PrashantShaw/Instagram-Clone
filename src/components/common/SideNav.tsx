import React from "react";
import { NavLinks } from "./NavLinks";
import AvatarItem from "./AvatarItem";
import Instagram from "./Instagram";

const SideNav = () => {
  return (
    <div className="border-r h-screen w-full max-w-[15.25rem] p-4 z-10 hidden md:block">
      <div className="flex flex-col h-full">
        {/* logo */}
        <div className="py-4 px-2">
          <Instagram />
        </div>
        {/* links */}
        <NavLinks />
        {/* nav footer */}
        <div className="mt-auto">
          <AvatarItem />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
