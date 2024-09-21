import { deletePost, updateLike } from "@/lib/helpers/updaters";
import { InstaPost, SetPostStore } from "./usePostsStore";

export const addLikePostAction = async (
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

export const removeLikePostAction = async (
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

export const deletePostAction = async (postId: number, set: SetPostStore) => {
  let deletedPost: InstaPost;
  let deletedIdx: number;

  // 1. optimistic update
  set((state) => {
    const optimisticPosts = state.posts.filter((post, idx) => {
      if (post.id === postId) {
        deletedPost = post;
        deletedIdx = idx;
        return false;
      }
      return true;
    });
    return {
      posts: optimisticPosts,
    };
  });
  // 2. db update
  const result = await deletePost(postId, deletedPost!.imagePath);
  // 3. revert optimistic update if db update fails
  if (result.success === false) {
    set(({ posts }) => {
      const revertedPosts = [
        ...posts.slice(0, deletedIdx),
        deletedPost,
        ...posts.slice(deletedIdx),
      ];
      return {
        posts: revertedPosts,
      };
    });
  }
};
