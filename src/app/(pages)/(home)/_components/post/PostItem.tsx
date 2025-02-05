import { InstaPost } from "@/store/posts/usePostsStore";
import React from "react";
import { getCreatedTimeAgo } from "@/lib/utils";
import { LikeButton } from "./LikeButton";
import PostItemDropdownMenu from "./PostItemDropdownMenu";
import FollowButton from "@/components/common/FollowButton";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import CommentForm from "./CommentForm";
import { useUserStore } from "@/store/user/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PostItemImage from "./PostItemImage";
import clsx from "clsx";
import { Comment } from "@prisma/client";

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
  const comments = post.comments;
  return (
    <div
      className={clsx(
        "min-h-[28.125rem] max-w-[58.4375rem] text-sm w-full border-b ",
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
          "flex flex-col",
          fullSize ? "lg:border-l lg:w-[20.9375rem] lg:shrink-0" : ""
        )}
      >
        <div className={clsx("", fullSize ? "" : "")}>
          <PostHeader
            fullSize={fullSize}
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
        <PostComments comments={comments} enabled={fullSize} />
        <PostBody
          fullSize={fullSize}
          content={post.content}
          isLiked={isLiked}
          loggedInUserId={loggedInUserId}
          postId={postId}
          comments={comments}
          totalLikes={totalLikes}
          username={post.creator.username}
        />
      </div>
    </div>
  );
};

type PostHeaderProps = {
  fullSize: boolean;
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
  fullSize,
}: PostHeaderProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 py-3 px-4 ",
        fullSize ? "sm:px-5" : "sm:px-0"
      )}
    >
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

type PostCommentsProps = {
  enabled: boolean;
  comments: Comment[];
};

// FIXME: add a min and a max height to the comments container
const PostComments = ({ comments, enabled }: PostCommentsProps) => {
  console.log(comments);
  return (
    <div
      className={clsx(
        "py-2 border-t border-b px-5 overflow-y-scroll hidden h-full min-h-[14.375rem] max-h-[28.5rem]",
        enabled ? "lg:block" : ""
      )}
    >
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="py-3">
            <div className="flex items-start gap-3">
              <Avatar className="w-11 h-11 group-hover:scale-[105%] transition-all">
                <AvatarImage src="https://github.com/shadcn.pngg" />
                <AvatarFallback
                  className={clsx(
                    "font-semibold text-secondary-foreground text-xs",
                    "bg-secondary"
                  )}
                >
                  UId-{comment.userId}
                </AvatarFallback>
              </Avatar>
              <div className="">
                <p className="text-sm font-semibold">{comment.comment}</p>
                <button>
                  <p className="text-xs text-muted-foreground">Reply</p>
                </button>
              </div>
              <div className="ml-auto">
                <Heart className="text-muted-foreground w-4 h-4" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-3">
          <p className="text-center font-semibold text-muted-foreground">
            No Comment Yet!
          </p>
        </div>
      )}
    </div>
  );
};

type PostBodyProps = {
  isLiked: boolean;
  loggedInUserId: number;
  postId: number;
  totalLikes: number;
  username: string;
  content: string | null;
  comments: Comment[];
  fullSize: boolean;
};
const PostBody = ({
  isLiked,
  loggedInUserId,
  postId,
  totalLikes,
  username,
  content,
  comments,
  fullSize,
}: PostBodyProps) => {
  return (
    <div
      className={clsx(
        "py-3 px-4 mt-auto space-y-3",
        fullSize ? "sm:px-5" : "sm:px-0"
      )}
    >
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
      <div className={clsx("", fullSize ? "lg:hidden" : "")}>
        <Link href={`/posts/${postId}`}>
          <button className="text-muted-foreground">
            View all {comments.length > 0 ? comments.length : ""} comments
          </button>
        </Link>
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
