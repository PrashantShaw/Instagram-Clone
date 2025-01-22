"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import instagramLight from "@public/images/common/instagram-light.png";
import instagramDark from "@public/images/common/instagram_dark.png";
import { useTheme } from "next-themes";
import Link from "next/link";

const Instagram = ({ width = 110 }: { width?: number }) => {
  const { theme } = useTheme();
  const [instagramImage, setInstagramImage] =
    useState<StaticImageData>(instagramLight);
  useEffect(() => {
    setInstagramImage(theme === "light" ? instagramDark : instagramLight);
  }, [theme]);
  return (
    <Link href={"/"} className="">
      <Image src={instagramImage} alt="instagram text logo" width={width} />
    </Link>
  );
};

export default Instagram;
