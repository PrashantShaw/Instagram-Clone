import { InstaPost } from "@/store/posts/usePostsStore";
import React from "react";
import { getCreatedTimeAgo } from "@/lib/utils";
import { LikeButton } from "./LikeButton";
import PostItemDropdownMenu from "./PostItemDropdownMenu";
import FollowButton from "@/components/common/FollowButton";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import CommentForm from "./CommentForm";
import { useUserStore } from "@/store/user/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostItemImage from "./PostItemImage";
import clsx from "clsx";

export type PostProps = {
  post: InstaPost;
  fullSize?: boolean;
};
const PostItem = ({ post, fullSize = false }: PostProps) => {
  const avatarFallbackText = post.creator.username[0].toUpperCase();
  const createdTimeAgo = getCreatedTimeAgo(post.createdAt);
  const { user } = useUserStore();
  const loggedInUserId = Number(user?.uid);
  const isLiked = post.likes.some((like) => like.userId === loggedInUserId);
  const isCreator = post.creatorId === loggedInUserId;
  const postId = post.id;
  const totalLikes = post.likes.length;
  const totalComments = post.comments.length;
  return (
    <div
      className={clsx(
        "max-w-[58.4375rem] text-sm w-full border-b ",
        fullSize ? "lg:border lg:flex md:mx-6" : "py-2"
      )}
    >
      <div
        className={clsx(
          "hidden",
          fullSize ? "lg:grid lg:place-items-center" : ""
        )}
      >
        <PostItemImage
          imagePath={post.imagePath}
          isLiked={isLiked}
          userId={loggedInUserId}
          postId={postId}
        />
      </div>
      <div
        className={clsx(
          "",
          fullSize ? "sm:px-4 lg:w-[20.9375rem] lg:shrink-0" : ""
        )}
      >
        <div className={clsx("", fullSize ? "" : "")}>
          <PostHeader
            avatarFallbackText={avatarFallbackText}
            createdTimeAgo={createdTimeAgo}
            isCreator={isCreator}
            postId={postId}
            username={post.creator.username}
          />
        </div>
        <div className={clsx("", fullSize ? "lg:hidden" : "")}>
          <PostItemImage
            imagePath={post.imagePath}
            isLiked={isLiked}
            userId={loggedInUserId}
            postId={postId}
          />
        </div>
        <PostBody
          content={post.content}
          isLiked={isLiked}
          loggedInUserId={loggedInUserId}
          postId={postId}
          totalComments={totalComments}
          totalLikes={totalLikes}
          username={post.creator.username}
        />
      </div>
    </div>
  );
};

type PostHeaderProps = {
  avatarFallbackText: string;
  username: string;
  createdTimeAgo: string;
  postId: number;
  isCreator: boolean;
};

const PostHeader = ({
  avatarFallbackText,
  username,
  createdTimeAgo,
  postId,
  isCreator,
}: PostHeaderProps) => {
  return (
    <div className="flex items-center gap-2 py-3 px-4 sm:px-0">
      <div className="flex items-center gap-2">
        <Avatar className="w-10 h-10 group-hover:scale-[105%] transition-all">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className=" bg-primary font-semibold text-primary-foreground">
            {avatarFallbackText}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1">
          <p className="font-semibold">{username}</p>
          <span className="text-muted-foreground">•</span>
          <p className="text-muted-foreground">{createdTimeAgo}</p>
          <span className="text-muted-foreground">•</span>
          <FollowButton />
        </div>
      </div>
      <div className="ml-auto">
        <PostItemDropdownMenu postId={postId} isCreator={isCreator} />
      </div>
    </div>
  );
};
type PostBodyProp = {
  isLiked: boolean;
  loggedInUserId: number;
  postId: number;
  totalLikes: number;
  username: string;
  content: string | null;
  totalComments: number;
};
const PostBody = ({
  isLiked,
  loggedInUserId,
  postId,
  totalLikes,
  username,
  content,
  totalComments,
}: PostBodyProp) => {
  return (
    <div className="py-3 px-4 sm:px-0 space-y-3">
      <div className="flex items-center gap-4">
        <LikeButton isLiked={isLiked} userId={loggedInUserId} postId={postId} />
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
            {username}
          </Link>
          {" " + content}
        </p>
      </div>
      <div className="">
        <button className="text-muted-foreground">
          View all {totalComments > 0 ? totalComments : ""} comments
        </button>
      </div>
      <CommentForm userId={loggedInUserId} postId={postId} />
    </div>
  );
};
export const CommentButton = () => {
  return (
    <button title="Comment">
      <MessageCircle className="hover:text-muted-foreground rotate-[-90deg]" />
    </button>
  );
};
export const ShareButton = () => {
  return (
    <button title="Share">
      <Send className="hover:text-muted-foreground" />
    </button>
  );
};
export const SaveButton = () => {
  return (
    <button className="ml-auto" title="Save">
      <Bookmark className="hover:text-muted-foreground" />
    </button>
  );
};

export default PostItem;
