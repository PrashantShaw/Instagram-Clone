import React, { Suspense } from "react";
import Aside from "./Aside";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";
import Posts from "./Posts";

// TODO: try to make this app responsive
// TODO: show a confirm delete modal when trying to delete a post
const HomePage = () => {
  return (
    <div className="flex gap-[4rem]">
      {/* Posts */}
      <Suspense fallback={<PostsFalbback />}>
        <Posts />
      </Suspense>

      {/* right aside */}
      <Aside />
    </div>
  );
};

const PostsFalbback = () => (
  <div className="flex-grow max-w-[40rem] pt-8 flex flex-col items-center">
    <PostItemSkeleton />
    <PostItemSkeleton />
    <PostItemSkeleton />
  </div>
);

export default HomePage;
