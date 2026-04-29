// Toaster.tsx
"use client";

import { JSXElementConstructor } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { Icon } from "../icons/icon";
import { useToast } from "@/hooks/useToast";

const variantIcons: Record<
  NonNullable<ToastProps["variant"]>,
  JSXElementConstructor<{ className?: string }>
> = {
  default: Icon.notification,
  loading: Icon.spinner,
  success: Icon.check,
  error: Icon.error,
};

export function Toaster({
  position = "top-right",
}: {
  position?: React.ComponentProps<typeof ToastViewport>["position"];
}) {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const ToastIcon =
          props.icon ?? (props.variant ? variantIcons[props.variant] : undefined);

        return (
          <Toast key={id} {...props}>
            <div className="flex items-center gap-3">
              {ToastIcon && (
                <ToastIcon
                  className={`h-6 w-6 shrink-0 opacity-50 ${props.variant === "loading" ? "animate-spin" : ""
                    }`}
                />
              )}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>

            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport position={toasts[0]?.position || position} />
    </ToastProvider>
  );
}