import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const appRouter = t.router({
  health: t.router({
    check: t.procedure.query(() => ({ ok: true as const })),
  }),
});

export type AppRouter = typeof appRouter;
