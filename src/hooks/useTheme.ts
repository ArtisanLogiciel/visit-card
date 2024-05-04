import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
}

interface ThemeActions {
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState & ThemeActions>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
