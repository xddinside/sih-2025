"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-2"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
