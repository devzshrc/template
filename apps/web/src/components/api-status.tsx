"use client";

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import type { AppRouter } from "@repo/api/router";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "/trpc" })],
});

export function ApiStatus() {
  const [status, setStatus] = useState("Checking API…");

  useEffect(() => {
    trpc.health.check
      .query()
      .then((result) => setStatus(result.ok ? "API connected" : "API unavailable"))
      .catch(() => setStatus("API unavailable"));
  }, []);

  return <p role="status">{status}</p>;
}
