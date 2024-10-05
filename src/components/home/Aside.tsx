import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/components/common/FollowButton";
import {
  HOME_ASIDE_FOOTER_LINKS,
  SUGGESTED_FOR_YOU_DATA,
} from "@/lib/constants/atoms";
import clsx from "clsx";
import { ProfileAsideItem } from "./ProfileAsideItem";

const Aside = () => {
  return (
    <div className="flex-grow max-w-[20rem] pt-10 flex flex-col items-center px-4">
      <div className=" w-full space-y-6">
        {/* prifile */}
        <ProfileAsideItem />
        {/* suggestions */}
        <div className="">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">
              Suggested for you
            </p>
            <button className="text-xs font-semibold hover:text-gray-400">
              See All
            </button>
          </div>
          <div className="py-4 space-y-4">
            {SUGGESTED_FOR_YOU_DATA.map((suggestedUser, idx) => (
              <SuggestedAsideItem
                key={idx}
                suggestedUser={suggestedUser}
                idx={idx}
              />
            ))}
          </div>
        </div>
        {/* aside footer */}
        <div className="">
          <div className="flex items-center gap-1 flex-wrap">
            {HOME_ASIDE_FOOTER_LINKS.map((link, idx) => (
              <>
                <Link
                  href={link.href}
                  className="text-xs text-[rgb(199,199,199)] hover:underline"
                >
                  {link.label}
                </Link>
                {idx !== HOME_ASIDE_FOOTER_LINKS.length - 1 && (
                  <span className="text-[rgb(199,199,199)] text-xs">·</span>
                )}
              </>
            ))}
          </div>
          <p className="text-xs text-[rgb(199,199,199)] pt-5">
            {"© 2024 Instagram from Meta".toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

type SuggestedAsideItemProps = {
  suggestedUser: {
    username: string;
    followedBy: string;
  };
  idx: number;
};

const SuggestedAsideItem = ({
  suggestedUser,
  idx,
}: SuggestedAsideItemProps) => {
  const avatarInitials = suggestedUser.username[0].toUpperCase();
  const avatarColors = [
    "bg-emerald-800",
    "bg-pink-800",
    "bg-violet-800",
    "bg-yellow-800",
    "bg-cyan-800",
  ];
  return (
    <div className="flex items-center justify-between">
      <Link href={"/"}>
        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11 group-hover:scale-[105%] transition-all">
            <AvatarImage src="https://github.com/shadcn.pngg" />
            <AvatarFallback
              className={clsx(
                "font-semibold text-primary-foreground bg-",
                avatarColors[idx]
              )}
            >
              {avatarInitials}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="text-sm font-semibold">{suggestedUser.username}</p>
            <p className="text-xs text-gray-500">
              Followed by {suggestedUser.followedBy}
            </p>
          </div>
        </div>
      </Link>
      <FollowButton size="small" />
    </div>
  );
};

export default Aside;
