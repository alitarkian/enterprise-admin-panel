"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

type Theme = "light" | "dark" | "system";
const allowedThemes: Theme[] = ["light", "dark", "system"];

interface ThemeContextProps {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const DEFAULT_THEME: Theme = process.env.NEXT_PUBLIC_DEFAULT_THEME as Theme;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const effectiveTheme = storedTheme || DEFAULT_THEME;
    setTheme(effectiveTheme);

    const isDark =
      effectiveTheme === "dark" ||
      (effectiveTheme === "system" && systemPrefersDark);

    root.classList.toggle("dark", isDark);
    setResolvedTheme(isDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        const isDark = mq.matches;
        document.documentElement.classList.toggle("dark", isDark);
        setResolvedTheme(isDark ? "dark" : "light");
      };
      handleChange();
      mq.addEventListener("change", handleChange);
      return () => mq.removeEventListener("change", handleChange);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
      setResolvedTheme(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "system" : "light",
    );
  };

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
