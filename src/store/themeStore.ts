import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: number | null;
  text: string | null;
  button: string | null;
  setTheme: (theme: number) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: null,
      text: null,
      button: null,
      setTheme: (theme) => {
        set({
          theme,
          text: theme === 6 ? "text-white" : "text-gray-600", // themeに応じたtextを設定
          button: theme === 6 ? "text-gray-600" : "text-white",
        });
      },
    }),
    {
      name: "theme-storage",
    },
  ),
);
