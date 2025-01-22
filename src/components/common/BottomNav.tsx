import React from "react";
import BottomLinks from "./BottomLinks";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 z-50 border-t border-muted-foreground/50 px-4 py-1 w-full bg-background block md:hidden">
      <BottomLinks />
    </div>
  );
};

export default BottomNav;
