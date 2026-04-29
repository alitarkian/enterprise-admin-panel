import SignInForm from "@/components/auth/forms/signin-form";
import LazyImage from "@/components/ui/images/LazyImage";
import { Suspense } from "react";
import Logo from "@/images/logo/logo.png";

export default function SignInPage(props: { logo?: string }) {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">
          <div className="w-32 mx-auto md:w-36">
            <LazyImage src={props.logo || Logo.src} alt="Logo" />
          </div>
        </div>
        <Suspense>
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
}
