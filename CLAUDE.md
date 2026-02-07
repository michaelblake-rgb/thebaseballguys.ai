# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Baseball Guys AI — a React application using ReactFlow for node-based visual workflows/pipelines, built with Vite, Clerk for authentication, Neon (serverless Postgres) for the database, and shadcn/ui as the sole UI component library.

## Tech Stack

- **Framework:** React + Vite (TypeScript)
- **Flow Editor:** ReactFlow (xyflow)
- **Auth:** Clerk (`@clerk/clerk-react`)
- **Database:** Neon serverless Postgres (`@neondatabase/serverless`)
- **UI:** shadcn/ui only — do not introduce other component libraries (no MUI, Chakra, Ant Design, etc.)
- **Styling:** Tailwind CSS (required by shadcn/ui)

## Common Commands

```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## Architecture Notes

- **Vite + React SPA:** Single-page application with client-side routing. Entry point is `src/main.tsx`.
- **ReactFlow:** Node/edge-based canvas UI. Custom node types live in `src/nodes/`, custom edges in `src/edges/`. Flow state management is typically colocated or handled via Zustand (ReactFlow's recommended store).
- **Clerk Auth:** Wraps the app in `<ClerkProvider>`. Protected routes use `<SignedIn>`/`<SignedOut>` components. Auth tokens are forwarded to API calls.
- **Neon DB:** Accessed via `@neondatabase/serverless` driver. Connection string comes from `DATABASE_URL` env var. Queries run over HTTP (serverless-compatible, no persistent connection pool needed).
- **shadcn/ui:** Components are copied into `src/components/ui/` via the CLI (`npx shadcn@latest add <component>`). They are local source files, not node_modules — edit them freely when needed.

## Environment Variables

Expected in `.env` (or `.env.local`):
```
VITE_CLERK_PUBLISHABLE_KEY=   # Clerk frontend key
DATABASE_URL=                  # Neon connection string (used server-side/edge only)
```

## Conventions

- All UI components must come from shadcn/ui. Use `npx shadcn@latest add <component>` to add new ones.
- Use `cn()` utility (from `src/lib/utils.ts`) for conditional Tailwind class merging.
- ReactFlow custom nodes should extend shadcn primitives for consistent styling.
