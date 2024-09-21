import React, { Suspense } from "react";
import Posts from "./Posts";
import Aside from "./Aside";

// TODO: add atleast-3 skeleton shimmers for posts laoding fallback so that layout will not shift becuase of scrollbar when posts loads.
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
    <p className="text-center px-2 py-4 text-gray-500 font-semibold text-2xl bg-gray-400">
      Loading Posts ..
    </p>
  </div>
);

export default HomePage;
