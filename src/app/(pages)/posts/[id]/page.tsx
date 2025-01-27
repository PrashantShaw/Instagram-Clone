import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <div>PostId: {params.id}</div>;
};

export default page;
