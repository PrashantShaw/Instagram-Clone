import { updateLike } from "@/lib/actions/feed.actions";
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
  addPost: (post: InstaPost) => void;
  addLikePost: (postId: number, userId: number) => Promise<void>;
  removeLikePost: (postId: number, userId: number) => Promise<void>;
};

type PostsStore = PostsStoreState & PostsStoreActions;

export const usePostsStore = create<PostsStore>()((set) => ({
  posts: [],
  setPosts: (posts) => set((state) => ({ posts })),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  addLikePost: async (postId, userId) => {
    // 1. optimistic update
    const tempId = Date.now();
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          post.likes.push({ id: tempId, userId, postId });
        }
        return post;
      }),
    }));
    // 2. db update
    const result = await updateLike(postId, userId, "LIKE");
    // 3. state update with real data
    if (result.success) {
      console.log(result.data);
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            post.likes.map((like) => {
              if (like.id === tempId) {
                like = result.data!;
              }
            });
          }
          return post;
        }),
      }));
    }
    // 4. revert optimistic update if db update fails
    else {
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            post.likes = post.likes.filter((like) => like.id !== tempId);
          }
          return post;
        }),
      }));
    }
  },
  removeLikePost: async (postId, userId) => {
    // 1. optimistic update
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          post.likes = post.likes.filter((like) => like.userId !== userId);
        }
        return post;
      }),
    }));
    // 2. db update
    const result = await updateLike(postId, userId, "REMOVE_LIKE");
    // 3. state update with real data
    if (result.success) {
      console.log(result.data);
    }
  },
}));
