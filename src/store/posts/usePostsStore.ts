import { Comment, Post, Like, User } from "@prisma/client";
import { create } from "zustand";
import {
  addLikePostAction,
  deletePostAction,
  removeLikePostAction,
} from "./postsStoreActions";

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
  addPost: (post: InstaPost) => void;
  deletePost: (postId: number) => Promise<void>;
  addLikePost: (postId: number, userId: number) => Promise<void>;
  removeLikePost: (postId: number, userId: number) => Promise<void>;
};

type PostsStore = PostsStoreState & PostsStoreActions;

export type SetPostStore = {
  (
    partial:
      | PostsStore
      | Partial<PostsStore>
      | ((state: PostsStore) => PostsStore | Partial<PostsStore>),
    replace?: false
  ): void;
  (
    state: PostsStore | ((state: PostsStore) => PostsStore),
    replace: true
  ): void;
};

export const usePostsStore = create<PostsStore>()((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ posts })),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (postId) => deletePostAction(postId, set),
  addLikePost: (postId, userId) => addLikePostAction(postId, userId, set),
  removeLikePost: (postId, userId) => removeLikePostAction(postId, userId, set),
}));
