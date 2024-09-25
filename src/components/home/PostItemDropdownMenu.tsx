"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { usePostsStore } from "@/store/posts/usePostsStore";

type PostItemDropdownMenuProps = {
  postId: number;
};

const PostItemDropdownMenu: React.FC<PostItemDropdownMenuProps> = ({
  postId,
}) => {
  const { deletePost } = usePostsStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="font-semibold hover:!text-red-800 text-red-600"
          onClick={() => deletePost(postId)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostItemDropdownMenu;
