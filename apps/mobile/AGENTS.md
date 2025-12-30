# `apps/mobile` (Expo + React Native)

This is the **mobile** app: Expo (Expo Router) + NativeWind + Supabase auth.

## Core Commands
Run from repo root:
- **Dev (Expo)**: `pnpm dev:mobile`
- **Dev (iOS simulator)**: `pnpm dev:ios`
- **Dev (Android emulator)**: `pnpm dev:android`
- **Lint + auto-fix (Biome)**: `pnpm --filter mobile lint`
- **Lint (CI / no writes)**: `pnpm --filter mobile lint:ci`

Run from `apps/mobile/`:
- **Dev**: `pnpm start`
- **Dev (iOS)**: `pnpm ios`
- **Dev (Android)**: `pnpm android`
- **Lint**: `pnpm lint`

## Project Layout
- `app/`: Expo Router routes (screens)
- `components/`: reusable UI components
- `utils/supabase.ts`: Supabase client initialization
- `global.css`: NativeWind/Tailwind directives

## Supabase (Auth)
The Supabase client is created in `utils/supabase.ts` using Expo public env vars.

Create `apps/mobile/.env` with:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_KEY`

Guidelines:
- Only use anon/public keys on-device.
- Never put service role keys or other secrets into mobile bundles.

## Deep Links / Auth Redirects (Template placeholders)
`app.json` contains placeholders (`<REPLACE_ME>`) for:
- `expo.name`
- `expo.slug`
- `expo.scheme`

When you clone this template, replace these values and ensure:
- Supabase auth redirect URLs match your web origin.
- Mobile deep links use your chosen scheme (e.g. `myapp://`).

## Styling (NativeWind)
- Use `className` on RN components where NativeWind supports it.
- Keep Tailwind directives in `global.css` (`@tailwind base/components/utilities`).

## LLM Providers / AI
Do **not** call OpenAI/Anthropic/Gemini directly from mobile.

Pattern:
- Implement AI routes in the web app (Next.js route handlers) using **Vercel AI SDK**.
- Call those routes from mobile.

## Tooling / Conventions
- Uses **Biome** for formatting + linting.
- Keep everything **strict TypeScript**.
- When adding dependencies: `pnpm --filter mobile add <pkg>`
- When configuring new deps: consult the **Context7 MCP server** for up-to-date docs and examples.

## More Docs
Local machine prerequisites and environment setup are in `docs/SETUP.md` (repo root).


