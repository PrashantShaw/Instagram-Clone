import { auth } from "@/auth";
import { CreateFeedForm } from "@/app/(pages)/create/_components/CreateFeedForm";
import React from "react";

const page = async () => {
  const session = await auth();
  const creatorId = Number(session?.user.uid);
  return (
    <div className="flex items-center justify-center pt-16 pb-8 md:py-8 px-6">
      <div className="w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold mb-6">Create Feed</h1>
        <CreateFeedForm creatorId={creatorId} />
      </div>
    </div>
  );
};

export default page;
