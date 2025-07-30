
import ErrorClient from "@/components/error-client";
import Link from "next/link";
import { Suspense } from "react";

export default function AuthError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mx-auto mb-4 w-full max-w-md rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Authentication Error
        </h1>
        <Suspense>
          <ErrorClient />
        </Suspense>
        <div className="mt-6 text-center">
          <Link
            href="/auth/signin"
            className="text-blue-500 hover:text-blue-700"
          >
            Try again
          </Link>
        </div>
      </div>
    </div>
  );
}
