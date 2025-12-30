# `apps/web` (Next.js fullstack app)

This is the **web** app: Next.js (App Router) + Tailwind CSS + shadcn/ui.

## Core Commands
Run from repo root:
- **Dev**: `pnpm dev:web` (or `pnpm dev`)
- **Build**: `pnpm --filter web build`
- **Start (prod)**: `pnpm --filter web start`
- **Lint + auto-fix (Biome)**: `pnpm --filter web lint`
- **Lint (CI / no writes)**: `pnpm --filter web lint:ci`

Run from `apps/web/`:
- **Dev**: `pnpm dev`
- **Build**: `pnpm build`
- **Start (prod)**: `pnpm start`
- **Lint**: `pnpm lint`

## Project Layout
- `src/app/`: Next.js App Router routes, layouts, route handlers
- `src/components/`: app components
- `src/components/ui/`: shadcn/ui components
- `src/lib/`: shared helpers (e.g. `src/lib/utils.ts`)

## Styling & UI
- Tailwind is configured for `src/app/globals.css`.
- shadcn/ui config is in `components.json` (aliases like `@/components/ui`).

Add shadcn/ui components (run from `apps/web/` so `components.json` is picked up):
- `pnpm dlx shadcn@latest add <component>`

## Supabase (Auth)
This app is intended to use Supabase for auth and data access.

Recommended local env vars (create `apps/web/.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY`

Optional server-only vars (never prefix with `NEXT_PUBLIC_`):
- `SUPABASE_SERVICE_ROLE_KEY` (server only)

Guidelines:
- **Never** ship service role keys to the browser.
- Prefer doing privileged DB operations server-side (route handlers) using server-only env.

## LLM Providers / AI
Use **Vercel AI SDK** for provider integrations (OpenAI/Anthropic/Gemini/etc).

Guidelines:
- Put provider API keys in `apps/web/.env.local` (server-only; do not expose as `NEXT_PUBLIC_*`).
- Implement provider calls in **route handlers** under `src/app/api/*` (or other server-only code paths).
- Mobile should call your web API endpoints; do not embed provider keys in mobile apps.

## Tooling / Conventions
- This repo uses **Biome** for formatting + linting. Avoid introducing ESLint/Prettier.
- Keep everything **strict TypeScript**.
- When adding dependencies: `pnpm --filter web add <pkg>`
- When configuring new deps: consult the **Context7 MCP server** for up-to-date docs and examples.

## More Docs
Local machine prerequisites and environment setup are in `docs/SETUP.md` (repo root).
