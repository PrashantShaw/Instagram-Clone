"use client";

import Image from "next/image";
import React from "react";
import instagramLight from "@public/images/common/instagram-light.png";
import instagramDark from "@public/images/common/instagram_dark.png";
import { useTheme } from "next-themes";
import Link from "next/link";

const Instagram = () => {
  const { theme } = useTheme();
  console.log("themeeeee", theme);
  const instagramText = theme === "light" ? instagramDark : instagramLight;
  return (
    <Link href={"/"} className="">
      <Image src={instagramText} alt="instagram text logo" width={110} />
    </Link>
  );
};

export default Instagram;
