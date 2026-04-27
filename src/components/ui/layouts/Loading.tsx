import LazyImage from "../images/LazyImage";
import logo from "@/images/logo/logo.png";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
};

export default function EllipsisLoader({
  size = "md",
  color = "bg-white",
  className = "",
}: LoaderProps) {
  const sizeMap = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const gapMap = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  };

  return (
    <div
      className={`flex items-center justify-center ${gapMap[size]} ${className} min-h-15`}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`${sizeMap[size]} ${color} rounded-full inline-block animate-ellipsis`}
          style={{
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <div className="fixed inset-0 z-999999 flex items-center justify-center bg-victor-black backdrop-blur-sm transition-all duration-300">
        <div className="flex flex-col items-center space-y-4">
          <LazyImage
            src={logo.src}
            alt="Ali Tarkian"
            className=""
            width={200}
            height={200}
          />
          <div className="relative w-16 h-2 bg-victor-gray rounded-full overflow-hidden">
            <div
              className="absolute h-full w-6 bg-victor-red rounded-full animate-linear-move"
              style={{ animation: "linearMove 1.5s ease-in-out infinite" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
