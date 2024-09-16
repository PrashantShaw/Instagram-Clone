import { Comment, Post, Like } from "@prisma/client";
import { create } from "zustand";

type InstaPost = Post & {
  comments: Comment[];
  likes: Like[];
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
