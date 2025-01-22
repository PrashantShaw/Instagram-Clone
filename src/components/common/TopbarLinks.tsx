"use client";

import Link from "next/link";
import { NavLink } from "./NavLinks";
import { usePathname } from "next/navigation";
import { TOPBAR_LINKS } from "@/lib/constants/atoms";

const TopbarLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {TOPBAR_LINKS.map((link, idx) => (
        <TopbarLink key={idx} link={link} />
      ))}
    </div>
  );
};

export const TopbarLink = ({ link }: { link: NavLink }) => {
  const pathname = usePathname();
  const isActive = link.href === pathname;

  return (
    <Link href={link.href}>
      {isActive ? (
        <link.iconSolid className="text-2xl" />
      ) : (
        <link.icon className="text-2xl" />
      )}
    </Link>
  );
};

export default TopbarLinks;
