"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Client replace avoids server redirect() under AppShell (React #310 / NEXT_REDIRECT). */
export default function AppIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/app/board");
  }, [router]);

  return (
    <p className="text-sm text-fg-muted" role="status">
      Opening load board…
    </p>
  );
}
