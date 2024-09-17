import { fetchPosts } from "@/lib/helpers/fetchers";
import React from "react";
import PostsProvider from "./PostsProvider";
import PostsWrapper from "./PostsWrapper";

const Posts = async () => {
  const { success, data: posts, error } = await fetchPosts();

  if (success === false) {
    return <p className="text-red-600 text-center font-semibold">{error}</p>;
  }

  return (
    <PostsProvider posts={posts ?? []}>
      <PostsWrapper />
    </PostsProvider>
  );
};

export default Posts;
