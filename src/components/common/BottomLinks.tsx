"use client";

import { BOTTOM_NAV_LINKS } from "@/lib/constants/atoms";
import { IconLink } from "./TopbarLinks";

const BottomLinks = () => {
  return (
    <div className="flex gap-2 justify-around py-3">
      {BOTTOM_NAV_LINKS.map((link, idx) => (
        <IconLink key={idx} link={link} />
      ))}
    </div>
  );
};

export default BottomLinks;
