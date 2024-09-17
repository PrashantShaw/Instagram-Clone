import { Comment, Post, Like, User } from "@prisma/client";
import { create } from "zustand";

export type InstaPost = Post & {
  comments: Comment[];
  likes: Like[];
  creator: User;
};

type PostsStoreState = {
  posts: InstaPost[];
};

type PostsStoreActions = {
  setPosts: (posts: PostsStoreState["posts"]) => void;
};

type PostsStore = PostsStoreState & PostsStoreActions;

export const usePostsStore = create<PostsStore>()((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ posts })),
}));
