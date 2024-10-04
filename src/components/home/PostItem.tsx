import { InstaPost } from "@/store/posts/usePostsStore";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getCreatedTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { LikeButton } from "./LikeButton";
import PostItemDropdownMenu from "./PostItemDropdownMenu";
import FollowButton from "@/components/common/FollowButton";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import CommentForm from "./CommentForm";

export type PostProps = {
  post: InstaPost;
};
const PostItem = ({ post }: PostProps) => {
  const avatarFallbackText = post.creator.username[0].toUpperCase();
  const createdTimeAgo = getCreatedTimeAgo(post.createdAt);
  const loggedInUserId = 1;
  const isLiked = post.likes.some((like) => like.userId === loggedInUserId);
  const postId = post.id;
  const totalLikes = post.likes.length;
  const totalComments = post.comments.length;
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
            <FollowButton />
          </div>
        </div>
        <div className="ml-auto">
          <PostItemDropdownMenu postId={postId} />
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
      <div className="py-3 space-y-3">
        <div className="flex items-center gap-4">
          <LikeButton
            isLiked={isLiked}
            userId={loggedInUserId}
            postId={postId}
          />
          <CommentButton />
          <ShareButton />
          <SaveButton />
        </div>
        <div className="">
          <p className="font-semibold">
            {totalLikes} {totalLikes === 1 ? "like" : "likes"}
          </p>
        </div>
        <div className="">
          <p>
            <Link href={"/profile"} className="font-semibold">
              {post.creator.username}
            </Link>
            {" " + post.content}
          </p>
        </div>
        <div className="">
          <button className="text-gray-500">
            View all {totalComments > 0 ? totalComments : ""} comments
          </button>
        </div>
        <CommentForm userId={loggedInUserId} postId={postId} />
      </div>
    </div>
  );
};

export const CommentButton = () => {
  return (
    <button title="Comment">
      <MessageCircle className="hover:text-gray-500 rotate-[-90deg]" />
    </button>
  );
};
export const ShareButton = () => {
  return (
    <button title="Share">
      <Send className="hover:text-gray-500" />
    </button>
  );
};
export const SaveButton = () => {
  return (
    <button className="ml-auto" title="Save">
      <Bookmark className="hover:text-gray-500" />
    </button>
  );
};

export default PostItem;
