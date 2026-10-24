# Agent instructions

## Project

This repository is a pnpm workspace managed with Turborepo. Use Node.js 20.9 or newer.

- `apps/web` is the Next.js App Router frontend.
- `apps/api` is the Hono HTTP server and tRPC Fetch adapter.
- `packages/api` contains the shared tRPC router and exported `AppRouter` type.

Keep code in the package that owns its responsibility. Put HTTP server and transport setup in `apps/api`, page and browser UI in `apps/web`, and shared API procedures and types in `packages/api`.

## Working in the monorepo

- Read the relevant package's `package.json` and `tsconfig.json` before changing it. Preserve workspace boundaries and use `workspace:*` for internal package dependencies.
- Use the root scripts for workspace-wide tasks: `pnpm dev`, `pnpm build`, and `pnpm typecheck`. Use a package's own script when a change is isolated to that package.
- Keep the shared API package buildable before consumers run. Turborepo uses dependency build tasks before app dev/build tasks; preserve this ordering when changing task configuration.
- The web app proxies `/trpc/*` through its Next.js rewrite to the API at `API_URL`, defaulting to `http://localhost:4000`. Preserve that path unless the user requests a routing change.
- Export `AppRouter` from `@repo/api/router` and use it to type tRPC clients. Avoid duplicating procedure input or output types in the frontend.
- Keep package scripts and Turbo task definitions aligned. Do not add a script that references a tool or configuration the workspace does not provide.

## Changes and dependencies

- Follow the existing TypeScript, React, Next.js, Hono, and tRPC patterns in the affected package.
- Make the smallest coherent change for the request. Preserve unrelated user changes and avoid broad refactors.
- Do not add or upgrade dependencies, change public API shapes, or alter workspace architecture without user direction.
- Do not invent product behavior, API permissions, persistence, retries, or environment defaults. Ask when an unresolved choice materially affects behavior.
- Keep secrets in environment variables; do not commit `.env` files or expose secret values in logs or responses.

## Verification

- For behavior changes, add or update a focused test when the project has an appropriate test setup. No test runner is currently configured; do not introduce one without user direction.
- Run the relevant available checks, such as `pnpm typecheck` or `pnpm build`, when dependencies are installed. Report checks that could not run and why.
- Do not claim runtime behavior is verified based only on static inspection.
- Do not run deploy, publish, push, or live-system commands unless the user explicitly asks for them.
