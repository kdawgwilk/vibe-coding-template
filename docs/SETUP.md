# Local Setup (macOS)

This repo is a **template monorepo** for:
- `apps/web`: Next.js fullstack app (Tailwind + shadcn/ui)
- `apps/mobile`: Expo + React Native (NativeWind)
- Auth on both: Supabase

## Prerequisites

### System / package tooling
- **Homebrew** (recommended): `https://brew.sh`
- **Node.js** (recommend latest LTS)
  - This repo uses `pnpm` via `"packageManager": "pnpm@10.25.0"` in the root `package.json`.
- **pnpm via Corepack** (recommended):
  - `corepack enable`

### iOS (for `pnpm dev:ios`)
- **Xcode** (App Store)
- **Xcode Command Line Tools**:
  - `xcode-select --install`
- **CocoaPods** (only needed if you run `expo prebuild` / native projects):
  - `brew install cocoapods` (or install via RubyGems)
- **Watchman** (recommended for React Native):
  - `brew install watchman`

### Android (for `pnpm dev:android`)
- **Android Studio**
- **Android SDK + Emulator**
- Ensure standard Android env vars are set (often via shell profile):
  - `ANDROID_HOME`
  - `PATH` includes Android SDK platform-tools

### Supabase
- A Supabase project (hosted) is the default assumption for this template.
- Optional: Supabase CLI if you want local dev / migrations: `https://supabase.com/docs/guides/cli`

## Clone + Install
From repo root:
- `pnpm install`

## Environment Variables

### Web (`apps/web`)
Create: `apps/web/.env.local`

Minimum recommended vars:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Optional server-only (never prefix with `NEXT_PUBLIC_`):
- `SUPABASE_SERVICE_ROLE_KEY`

If you add AI routes using Vercel AI SDK, add provider keys here (server-only), e.g.:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`

### Mobile (`apps/mobile`)
Create: `apps/mobile/.env`

Required vars (used by `apps/mobile/utils/supabase.ts`):
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Notes:
- Expo only exposes variables prefixed with `EXPO_PUBLIC_` to the app bundle.
- Do **not** put any secret keys in mobile env.

## Supabase Project Checklist (recommended)
- **Auth**:
  - Enable the auth providers you need (email/password, OAuth, etc).
- **Redirect URLs** (web):
  - Add your local dev URL (typically `http://localhost:3000`) as an allowed redirect / site URL.
- **Deep links** (mobile):
  - Update `apps/mobile/app.json` placeholders (`<REPLACE_ME>`) including `expo.scheme`.
  - Use that scheme when configuring mobile auth redirects (e.g. `myapp://auth-callback`).

## Run Locally

### Web
From repo root:
- `pnpm dev` (or `pnpm dev:web`)

### Mobile (Expo)
From repo root:
- `pnpm dev:ios`
- `pnpm dev:android`

Alternative (from `apps/mobile/`):
- `pnpm dev`

## Linting / Formatting (Biome)
- **Autofix** (writes changes): `pnpm lint`
- **CI check** (no writes): `pnpm lint:ci`

Notes:
- The repo intentionally uses **Biome** instead of ESLint/Prettier.
- If you paste in code from elsewhere, prefer running `pnpm lint` before committing.

## Adding Dependencies (pnpm workspace)
Add dependencies to the package that needs them:
- Web: `pnpm --filter web add <pkg>`
- Mobile: `pnpm --filter mobile add <pkg>`

## LLM Providers / Vercel AI SDK
Guidelines for this template:
- Use **Vercel AI SDK** to integrate providers (OpenAI/Anthropic/Gemini/etc).
- Put provider keys and calls on the **server** (Next.js route handlers).
- Mobile should call your web API; it should not embed provider secrets.

When configuring new deps or provider features, use the **Context7 MCP server** for up-to-date docs and examples.

## Troubleshooting

### Expo can’t see `EXPO_PUBLIC_*` vars
- Confirm you created `apps/mobile/.env` and the keys start with `EXPO_PUBLIC_`.
- Restart the Expo dev server after changing env vars.

### iOS issues
- Open Xcode once after install and accept licenses.
- If you run `expo prebuild`, you may need `pod install` under the generated `ios/` directory.

### Android issues
- Ensure an emulator exists and is running (Android Studio Device Manager).
- Verify `ANDROID_HOME` and SDK toolchain paths.
