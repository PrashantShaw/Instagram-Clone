"use client";

import { usePostsStore } from "@/store/posts/usePostsStore";
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

type PostItemImageProps = {
  imagePath: string;
  userId: number;
  postId: number;
};
const PostItemImage = ({ imagePath, userId, postId }: PostItemImageProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const LIKE_ANIMATION_DURATION = 900; // check tailwin.config.ts file 'animation' section
  const { addLikePost } = usePostsStore();
  const handleToggleLike = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    addLikePost(postId, userId);

    setTimeout(() => setIsAnimating(false), LIKE_ANIMATION_DURATION);
  };
  return (
    <div
      className="flex border-t border-b sm:rounded overflow-hidden relative"
      onDoubleClick={handleToggleLike}
    >
      <Image src={imagePath} alt="Post Image" width={5000} height={5000} />
      {isAnimating ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-doubleTapLikeRiseUp">
          <FaHeart className=" text-[#ff3040] w-32 h-32 animate-doubleTapLikeBounceIn" />
        </div>
      ) : null}
    </div>
  );
};

export default PostItemImage;
