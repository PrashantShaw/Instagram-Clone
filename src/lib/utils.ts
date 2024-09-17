import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
