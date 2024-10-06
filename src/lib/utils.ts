import { clsx, type ClassValue } from "clsx";
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

  let result;

  if (days > 0) {
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
