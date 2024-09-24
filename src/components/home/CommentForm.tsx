import { Smile } from "lucide-react";
import React from "react";

type CommentFormProps = {
  postId: number;
  userId: number;
};
const CommentForm = ({ postId, userId }: CommentFormProps) => {
  return (
    <div>
      <form action={() => {}}>
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
