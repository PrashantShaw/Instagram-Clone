"use client";
import PostItem from "@/app/(pages)/(home)/_components/post/PostItem";
import PostItemProvider from "./PostItemProvider";
import { InstaPost, usePostsStore } from "@/store/posts/usePostsStore";
import { UserStoreState } from "@/store/user/useUserStore";
import { useMemo } from "react";

type PostItemWrapperProps = {
  post: InstaPost | null;
  user: UserStoreState["user"];
};
const PostItemWrapper = ({ post, user }: PostItemWrapperProps) => {
  if (!post)
    return (
      <p className="text-red-500 font-semibold p-6 text-center">
        Post not found!
      </p>
    );
  return (
    <PostItemProvider post={post} user={user}>
      <PostItemWithData id={post.id} />
    </PostItemProvider>
  );
};

const PostItemWithData = ({ id }: { id: number }) => {
  const { posts } = usePostsStore();
  const post = useMemo(() => posts.find((p) => p.id === id), [id, posts]);

  if (posts.length < 1) return <p>Loading...</p>;

  if (!post)
    return (
      <p className="text-red-500 font-semibold p-6 text-center">
        Post not found!
      </p>
    );
  return <PostItem post={post} />;
};

export default PostItemWrapper;
