import Image from "next/image";
import React from "react";
import InstagramTextLogo from "@public/images/common/instagram_text_logo.png";
import Link from "next/link";
import { NavLinks } from "./NavLinks";
import AvatarItem from "./AvatarItem";

const SideNav = () => {
  return (
    <div className="border-r h-screen w-full max-w-[15.25rem] p-4 z-10">
      <div className="flex flex-col h-full">
        {/* logo */}
        <div className="py-4 px-2">
          <Link href={"/"} className="">
            <Image
              src={InstagramTextLogo}
              alt="instagram text logo"
              width={110}
            />
          </Link>
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
