import { User } from "@prisma/client";
import { create } from "zustand";

export type UserStoreState = {
  user:
    | (Pick<User, "email" | "password" | "username"> & { uid: string })
    | null;
};
type UserStoreActions = {
  setUser: (user: UserStoreState["user"]) => void;
  clearUser: () => void;
};
type UserStore = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
