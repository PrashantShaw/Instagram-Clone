import BottomNav from "@/components/common/BottomNav";
import SideNav from "@/components/common/SideNav";
import TopBar from "@/components/common/TopBar";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex relative">
      <TopBar />
      <SideNav />
      <div className="h-screen overflow-auto w-full">{children}</div>
      <BottomNav />
    </main>
  );
};

export default layout;
