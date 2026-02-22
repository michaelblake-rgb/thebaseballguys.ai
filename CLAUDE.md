# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Baseball Guys AI — a React application using ReactFlow for node-based visual workflows/pipelines, built with Vite, Clerk for authentication, Neon (serverless Postgres) for the database, and shadcn/ui as the sole UI component library.

## Tech Stack

- **Framework:** React 19 + Vite 7 (TypeScript, strict mode)
- **Flow Editor:** ReactFlow (`@xyflow/react`)
- **Auth:** Clerk (`@clerk/clerk-react`)
- **Database:** Neon serverless Postgres (`@neondatabase/serverless`)
- **UI:** shadcn/ui (New York style) — do not introduce other component libraries (no MUI, Chakra, Ant Design, etc.)
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Icons:** Lucide React

## Common Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # TypeScript check + Vite production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npx shadcn@latest add <component>  # Add a shadcn/ui component
```

## Project Structure

```
src/
├── main.tsx          # Entry point — ClerkProvider wraps app here
├── App.tsx           # Root component — auth guards + ReactFlow canvas
├── index.css         # Global styles, Tailwind theme (oklch CSS vars)
├── lib/
│   ├── utils.ts      # cn() utility for Tailwind class merging
│   └── db.ts         # Neon serverless connection helper (server-side only)
├── components/ui/    # shadcn/ui components (none added yet)
├── nodes/            # Custom ReactFlow node types (not created yet)
└── edges/            # Custom ReactFlow edge types (not created yet)
```

## Architecture Notes

- **Vite + React SPA:** Single-page application. Entry point is `src/main.tsx`. Path alias `@/*` maps to `src/*`.
- **ReactFlow:** Full-screen canvas (`h-screen w-screen`) with `<Background />` and `<Controls />`. No custom nodes or edges yet. Flow state management will use Zustand (ReactFlow's recommended store, not yet installed).
- **Clerk Auth:** `<ClerkProvider>` wraps the app in `main.tsx`. `App.tsx` uses `<SignedOut>` → `<RedirectToSignIn />` and `<SignedIn>` → ReactFlow canvas. `<UserButton />` renders in the top-right corner.
- **Neon DB:** Project "thebaseballguys.ai" (`falling-cherry-13441360`) on `aws-us-east-1`, Postgres 17. Connection helper in `src/lib/db.ts` exports `getDb()` using the HTTP driver. `DATABASE_URL` has no `VITE_` prefix — it is server-side only (for Trigger.dev tasks, edge functions, etc.). Database is currently empty (no schema defined).
- **shadcn/ui:** Configured (`components.json`) with New York style, no RSC, Lucide icons. Components install to `src/components/ui/`. No components have been added yet.

## Environment Variables

Expected in `.env` (or `.env.local`):
```
VITE_CLERK_PUBLISHABLE_KEY=   # Clerk frontend key (required)
DATABASE_URL=                  # Neon pooled connection string (server-side only)
```

## Setup Progress

- [x] Scaffold Vite + React + TypeScript project
- [x] Configure Tailwind CSS 4 + shadcn/ui
- [x] Deploy and configure Clerk (auth guards, UserButton, ClerkProvider)
- [x] Deploy and configure Neon (project created, DATABASE_URL in .env, db helper)
- [ ] Define database schema (tables, migrations)
- [ ] Set up Trigger.dev (initialize, configure trigger.config.ts, create task directory)
- [ ] Build custom ReactFlow nodes and edges
- [ ] Add shadcn/ui components as needed
- [ ] Install and configure Zustand for flow state management

## Conventions

- All UI components must come from shadcn/ui. Use `npx shadcn@latest add <component>` to add new ones.
- Use `cn()` utility (from `src/lib/utils.ts`) for conditional Tailwind class merging.
- ReactFlow custom nodes should extend shadcn primitives for consistent styling.
- Use `@/` path alias for all imports (e.g., `import { cn } from "@/lib/utils"`).
- `DATABASE_URL` must never be exposed to the client — no `VITE_` prefix.
