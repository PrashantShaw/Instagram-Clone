"use client";
import { NAV_LINKS } from "@/lib/constants/atoms";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

export const NavLinks = () => {
  return (
    <div className="py-4 flex flex-col gap-1">
      {NAV_LINKS.map((link, idx) => (
        <NavItem key={idx} link={link} />
      ))}
    </div>
  );
};

export type NavLink = {
  label: string;
  href: string;
  icon: IconType;
  iconSolid: IconType;
};
export type NavItemProps = {
  link: NavLink;
};

const NavItem = ({ link }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = link.href === pathname;
  return (
    <Link href={link.href}>
      <div className="flex items-center gap-4 hover:bg-secondary rounded-md px-2 py-3 transition-all group">
        {/* <link.icon
          className={clsx(
            "group-hover:scale-[105%]",
            isActive ? "scale-105" : ""
          )}
        /> */}
        {isActive ? (
          <link.iconSolid className="text-2xl" />
        ) : (
          <link.icon className="text-2xl" />
        )}
        <p className={clsx(isActive ? "font-bold" : "")}>{link.label}</p>
      </div>
    </Link>
  );
};
