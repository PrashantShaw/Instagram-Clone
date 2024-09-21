"use client";
import React from "react";
import PostItem from "./PostItem";
import { usePostsStore } from "@/store/posts/usePostsStore";

const PostsWrapper = () => {
  const { posts } = usePostsStore();
  return (
    <div className="flex-grow max-w-[40rem] pt-8 flex flex-col items-center ">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsWrapper;
