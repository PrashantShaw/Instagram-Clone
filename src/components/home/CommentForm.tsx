"use client";
import { CommentFormData } from "@/lib/actions/feed.actions";
import { usePostsStore } from "@/store/posts/usePostsStore";
import { Smile } from "lucide-react";
import React, { FormEvent } from "react";

type CommentFormProps = {
  postId: number;
  userId: number;
};
const CommentForm = ({ postId, userId }: CommentFormProps) => {
  const { addCommentPost } = usePostsStore();
  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const parsedFormData = Object.fromEntries(
      formData.entries()
    ) as unknown as CommentFormData;
    form.reset();
    if (parsedFormData.comment.trim() === "") return;

    await addCommentPost(parsedFormData);
  };
  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <div className="w-full flex items-center justify-between gap-2">
          <input
            name="comment"
            className=" w-full placeholder:text-gray-500 focus:outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <input type="hidden" name="postId" value={postId} />
          <input type="hidden" name="userId" value={userId} />
          <button type="button">
            <Smile className="h-4 w-4 text-gray-500 hover:text-gray-300" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
