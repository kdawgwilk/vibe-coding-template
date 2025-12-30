# Project Monorepo

This repo is a **monorepo** for a fullstack Web + Mobile project.

References:
- Factory AGENTS.md best practices: `https://docs.factory.ai/cli/configuration/agents-md`
- OpenAI Codex AGENTS.md guide: `https://developers.openai.com/codex/guides/agents-md`

## Core Commands (run from repo root)
- **Install deps**: `pnpm install`
- **Dev (web)**: `pnpm dev` (alias of `pnpm dev:web`)
- **Dev (web)**: `pnpm dev:web`
- **Dev (mobile / Expo)**: `pnpm dev:mobile`
- **Dev (mobile iOS)**: `pnpm dev:ios`
- **Dev (mobile Android)**: `pnpm dev:android`
- **Dev (desktop)**: `pnpm dev:desktop`
- **Lint + auto-fix (Biome)**: `pnpm lint`
- **Lint (CI / no writes)**: `pnpm lint:ci`
- **Build (runs `build` where present)**: `pnpm build`

## Repo Layout
- `apps/web/`: Next.js “fullstack” app (App Router) + Tailwind + shadcn/ui
- `apps/mobile/`: Expo + React Native (Expo Router) + NativeWind
- `apps/desktop/`: Electron + Vite + React + Tailwind
- `docs/`: extra docs (keep AGENTS.md files short)
- `libs/`: shared packages (when you add a new package here, also add `libs/<pkg>/AGENTS.md`)

## Key Tech Decisions / Guardrails
- **TypeScript**: strict everywhere.
- **Formatting/Linting**: Biome (do not introduce ESLint/Prettier unless there’s a strong reason).
- **Auth**: Supabase for both web and mobile.
- **LLM provider access**: use **Vercel AI SDK** (do not call OpenAI/Anthropic/Gemini directly).
  - Put provider keys on the **server** (Next.js route handlers), never in client/mobile bundles.
- **Dependency docs**: when adding/configuring deps, use the **Context7 MCP server** for up-to-date docs/examples.

## Where to Make Changes
- Web UI/components live under `apps/web/src/`.
- Mobile screens/components live under `apps/mobile/app/` and `apps/mobile/components/`.
- Desktop UI and Electron code live under `apps/desktop/src/` (main/preload/renderer).
- Shared, reusable code should go into `libs/<new-package>/` (create a package with its own `package.json`, `tsconfig.json`, and `AGENTS.md`).

## Environment Variables (high-level)
See `docs/SETUP.md` for the authoritative list + local setup steps.

## Proof Signals (what “done” looks like)
- `pnpm lint:ci` is clean.
- Web builds: `pnpm --filter web build` succeeds.
- Mobile boots: `pnpm dev:ios` or `pnpm dev:android` launches Expo and the app loads.
- Desktop boots: `pnpm dev:desktop` launches Electron and the window loads.
