import React from "react";
import Posts from "./Posts";

const HomePage = () => {
  return (
    <div className="flex gap-[4rem]">
      {/* Posts */}
      <Posts />
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

export default HomePage;
