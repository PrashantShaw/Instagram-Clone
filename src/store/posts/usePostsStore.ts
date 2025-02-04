import { Comment, Post, Like, User } from "@prisma/client";
import { create } from "zustand";
import {
  addCommentPostAction,
  addLikePostAction,
  deletePostAction,
  removeLikePostAction,
} from "./postsStoreActions";
import { CommentFormData } from "@/lib/actions/feed.actions";

export type InstaPost = Post & {
  comments: Comment[];
  likes: Like[];
  creator: User;
};

type PostsStoreState = {
  posts: InstaPost[];
  postIdToDelete: number | null;
};

type PostsStoreActions = {
  setPosts: (posts: PostsStoreState["posts"]) => void;
  setPostIdToDelete: (
    setPostIdToDelete: PostsStoreState["postIdToDelete"]
  ) => void;
  addPost: (post: InstaPost) => void;
  // getPostItem: (postId: number) => Promise<InstaPost>;
  deletePost: (postId: number) => Promise<void>;
  addLikePost: (postId: number, userId: number) => Promise<void>;
  removeLikePost: (postId: number, userId: number) => Promise<void>;
  addCommentPost: (formData: CommentFormData) => Promise<void>;
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

export type GetPostStore = () => PostsStore;

export const usePostsStore = create<PostsStore>()((set) => ({
  posts: [],
  postIdToDelete: null,
  setPosts: (posts) => set({ posts }),
  setPostIdToDelete: (postIdToDelete) => set({ postIdToDelete }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (postId) => deletePostAction(postId, set),
  addLikePost: (postId, userId) => addLikePostAction(postId, userId, set),
  removeLikePost: (postId, userId) => removeLikePostAction(postId, userId, set),
  addCommentPost: (formData) => addCommentPostAction(formData, set),
}));
