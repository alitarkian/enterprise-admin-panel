import SignInForm from "@/components/auth/forms/signin-form";
import LazyImage from "@/components/ui/images/LazyImage";
import { Suspense } from "react";
import Logo from "@/images/logo/logo.png";
export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <LazyImage src={Logo.src} alt="Logo" />
          </div>
        </div>
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
}
