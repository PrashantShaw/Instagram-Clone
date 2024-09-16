"use client";
import { NAV_LINKS } from "@/lib/constants/atoms";
import clsx from "clsx";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const NavLinks = () => {
  return (
    <div className="py-4">
      {NAV_LINKS.map((link, idx) => (
        <NavItem key={idx} link={link} />
      ))}
    </div>
  );
};

export type NavLink = {
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
export type NavItemProps = {
  link: NavLink;
};

const NavItem = ({ link }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = link.href === pathname;
  return (
    <Link href={link.href}>
      <div className="flex items-center gap-4 hover:bg-gray-50 rounded-md px-2 py-3 transition-all group">
        <link.icon
          className={clsx(
            "group-hover:scale-[105%]",
            isActive ? "scale-105" : ""
          )}
        />
        <p className={clsx(isActive ? "font-bold" : "")}>{link.label}</p>
      </div>
    </Link>
  );
};
