"use client";
import { InstaPost, usePostsStore } from "@/store/posts/usePostsStore";
import { UserStoreState, useUserStore } from "@/store/user/useUserStore";
import React from "react";

export type PostItemProviderProps = {
  children: React.ReactNode;
  post: InstaPost;
  user: UserStoreState["user"];
};
const PostItemProvider = ({ children, post, user }: PostItemProviderProps) => {
  usePostsStore.setState((state) => {
    const postExists = state.posts.some((_) => _.id === post.id);
    return postExists ? state : { posts: [...state.posts, post] };
  });
  useUserStore.setState({ user });
  return children;
};

export default PostItemProvider;
