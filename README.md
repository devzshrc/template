# Monorepo starter

TypeScript workspace managed by pnpm and Turborepo:

- `apps/web`: Next.js App Router frontend
- `apps/api`: Hono HTTP server that hosts the tRPC Fetch adapter
- `packages/api`: shared tRPC router and exported `AppRouter` type

## Getting started

Requires Node.js 20.9 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

The frontend runs on <http://localhost:3000>; the API runs on <http://localhost:4000>.
Check `GET /health` for API status and call the tRPC `health.check` procedure at
`/trpc/health.check`. The Next.js rewrite proxies `/trpc/*` requests to the API;
set `API_URL` if the API runs somewhere else.

Run `pnpm build` and `pnpm typecheck` for workspace checks.

## Formatting and repository files

Run these commands from the repository root:

```sh
pnpm format:check # Check formatting without changing files
pnpm format       # Format supported files across the workspace
```

Prettier is pinned at the workspace root. `.prettierrc.json` defines formatting,
and `.editorconfig` keeps basic editor settings consistent. VS Code users can
install the recommended extensions to format files on save.

`.gitignore` excludes dependencies, generated output, caches, logs, and local
environment files. Commit `pnpm-lock.yaml` and placeholder `.env.example` files.
`.prettierignore` excludes generated files and lockfiles from formatting.

## Workspace map

Import the API type from `@repo/api/router` when creating a tRPC client in the
frontend. Keep procedures and shared API types in `packages/api`; keep the
Hono listener and transport in `apps/api`.

## Agent tooling

TanStack Intent is included as a root development dependency. After installing
workspace dependencies, run `pnpm exec intent install` to discover installed
Intent enabled skills and configure project guidance. Add the desired
package permissions during its interactive setup.
