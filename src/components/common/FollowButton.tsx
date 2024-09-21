import clsx from "clsx";
import React from "react";
type FollowButtonProps = {
  size?: "small" | "medium";
};
const FollowButton = ({ size = "medium" }: FollowButtonProps) => {
  const btnSizeClass = {
    small: "text-xs",
    medium: "text-sm",
  };
  return (
    <button
      className={clsx(
        "text-instaBlueBtn hover:text-instaBlueBtnHover font-semibold",
        btnSizeClass[size]
      )}
    >
      Follow
    </button>
  );
};

export default FollowButton;
