"use client";
import { usePostsStore } from "@/store/posts/usePostsStore";
import clsx from "clsx";
import { Heart } from "lucide-react";
export type LikeButtonProps = {
  isLiked: boolean;
  userId: number;
  postId: number;
};
export const LikeButton = ({
  isLiked = false,
  userId,
  postId,
}: LikeButtonProps) => {
  const { addLikePost, removeLikePost } = usePostsStore();
  const handleToggleLike = () => {
    isLiked ? removeLikePost(postId, userId) : addLikePost(postId, userId);
  };
  return (
    <button onClick={handleToggleLike}>
      <Heart
        className={clsx(
          "transition-all",
          isLiked ? "text-[#ff3040]" : "hover:text-gray-500"
        )}
        fill={isLiked ? "#ff3040" : "none"}
      />
    </button>
  );
};
