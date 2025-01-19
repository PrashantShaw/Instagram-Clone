"use client";
import React from "react";
import Link from "next/link";
import { FaRegUser, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import clsx from "clsx";
const AvatarItem = () => {
  const pathname = usePathname();
  const isActive = pathname === "/profile";
  return (
    <Link href={"/profile"}>
      <div className="flex items-center gap-4 hover:bg-secondary rounded-md px-2 py-3 transition-all group">
        {isActive ? <FaUser /> : <FaRegUser />}
        <p className={clsx(isActive ? "font-bold" : "")}>Profile</p>
      </div>
    </Link>
  );
};

export default AvatarItem;
