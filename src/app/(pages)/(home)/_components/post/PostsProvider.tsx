"use client";
import { InstaPost, usePostsStore } from "@/store/posts/usePostsStore";
import { UserStoreState, useUserStore } from "@/store/user/useUserStore";
import React from "react";

export type PostsProviderProps = {
  children: React.ReactNode;
  posts: InstaPost[];
  user: UserStoreState["user"];
};
const PostsProvider = ({ children, posts, user }: PostsProviderProps) => {
  usePostsStore.setState({ posts });
  useUserStore.setState({ user });
  return children;
};

export default PostsProvider;
