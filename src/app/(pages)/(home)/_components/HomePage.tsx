import React, { Suspense } from "react";
import Aside from "./Aside";
import PostItemSkeleton from "@/components/common/skeletons/PostItemSkeleton";
import Posts from "./Posts";

// TODO: store images to a cloud storage location
// TODO: add a page to view a particular post

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
  <div className="flex-grow md:max-w-[40rem] pt-16 md:pt-8 flex flex-col items-center">
    <PostItemSkeleton />
    <PostItemSkeleton />
    <PostItemSkeleton />
  </div>
);

export default HomePage;
