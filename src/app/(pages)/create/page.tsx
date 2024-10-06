import { auth } from "@/auth";
import { CreateFeedForm } from "@/components/create/CreateFeedForm";
import React from "react";

const page = async () => {
  const session = await auth();
  const creatorId = Number(session?.user.uid);
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-full max-w-[40rem]">
        <h1 className="text-2xl font-semibold mb-6">Create Feed</h1>
        <CreateFeedForm creatorId={creatorId} />
      </div>
    </div>
  );
};

export default page;
