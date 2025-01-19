import { fetchPosts } from "@/lib/helpers/fetchers";
import React from "react";
import PostsProvider from "./PostsProvider";
import PostsWrapper from "./PostsWrapper";
import { auth } from "@/auth";

const Posts = async () => {
  const { success, data: posts, error } = await fetchPosts();
  const session = await auth();

  if (success === false) {
    return <p className="text-red-600 text-center font-semibold">{error}</p>;
  }

  return (
    <PostsProvider posts={posts ?? []} user={session?.user ?? null}>
      <PostsWrapper />
    </PostsProvider>
  );
};

export default Posts;
