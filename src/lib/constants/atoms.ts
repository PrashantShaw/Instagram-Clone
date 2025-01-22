import {
  FaCompass,
  FaHeart,
  FaRegCompass,
  FaRegHeart,
  FaRegUser,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearch, IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { RiAddBoxFill, RiAddBoxLine, RiSendPlaneFill } from "react-icons/ri";

export const PROFILE_LINK = {
  label: "Profile",
  href: "/profile",
  icon: FaRegUser,
  iconSolid: FaUser,
};
export const SETTINGS_LINK = {
  label: "Settings",
  href: "/settings",
  icon: IoSettingsOutline,
  iconSolid: IoSettingsSharp,
};

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    iconSolid: GoHomeFill,
  },
  {
    label: "Search",
    href: "/search",
    icon: IoSearch,
    iconSolid: FaSearch,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: FaRegCompass,
    iconSolid: FaCompass,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: FaRegHeart,
    iconSolid: FaHeart,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: TbSend,
    iconSolid: RiSendPlaneFill,
  },
  {
    label: "Create",
    href: "/create",
    icon: RiAddBoxLine,
    iconSolid: RiAddBoxFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: IoSettingsOutline,
    iconSolid: IoSettingsSharp,
  },
];
export const TOPBAR_LINKS = [
  {
    label: "Create",
    href: "/create",
    icon: RiAddBoxLine,
    iconSolid: RiAddBoxFill,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: FaRegHeart,
    iconSolid: FaHeart,
  },
];

export const BOTTOM_NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    iconSolid: GoHomeFill,
  },
  {
    label: "Search",
    href: "/search",
    icon: IoSearch,
    iconSolid: FaSearch,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: FaRegCompass,
    iconSolid: FaCompass,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: TbSend,
    iconSolid: RiSendPlaneFill,
  },
  PROFILE_LINK,
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
