import SideNav from "@/components/common/SideNav";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex relative">
      <SideNav />
      <div className="h-screen overflow-auto w-full">{children}</div>
    </main>
  );
};

export default layout;
