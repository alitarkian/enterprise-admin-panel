"use client";
import { FC, ElementType } from "react";
import clsx from "clsx";

interface TitleProps {
  textAlign?: "start" | "end" | "center" | "inherit";
  type?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle"
    | "body"
    | "caption";
  title: string;
  className?: string;
}

const Title: FC<TitleProps> = ({
  textAlign = "inherit",
  type = "h1",
  title,
  className,
}) => {
  const headingConfig: Record<
    TitleProps["type"],
    { tag: ElementType; fontSize: string }
  > = {
    h1: { tag: "h1", fontSize: "text-5xl" },
    h2: { tag: "h2", fontSize: "text-4xl" },
    h3: { tag: "h3", fontSize: "text-3xl" },
    h4: { tag: "h4", fontSize: "text-2xl" },
    h5: { tag: "h5", fontSize: "text-xl" },
    h6: { tag: "h6", fontSize: "text-lg" },
    subtitle: { tag: "h6", fontSize: "text-md" },
    body: { tag: "p", fontSize: "text-base" },
    caption: { tag: "span", fontSize: "text-sm" },
  };

  const { tag: HeadingTag, fontSize } = headingConfig[type];

  return (
    <HeadingTag className={clsx(`text-${textAlign}`, fontSize, className)}>
      {title}
    </HeadingTag>
  );
};

export default Title;
