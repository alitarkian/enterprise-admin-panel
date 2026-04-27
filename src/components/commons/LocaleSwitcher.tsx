"use client";

import { usePathname } from "next/navigation";
import { i18n, type Locale } from "@/i18n-config";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/buttons/Button";
import { useRef, useState } from "react";
import Link from "next/link";

interface LocaleSwitcherProps {
  showOnMobile?: boolean;
  currentLang?: string;
}

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = ({
  showOnMobile = true,
  currentLang,
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    localStorage.setItem("locale", locale);
    return segments.join("/");
  };

  return (
    <div className={`${showOnMobile ? "flex" : "hidden lg:flex"} relative`}>
      <Button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="
          relative flex items-center justify-center
          w-24 h-11 me-1 ms-1
          rounded-full border border-white/5
          bg-white/10 backdrop-blur-md
          dark:border-white/5 dark:bg-white/5
          text-neutral-900 dark:text-white
          transition-all duration-300 ease-in-out
          shadow-sm overflow-hidden
        "
      >
        <div className="relative h-5 overflow-hidden w-full text-center">
          <motion.span
            animate={{ y: hovered ? -20 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute start-0 w-full"
          >
            {currentLang}
          </motion.span>

          {i18n.locales[0] && (
            <motion.span
              animate={{ y: hovered ? 0 : 20 }}
              transition={{ duration: 0.25 }}
              className="absolute start-0 w-full"
            >
              {i18n.locales[0]}
            </motion.span>
          )}
        </div>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: openUp ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: openUp ? 10 : -10 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 flex flex-col gap-2 p-2
              rounded-2xl shadow-lg
              bg-white/10 backdrop-blur-md
              border border-white/5
              dark:bg-white/5 dark:border-white/5
              ${openUp ? "bottom-full mb-2" : "top-full mt-2"}
              start-1/2 -translate-x-1/2
            `}
          >
            {i18n.locales.map((lang) => (
              <Link
                key={lang}
                href={redirectedPathname(lang)}
                className="
                  flex items-center justify-center
                  w-20 h-8 rounded-full
                  text-neutral-900 dark:text-white
                  hover:bg-white/20 dark:hover:bg-white/10
                  transition
                "
              >
                {lang}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocaleSwitcher;
