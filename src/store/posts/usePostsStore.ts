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
type SetPostStore = {
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
  addLikePost: (postId, userId) => addLikePostAction(postId, userId, set),
  removeLikePost: (postId, userId) => removeLikePostAction(postId, userId, set),
}));

// --- Store Actions ---
const addLikePostAction = async (
  postId: number,
  userId: number,
  set: SetPostStore
) => {
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
};

const removeLikePostAction = async (
  postId: number,
  userId: number,
  set: SetPostStore
) => {
  let deletedLike: InstaPost["likes"][0];
  // 1. optimistic update
  set((state) => ({
    posts: state.posts.map((post) => {
      if (post.id === postId) {
        post.likes = post.likes.filter((like) => {
          if (like.userId === userId) {
            deletedLike = like;
            return false;
          }
          return true;
        });
      }
      return post;
    }),
  }));
  // 2. db update
  const result = await updateLike(postId, userId, "REMOVE_LIKE");
  // 3. state update with real data
  if (result.success) {
    // NOTHING TO UPDATE
  }
  // 4. revert optimistic update if db update fails
  else {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          post.likes.push(deletedLike);
        }
        return post;
      }),
    }));
  }
};
