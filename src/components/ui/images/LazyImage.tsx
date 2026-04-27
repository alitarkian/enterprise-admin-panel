"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | "auto" | string;
  height?: number | "auto" | string;
  className?: string;
  imgClassName?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  description?: string;
  loader?: ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => string;
  quality?: number;
  enablePopup?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  placeholder = "blur",
  blurDataURL = "",
  enablePopup = false,
  quality = 75,
  width = "",
  height = "",
  description,
  loader,
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleLoad = () => setLoaded(true);
  const imageSrc = loader
    ? loader({ src, width: Number(width), quality })
    : src;
  const style: any = {};
  if (width !== undefined) style.width = width;
  if (height !== undefined) style.height = height;
  return (
    <div ref={ref} className={`relative ${className}`}>
      {placeholder === "blur" && !loaded && (
        <div
          className="absolute inset-0 bg-victor-gray dark:bg-victor-black animate-pulse"
          style={
            blurDataURL
              ? {
                  backgroundImage: `url(${blurDataURL})`,
                  backgroundSize: "cover",
                }
              : undefined
          }
        />
      )}

      {inView && (
        <motion.div
          ref={ref}
          className={`relative overflow-hidden ${
            enablePopup ? "cursor-zoom-in" : ""
          } ${className}`}
          style={style}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => enablePopup && setShowPopup(true)}
        >
          <motion.img
            src={src}
            alt={alt}
            onLoad={handleLoad}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: loaded ? 1 : 0,
              scale: loaded ? 1 : 0.95,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`${imgClassName} ${
              enablePopup && "cursor-zoom-in w-full h-full object-cover"
            }`}
          />
        </motion.div>
      )}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0a0a0a]/99 flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.img
              src={src}
              alt={alt}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-full max-h-full rounded-xl shadow-xl"
            />
            {description && (
              <div className="p-5">
                <p className="text-justify text-2xl">{description}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
