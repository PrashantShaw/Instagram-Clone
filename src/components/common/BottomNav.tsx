import React from "react";
import BottomLinks from "./BottomLinks";
import { auth } from "@/auth";

const BottomNav = async () => {
  const session = await auth();
  if (!session || !session.user) return null;
  return (
    <div className="fixed bottom-0 left-0 z-50 border-t border-muted-foreground/50 px-4 py-1 w-full bg-background block md:hidden">
      <BottomLinks />
    </div>
  );
};

export default BottomNav;
