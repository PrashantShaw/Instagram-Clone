import React, { Suspense } from "react";
import Posts from "./Posts";

const HomePage = () => {
  return (
    <div className="flex gap-[4rem]">
      {/* Posts */}
      <Suspense fallback={<PostsFalbback />}>
        <Posts />
      </Suspense>
      {/* right bar */}
      <div className="flex-1 pt-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sunt iure
        iste quae tenetur reprehenderit incidunt ipsum accusamus nihil veniam!
        Provident quia consequuntur laudantium nostrum temporibus reprehenderit
        culpa numquam quibusdam eius. Corporis eos non natus blanditiis eius
        aliquam deleniti quisquam quaerat soluta voluptatem! Fuga sit, illum
        optio in voluptatum ex?
      </div>
    </div>
  );
};

const PostsFalbback = () => (
  <p className="text-center px-2 py-4 text-gray-500 font-semibold text-2xl">
    Loading Posts ..
  </p>
);

export default HomePage;
