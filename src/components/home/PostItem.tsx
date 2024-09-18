import { InstaPost } from "@/store/posts/usePostsStore";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getCreatedTimeAgo } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { LikeButton } from "./LikeButton";

// TODO: apply font: apple-system
export type PostProps = {
  post: InstaPost;
};
const PostItem = ({ post }: PostProps) => {
  const avatarFallbackText = post.creator.username[0].toUpperCase();
  const createdTimeAgo = getCreatedTimeAgo(post.createdAt);
  const loggedInUserId = 1;
  const isLiked = post.likes.some((like) => like.userId === loggedInUserId);
  const postId = post.id;
  return (
    <div className="max-w-[29.375rem] border-b text-sm w-full py-2">
      {/* header */}
      <div className="flex items-center gap-2 py-2">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10 group-hover:scale-[105%] transition-all">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className=" bg-gray-800 font-semibold text-primary-foreground">
              {avatarFallbackText}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <p className="font-semibold">{post.creator.username}</p>
            <span className="text-gray-500">•</span>
            <p className="text-gray-500">{createdTimeAgo}</p>
            <span className="text-gray-500">•</span>
            <p className="text-instaBlueBtn hover:text-instaBlueBtnHover font-semibold cursor-pointer">
              Follow
            </p>
          </div>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button>
                <Ellipsis size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="font-semibold hover:!text-red-800 text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* image */}
      <div className="flex border rounded">
        <Image
          src={post.imagePath}
          alt="Post Image"
          width={5000}
          height={5000}
        />
      </div>
      {/* content */}
      <div className="py-3">
        <div className="flex items-center gap-3">
          <LikeButton
            isLiked={isLiked}
            userId={loggedInUserId}
            postId={postId}
          />
        </div>
      </div>
    </div>
  );
};

export default PostItem;
