"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { PROFILE_LINK } from "@/lib/constants/atoms";
const AvatarItem = () => {
  const pathname = usePathname();
  const isActive = pathname === PROFILE_LINK.href;
  return (
    <Link href={PROFILE_LINK.href}>
      <div className="flex items-center gap-4 hover:bg-secondary rounded-md px-2 py-3 transition-all group">
        {isActive ? <PROFILE_LINK.iconSolid /> : <PROFILE_LINK.icon />}
        <p className={clsx(isActive ? "font-bold" : "")}>
          {PROFILE_LINK.label}
        </p>
      </div>
    </Link>
  );
};

export default AvatarItem;
