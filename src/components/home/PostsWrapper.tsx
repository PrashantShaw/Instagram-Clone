"use client";
import React, { useCallback, useState } from "react";
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
import { Button } from "../ui/button";

const PostsWrapper = () => {
  const { posts } = usePostsStore();
  const [open, setOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(0);

  const openConfirmDeletePostModal = useCallback((postId: number) => {
    setPostIdToDelete(postId);
    setOpen(true);
  }, []);
  return (
    <div className="flex-grow max-w-[40rem] pt-8 flex flex-col items-center ">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          openConfirmDeletePostModal={openConfirmDeletePostModal}
        />
      ))}
      <DeletePostModal
        open={open}
        setOpen={setOpen}
        postIdToDelete={postIdToDelete}
      />
    </div>
  );
};

type DeletePostModalProps = {
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postIdToDelete: number;
};
const DeletePostModal = ({
  open,
  setOpen,
  postIdToDelete,
}: DeletePostModalProps) => {
  const { deletePost } = usePostsStore();

  const handleDeletePost = useCallback(async () => {
    await deletePost(postIdToDelete);
    setOpen(false);
  }, [deletePost, postIdToDelete, setOpen]);
  // Cute robo in the middle of nowhere, maybe wondering which way to go.. Can you guys help him out??
  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
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
              onClick={() => setOpen(false)}
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
