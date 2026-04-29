"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Icon } from "../icons/icon";
import { cn } from "@/lib/utils";


const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return <ToastPrimitives.Provider>{children}</ToastPrimitives.Provider>;
};

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  }
>(({ className, position = "top-right", ...props }, ref) => {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        "fixed z-[100] flex min-h-dvh w-full flex-col p-4 md:max-w-[420px]",
        position === "top-right" && "top-0 right-0 items-end",
        position === "top-left" && "top-0 left-0 items-start",
        position === "bottom-right" &&
        "bottom-0 right-0 flex-col-reverse items-end",
        position === "bottom-left" &&
        "bottom-0 left-0 flex-col-reverse items-start",
        position === "top-center" &&
        "top-0 left-1/2 -translate-x-1/2 items-center",
        position === "bottom-center" &&
        "bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse items-center",
        className
      )}
      {...props}
    />
  );
});
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-3 overflow-hidden rounded-lg border p-4 pr-6 shadow-xl transition-all duration-300 ease-in-out data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
  {
    variants: {
      variant: {
        default: "border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-gray-100",
        loading: "border border-blue-200 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-800 text-blue-700 dark:text-blue-200",
        error: "border border-red-300 bg-red-50 dark:bg-red-900/30 dark:border-red-800 text-red-700 dark:text-red-200",
        success: "border border-green-300 bg-green-50 dark:bg-green-900/30 dark:border-green-800 text-green-700 dark:text-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
  VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "hover:bg-secondary focus:ring-ring group-[.error]:border-muted/40 group-[.error]:hover:border-destructive/30 group-[.error]:hover:bg-destructive group-[.error]:hover:text-destructive-foreground group-[.error]:focus:ring-destructive inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-1 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "text-foreground/50 hover:text-foreground absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.error]:text-red-300 group-[.error]:hover:text-red-50 group-[.error]:focus:ring-red-400 group-[.error]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <Icon.close className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
