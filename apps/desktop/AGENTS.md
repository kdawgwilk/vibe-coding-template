# `apps/desktop` (Electron + Vite + React)

This is the **desktop** app: Electron Forge + Vite + React + Tailwind (and shadcn/ui-style components).

## Core Commands
Run from repo root:
- **Dev (desktop)**: `pnpm dev:desktop` (alias of `pnpm --filter desktop start`)
- **Package (local)**: `pnpm --filter desktop package`
- **Make installers**: `pnpm --filter desktop make`
- **Lint + auto-fix (Biome)**: `pnpm --filter desktop lint`
- **Lint (CI / no writes)**: `pnpm --filter desktop lint:ci`

Run from `apps/desktop/`:
- **Dev**: `pnpm start`
- **Package**: `pnpm package`
- **Make installers**: `pnpm make`
- **Lint**: `pnpm lint`

## Project Layout (Electron Forge + Vite)
- `src/main.ts`: Electron **main** process entry
- `src/preload.ts`: Electron **preload** script (bridges main ↔ renderer safely)
- `src/renderer.tsx`: React **renderer** entry
- `src/app.tsx`: top-level React UI

Config:
- `forge.config.ts`: Electron Forge configuration (makers, plugins)
- `vite.*.config.ts`: Vite configs for main/preload/renderer

## Styling & UI
- Tailwind styles live in `src/index.css`.
- Component conventions are similar to shadcn/ui; see `src/components/ui/*`.

## LLM Providers / AI
Do not embed provider API keys in the desktop renderer bundle.

Recommended pattern:
- Put provider calls on the **server** (Next.js route handlers in `apps/web`) using **Vercel AI SDK**
- Call your web API from the desktop app

## Tooling / Conventions
- Uses **Biome** for formatting + linting.
- Keep everything **strict TypeScript**.
- When adding dependencies: `pnpm --filter desktop add <pkg>`
- When configuring new deps: consult the **Context7 MCP server** for up-to-date docs and examples.

## More Docs
Local machine prerequisites and environment setup are in `docs/SETUP.md` (repo root).



