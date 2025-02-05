import { auth } from "@/auth";
import { useUserStore } from "@/store/user/useUserStore";
import { clsx, type ClassValue } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCreatedTimeAgo(createdAt: Date) {
  const currentTimestamp = Date.now();
  const createdTimestamp = new Date(createdAt).getTime();

  const diff = currentTimestamp - createdTimestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  let result;

  if (weeks > 0) {
    result = `${weeks}w`;
  } else if (days > 0) {
    result = `${days}d`;
  } else if (hours > 0) {
    result = `${hours}h`;
  } else if (minutes > 0) {
    result = `${minutes}m`;
  } else {
    result = `${seconds}s`;
  }

  return result;
}

export const getFormDataFromObject = <FD>(feedData: FD): FormData => {
  const formData = new FormData();
  for (const field in feedData) {
    const element = feedData[field as keyof typeof feedData];
    // Check if the field is a FileList (file input) and append it properly
    if (element instanceof FileList && element.length > 0) {
      formData.append(field, element[0]); // Append the first file from FileList
    } else {
      // For other fields, just append the value
      formData.append(field, element as string);
    }
  }
  return formData;
};

export const getPublicIdFromImageUrl = (imageUrl: string) => {
  // eg. imageUrl = 'https://res.cloudinary.com/dlq9jii4d/image/upload/v1737913964/InstagramCloneV2/1-1737913962967-flower.jpg'
  const publicId = imageUrl
    .split("/")
    .slice(-2)
    .join("/")
    .split(".")
    .slice(0, -1)
    .join("."); // InstagramCloneV2/1-1737913962967-flower

  return publicId;
};

export const isLoggedIn = async () => {
  const session = await auth();

  return !!(session && session.user);
};

export const authenticateUser = () => {
  const { user } = useUserStore.getState();
  const isUser = !!user;
  if (!isUser) {
    toast("Login to continue!", {
      icon: "🎁",
      className: "font-semibold",
      position: "bottom-right",
    });
  }
  return isUser;
};
