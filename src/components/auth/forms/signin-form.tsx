"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/icons/icon";
import { Button } from "@/components/ui/buttons/Button";
import { signIn } from "../actions/auth";
import Alert from "@/components/ui/alert/Alert";
import { Loader, Loader2, LucideLoader } from "lucide-react";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [state, formAction, isPending] = useActionState(signIn, undefined);

  return (
    <form action={formAction} className="space-y-3 bg-victor-black rounded-md">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-lux-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative mb-2">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="text"
                name="email"
                defaultValue={"ali.tarkian1@gmail.com"}
                placeholder="Enter your email address"
                required
              />
              <Icon.email className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-lux-white" />
            </div>
            {state?.errors?.email && (
              <Alert
                type="custom"
                variant={"error"}
                className="text-lux-secondary"
                message={state.errors.email}
              />
            )}
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-lux-white"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                defaultValue={"123456@Qwe"}
                required
              />
              <Icon.key className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-lux-white" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          className="mt-4 w-full"
          aria-disabled={isPending}
          disabled={isPending}
        >
          Sign In <Icon.arrowRight className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1 mt-5"
          aria-live="polite"
          aria-atomic="true"
        >
          {state?.message && (
            <>
              <Icon.error className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{state.message}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
