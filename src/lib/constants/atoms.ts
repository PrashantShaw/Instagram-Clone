import { Heart, House, Search, Send, Settings, SquarePlus } from "lucide-react";
// import { GoHome, GoHomeFill } from "react-icons/go";

// TODO: add filled icons for selected tab
export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: House,
    // icon: GoHome,
    // iconDark: GoHomeFill
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Search,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Heart,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: Send,
  },
  {
    label: "Create",
    href: "/create",
    icon: SquarePlus,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const SUGGESTED_FOR_YOU_DATA = [
  {
    username: "soulful_96cancerian",
    followedBy: "kankana.banerjee",
  },
  {
    username: "vaishali_0499",
    followedBy: "shawravi200",
  },
  {
    username: "simranshaw258",
    followedBy: "shawravi200",
  },
  {
    username: "the_ocean_ruler",
    followedBy: "aditya250795",
  },
  {
    username: "sreyadey05",
    followedBy: "shawravi200",
  },
];

export const HOME_ASIDE_FOOTER_LINKS = [
  {
    label: "About",
    href: "/",
  },
  {
    label: "Help",
    href: "/",
  },
  {
    label: "Press",
    href: "/",
  },
  {
    label: "API",
    href: "/",
  },
  {
    label: "Jobs",
    href: "/",
  },
  {
    label: "Privacy",
    href: "/",
  },
  {
    label: "Terms",
    href: "/",
  },
  {
    label: "Locations",
    href: "/",
  },
  {
    label: "Language",
    href: "/",
  },
  {
    label: "Meta Verified",
    href: "/",
  },
];
