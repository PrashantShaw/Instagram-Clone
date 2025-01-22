import React from "react";
import Instagram from "./Instagram";
import TopbarLinks from "./TopbarLinks";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 z-50 border-b border-muted-foreground/50 px-4 py-1 w-full bg-background block md:hidden">
      <div className="flex justify-between items-center gap-2">
        <div className="">
          <Instagram width={102} />
        </div>
        <div className="border">
          <TopbarLinks />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
