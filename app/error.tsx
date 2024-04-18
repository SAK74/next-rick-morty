"use client";

import { Button } from "@/components/ui/button";

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => {};
}) {
  console.log({ error });
  return (
    <main>
      <h2>Error</h2>
      <p>{error.message}</p>
      <Button
        onClick={() => {
          reset();
        }}
      >
        Try once more
      </Button>
    </main>
  );
}
