import React, { Suspense } from "react";
import PostItemFull from "./_components/PostItemFull";

const page = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <PostItemFull postId={Number(params.id)} />
      </Suspense>
    </div>
  );
};

export default page;
