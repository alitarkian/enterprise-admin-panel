import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  href: string;
  text: string;
  icon?: ReactNode;
  showOnMobile?: boolean;
  standard?: boolean;
  className?: string;
}

export default function AnimatedButton({
  href,
  text,
  icon,
  showOnMobile = false,
  standard = false,
  className = "text-black bg-amber-500 hover:bg-white/20",
}: AnimatedButtonProps) {
  const baseClasses = standard
    ? `flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium border border-white/5 ${className} shadow-xs transition-colors duration-300 cursor-pointer`
    : `group relative w-auto items-center justify-between gap-6 overflow-hidden rounded-full px-6.5 py-3 text-sm md:text-base font-medium font-display backdrop-blur-md border border-white/5 bg-white/10 hover:bg-white/20 shadow-xs transition-colors duration-300 cursor-pointer`;

  const responsiveClasses = showOnMobile ? "flex lg:hidden" : "hidden lg:flex";

  return (
    <Link href={href} className={`${baseClasses} ${responsiveClasses}`}>
      {icon && <div className="flex-shrink-0">{icon}</div>}

      {!standard && (
        <div className="relative h-5 overflow-hidden">
          <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full ">
            {text}
          </span>
          <span className="absolute top-full start-0 block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
            {text}
          </span>
        </div>
      )}

      {standard && <span>{text}</span>}
    </Link>
  );
}
