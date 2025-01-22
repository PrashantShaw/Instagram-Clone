"use client";
import React, { useCallback, useEffect, useState } from "react";
import PostItem from "./PostItem";
import { usePostsStore } from "@/store/posts/usePostsStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const PostsWrapper = () => {
  const { posts } = usePostsStore();

  return (
    <div className="flex-grow md:max-w-[40rem] pt-12 pb-20 md:py-8 flex flex-col items-center">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <DeletePostModal />
    </div>
  );
};

const DeletePostModal = () => {
  const { deletePost, postIdToDelete, setPostIdToDelete } = usePostsStore();
  const [open, setOpen] = useState(false); // open the dialog if 'postIdToDelete' is set

  useEffect(() => {
    setOpen(postIdToDelete !== null);
  }, [postIdToDelete]);

  console.log("DeletePostModal :: postIdToDelete ", postIdToDelete, open);

  const handleDeletePost = useCallback(async () => {
    if (postIdToDelete === null) {
      toast.error("Post Id is missing!", {
        position: "bottom-right",
      });
      setOpen(false);
      return;
    }
    try {
      await deletePost(postIdToDelete);
      toast.success("Post deleted successfully!", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("Error deleting post", error);
      toast.error("Failed to delete the post!", {
        position: "bottom-right",
      });
    } finally {
      setOpen(false);
      setPostIdToDelete(null);
    }
  }, [deletePost, postIdToDelete, setPostIdToDelete]);

  const handleCloseDialog = useCallback(() => {
    setPostIdToDelete(null);
    setOpen(false);
  }, [setPostIdToDelete]);

  const onOpenChange = useCallback(
    (state: boolean) => {
      setPostIdToDelete(null);
      setOpen(state);
    },
    [setPostIdToDelete]
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Are you sure want to delete this post?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this post
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="grid grid-cols-2 w-full gap-3 pt-4">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeletePost}
            >
              Delete
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseDialog}
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostsWrapper;
