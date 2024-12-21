import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: number | null;
  setTheme: (theme: number) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: null,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
