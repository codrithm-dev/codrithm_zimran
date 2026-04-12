# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the Codrithm student tech community platform.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Codrithm (`artifacts/codrithm/`)
- **Type**: React + Vite web app
- **Preview path**: `/`
- **Description**: Full-featured student tech community platform
- **Tech**: React, Vite, TypeScript, Tailwind CSS, Framer Motion, Wouter, Recharts, ShadCN UI
- **Theme**: Deep indigo/violet dark mode with cyan accents
- **Pages (8 user)**: Splash, Login/Signup, Home, Categories, Category Detail, Join (multi-step form), Profile, Confirmation
- **Pages (7 admin)**: Admin Login, Dashboard, Content CRUD, Users, Requests, Analytics, Settings
- **Features**: Dark/light mode, animated counters, scroll-reveal, card tilt parallax, form validation with toasts, Recharts charts

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/codrithm run dev` — run Codrithm frontend locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
