import { Heart, House, Search, Send, Settings, SquarePlus } from "lucide-react";

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: House,
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
