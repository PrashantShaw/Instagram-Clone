"use client";

import { usePostsStore } from "@/store/posts/usePostsStore";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Trash2 } from "lucide-react";

const DeletePostMenuItem = ({ postId }: { postId: number }) => {
  const { setPostIdToDelete } = usePostsStore();

  return (
    <DropdownMenuItem
      className="font-semibold hover:!text-red-800 text-red-600"
      onClick={() => setPostIdToDelete(postId)}
    >
      <Trash2 className="w-[1.125rem] h-[1.125rem] mr-2" /> Delete
    </DropdownMenuItem>
  );
};

export default DeletePostMenuItem;
