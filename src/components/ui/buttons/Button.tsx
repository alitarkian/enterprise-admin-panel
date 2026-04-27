import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "../icons/icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 gap-2 rounded-lg",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral-900 text-white hover:bg-amber-600 disabled:bg-sky-300 shadow-theme-xs dark:bg-amber-700",
        outline:
          "bg-transparent text-neutral-700 border border-neutral-300 hover:bg-neutral-50 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
        error:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-primary hover:bg-accent hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        custom: "",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 py-2 text-sm",
        lg: "h-10 px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      asChild = false,
      loading = false,
      startIcon,
      endIcon,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Icon.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {startIcon && (
              <span className="flex items-center">{startIcon}</span>
            )}
            {children}
            {endIcon && <span className="flex items-center">{endIcon}</span>}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
