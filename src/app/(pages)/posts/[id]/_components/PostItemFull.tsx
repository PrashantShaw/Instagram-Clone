import { auth } from "@/auth";
import { fetchPostById } from "@/lib/helpers/fetchers";
import React from "react";
import PostItemWrapper from "./PostItemWrapper";

const PostItemFull = async ({ postId }: { postId: number }) => {
  const { data, success, error } = await fetchPostById(postId);
  const session = await auth();
  if (!success) {
    return (
      <div className="flex-grow md:max-w-[40rem] pt-12 pb-20 md:py-8 flex flex-col items-center">
        <p className="text-red-600 text-center font-semibold">{error}</p>
      </div>
    );
  }
  return <PostItemWrapper post={data} user={session?.user ?? null} />;
};

export default PostItemFull;
