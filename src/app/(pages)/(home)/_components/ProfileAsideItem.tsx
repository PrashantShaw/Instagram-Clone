// import { useUserStore } from "@/store/user/useUserStore";
import Link from "next/link";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileAsideItem = async () => {
  const session = await auth();
  const { user } = session!;
  return (
    <div className="flex items-center justify-between">
      <Link href={"/profile"}>
        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11 group-hover:scale-[105%] transition-all">
            <AvatarImage src="https://github.com/shadcn.pngg" />
            <AvatarFallback className=" bg-secondary font-semibold text-secondary-foreground">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </Link>
      <button className="text-instaBlueBtn hover:text-instaBlueBtnHover font-semibold text-xs">
        Switch
      </button>
    </div>
  );
};
