'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";

interface MobileMenuButtonProps {
    toggleMenu: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ toggleMenu }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.button
            type="button"
            onClick={toggleMenu}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden
                       dark:text-gray-400 overflow-hidden shadow-sm
                       bg-white/10 backdrop-blur-md dark:bg-white/5 border border-white/5"
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6", color: "#111827" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <span className="sr-only">{"landing.navbar.openMenu"}</span>

            <motion.svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
                stroke="currentColor"
                animate={{ rotate: hovered ? 90 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                />
            </motion.svg>
        </motion.button>
    );
};

export default MobileMenuButton;
