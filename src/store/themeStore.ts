import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: number | null;
  setTheme: (theme: number) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 0,
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
);
