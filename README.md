# Vibe Coding Template (Web + Mobile + Desktop)

A **fullstack monorepo template** to quickly start a new project with:
- **Web**: Next.js (App Router) + Tailwind + shadcn/ui
- **Mobile**: Expo + React Native (Expo Router) + NativeWind
- **Desktop**: Electron + Vite + React + Tailwind
- **Auth**: Supabase (web + mobile)

If you’re using AI coding agents, start with `AGENTS.md` (repo root) and the app-specific `apps/*/AGENTS.md` files.

## Quickstart

### 1) Use this template
- Click **“Use this template”** in GitHub (recommended), or clone this repo and rename it.

### 2) Install dependencies
From repo root:
- `pnpm install`

### 3) Configure environment variables
Follow the full setup guide:
- `docs/SETUP.md`

At minimum:
- **Web** (`apps/web/.env.local`)
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- **Mobile** (`apps/mobile/.env`)
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_KEY`

### 4) Run apps locally
From repo root:
- **Web**: `pnpm dev` (or `pnpm dev:web`)
- **Mobile**: `pnpm dev:mobile` (or `pnpm dev:ios` / `pnpm dev:android`)
- **Desktop**: `pnpm dev:desktop`

## Core Commands (repo root)
- **Web dev**: `pnpm dev` / `pnpm dev:web`
- **Mobile dev**: `pnpm dev:mobile`
- **Mobile iOS**: `pnpm dev:ios`
- **Mobile Android**: `pnpm dev:android`
- **Desktop dev**: `pnpm dev:desktop`
- **Lint + auto-fix (Biome)**: `pnpm lint`
- **Lint (CI / no writes)**: `pnpm lint:ci`
- **Build (runs `build` where present)**: `pnpm build`

## Repo Layout
- `apps/web/`: Next.js app (UI, route handlers, server code)
- `apps/mobile/`: Expo app (screens, mobile UI)
- `apps/desktop/`: Electron app (main/preload/renderer)
- `libs/`: shared packages (optional; add as your project grows)
- `docs/`: setup and additional documentation

## Template “Replace Me” Checklist
- **Mobile**: update placeholders in `apps/mobile/app.json` (`name`, `slug`, `scheme`)
- **Desktop**: update `apps/desktop/package.json` (`productName`, `name`) and any app branding
- **Web**: update metadata/title in `apps/web/src/app/layout.tsx` and any branding/assets

## Tech Decisions / Guardrails
- **TypeScript**: strict everywhere.
- **Formatting/Linting**: Biome (avoid introducing ESLint/Prettier unless you have a strong reason).
- **Auth**: Supabase for both web + mobile.
- **LLM providers**: use **Vercel AI SDK** (don’t call OpenAI/Anthropic/Gemini directly).
  - Put provider keys on the **server** (Next.js route handlers), never in client/mobile/desktop bundles.
- **Dependency docs**: when adding/configuring deps, use the **Context7 MCP server** for up-to-date docs/examples.

## Documentation
- **Local machine setup (macOS)**: `docs/SETUP.md`
- **AI agent instructions**:
  - `AGENTS.md` (repo root)
  - `apps/web/AGENTS.md`
  - `apps/mobile/AGENTS.md`
  - `apps/desktop/AGENTS.md`

## License
See `LICENSE`.