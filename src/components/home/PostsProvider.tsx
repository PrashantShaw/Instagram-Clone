"use client";
import { InstaPost, usePostsStore } from "@/store/posts/usePostsStore";
import React from "react";

export type PostsProviderProps = {
  children: React.ReactNode;
  posts: InstaPost[];
};
const PostsProvider = ({ children, posts }: PostsProviderProps) => {
  usePostsStore.setState((state) => ({ posts }));
  return children;
};

export default PostsProvider;
