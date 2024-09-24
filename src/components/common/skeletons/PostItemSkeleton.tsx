import React from "react";

const PostItemSkeleton = () => {
  return (
    <div className="animate-pulse max-w-[29.375rem] border-b text-sm w-full py-2">
      {/* header */}
      <div className="flex items-center gap-2 py-2">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <div className="flex flex-col gap-2">
          <div className="h-3 w-52 rounded-md bg-gray-200"></div>
          <div className="h-2 w-36 rounded-md bg-gray-200"></div>
        </div>
        <div className=""></div>
      </div>
      {/* image */}
      <div className="">
        <div className="h-[15rem] rounded-sm bg-gray-200"></div>
      </div>
      {/* contents */}
      <div className="py-3 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-md bg-gray-200"></div>
          <div className="h-6 w-6 rounded-md bg-gray-200"></div>
          <div className="h-6 w-6 ml-auto rounded-md bg-gray-200"></div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-2 w-4/5 rounded-md bg-gray-200"></div>
          <div className="h-2 w-4/5 rounded-md bg-gray-200"></div>
          <div className="h-2 w-4/5 rounded-md bg-gray-200"></div>
          <div className="h-2 w-3/5 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default PostItemSkeleton;
