"use client";

import React, { useState } from "react";
import { Icon } from "../ui/icons/icon";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const themeOptions = [
  { id: "light", label: "Light", icon: <Icon.lightMode className="h-5 w-5" /> },
  { id: "dark", label: "Dark", icon: <Icon.darkMode className="h-5 w-5" /> },
];

interface ThemeToggleButtonProps {
  showOnMobile?: boolean;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  showOnMobile = true,
}) => {
  const { theme, setTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  const currentTheme =
    themeOptions.find((t) => t.id === theme) || themeOptions[0];
  const otherTheme = themeOptions.find((t) => t.id !== currentTheme.id);

  const handleClick = () => {
    if (otherTheme) {
      setTheme(otherTheme.id as "light" | "dark");
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        ${showOnMobile ? "flex" : "hidden lg:flex"}
        relative inline-flex items-center justify-center w-11 h-11
        rounded-full border border-white/5 bg-white/10 backdrop-blur-md
        dark:border-white/5 dark:bg-white/5
        text-lux-black dark:text-lux-white
        transition-all duration-300 ease-in-out shadow-sm me-1 ms-1
      `}
    >
      <div className="relative h-5 overflow-hidden w-full flex items-center justify-center">
        {/* current theme */}
        <motion.span
          animate={{ y: hovered ? -20 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute start-0 w-full flex items-center justify-center"
        >
          {currentTheme.icon}
        </motion.span>

        {/* next theme on hover */}
        {otherTheme && (
          <motion.span
            animate={{ y: hovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute start-0 w-full flex items-center justify-center"
          >
            {otherTheme.icon}
          </motion.span>
        )}
      </div>
    </button>
  );
};

export default ThemeToggleButton;
