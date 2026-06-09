# Codrithm — Project Status

**Last Updated:** June 9, 2026  
**Status:** Frontend complete (mock data), no backend yet

---

## Overview

Codrithm is a modern React web application for a student tech community. Users can browse coding categories, view events, and manage profiles. An admin dashboard provides analytics, content management, and user/request handling.

**Currently frontend-only** — all data comes from mock files in `src/data/`. No database, no authentication, no real API.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19.1.0 |
| Language | TypeScript 5.9.2 |
| Build Tool | Vite 7.3.0 |
| Styling | Tailwind CSS 4.1.14 |
| Components | Radix UI (55+ components via shadcn/ui) |
| Animations | Framer Motion 12.23.24 |
| Routing | Wouter 3.3.5 |
| State | React Query 5.90.21, React Hook Form 7.55.0 |
| Validation | Zod 3.25.76 |
| 3D Graphics | Three.js 0.183.2 + React Three Fiber 9.5.0 |
| Icons | Lucide React 0.545.0, React Icons 5.4.0 |
| Charts | Recharts 2.15.2 |
| Package Manager | pnpm |

---

## Project Structure

```
codrithm_zimran/
├── src/
│   ├── components/           # Reusable components
│   │   ├── ui/               # 55 Radix/shadcn UI components
│   │   ├── Navbar.tsx        # Main navigation bar
│   │   ├── Footer.tsx        # Site footer
│   │   ├── AdminSidebar.tsx  # Admin panel sidebar
│   │   ├── AdminTopBar.tsx   # Admin top bar
│   │   ├── HeroScene.tsx     # 3D hero section (Three.js)
│   │   ├── CategoryCard.tsx  # Category display card
│   │   ├── EventCard.tsx     # Event display card
│   │   ├── StatCard.tsx      # Statistics card
│   │   ├── AnimatedCounter.tsx  # Animated number counter
│   │   ├── PageTransition.tsx   # Page transition wrapper
│   │   ├── ScrollReveal.tsx     # Scroll-triggered animations
│   │   └── theme-provider.tsx   # Dark/light theme context
│   ├── pages/                # Route pages
│   │   ├── Splash.tsx        # Landing/splash screen
│   │   ├── Home.tsx          # Main dashboard
│   │   ├── Login.tsx         # User login
│   │   ├── Join.tsx          # User registration
│   │   ├── Categories.tsx    # Browse categories
│   │   ├── CategoryDetail.tsx  # Single category view
│   │   ├── Profile.tsx       # User profile
│   │   ├── Confirmation.tsx  # Confirmation page
│   │   ├── not-found.tsx     # 404 page
│   │   └── admin/            # Admin pages
│   │       ├── AdminLogin.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminContent.tsx
│   │       ├── AdminUsers.tsx
│   │       ├── AdminRequests.tsx
│   │       ├── AdminAnalytics.tsx
│   │       └── AdminSettings.tsx
│   ├── data/                 # Mock data (no real backend)
│   │   ├── categories.ts
│   │   ├── events.ts
│   │   ├── users.ts
│   │   └── requests.ts
│   ├── hooks/                # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                  # Utilities
│   │   └── utils.ts          # cn() helper for Tailwind
│   ├── App.tsx               # Root component with routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles + theme variables
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── components.json           # shadcn/ui config
```

---

## Pages (16 total)

### Public (9)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Splash | Animated loading screen → redirects to /home |
| `/login` | Login | User login form |
| `/join` | Join | User registration |
| `/home` | Home | Main dashboard with featured categories/events |
| `/categories` | Categories | Browse all coding categories |
| `/categories/:id` | CategoryDetail | Category info, resources, projects |
| `/profile` | Profile | User profile page |
| `/confirmation` | Confirmation | Post-action confirmation |
| `*` | NotFound | 404 page |

### Admin (7)
| Route | Page | Description |
|-------|------|-------------|
| `/admin/login` | AdminLogin | Admin authentication |
| `/admin/dashboard` | AdminDashboard | Stats overview |
| `/admin/content` | AdminContent | Manage categories/events |
| `/admin/users` | AdminUsers | User management |
| `/admin/requests` | AdminRequests | Handle requests |
| `/admin/analytics` | AdminAnalytics | Charts and metrics |
| `/admin/settings` | AdminSettings | System settings |

---

## Key Features

- Dark/light theme toggle with localStorage persistence
- Smooth page transitions (Framer Motion)
- Scroll-triggered reveal animations
- 3D hero graphics (Three.js)
- Responsive design (mobile-first)
- Accessible components (Radix UI)
- Form validation (React Hook Form + Zod)

---

## Scripts

```bash
pnpm dev          # Start dev server (http://localhost:4173)
pnpm build        # Build for production (→ dist/)
pnpm serve        # Preview production build
pnpm typecheck    # Run TypeScript type checking
```

---

## What's Missing (Next Steps)

### High Priority
1. **Backend / Database** — Connect to Supabase (see Supabase implementation plan notes below)
2. **Authentication** — Real login/register with Supabase Auth
3. **Real Data** — Replace mock data in `src/data/` with API calls
4. **Row-Level Security** — Protect data with Supabase RLS policies

### Medium Priority
5. **Testing** — Add Vitest + React Testing Library
6. **Error Boundaries** — Graceful error handling
7. **SEO** — Meta tags and Open Graph images

### Low Priority
8. **E2E Testing** — Playwright or Cypress
9. **PWA** — Service worker for offline support
10. **Storybook** — Component documentation

---

## Supabase Integration Plan (Summary)

The plan to add Supabase as a backend was documented previously. Key phases:

1. **Setup** — Create Supabase project, install `@supabase/supabase-js`, create client in `src/lib/supabase.ts`
2. **Database** — Tables: `users`, `categories`, `events`, `event_registrations`, `requests`, `analytics`
3. **Auth** — Email/password login, admin role verification, protected routes
4. **RLS Policies** — Row-level security for all tables
5. **CRUD** — React Query hooks for all data operations
6. **Real-time** — Live updates for registrations, requests, analytics
7. **Storage** — Avatar uploads, event images (optional)
8. **Deploy** — Vercel or Netlify

**Estimated cost:** $0–45/month (Supabase free tier + Vercel free tier).

---

## Environment Variables (for Supabase — not yet created)

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## Notes

- No test suite configured yet
- No `.env` files exist — create `.env.local` when adding Supabase
- The `@replit/vite-plugins` are Replit-specific and can be removed if not using Replit
- All UI components follow shadcn/ui conventions (see `components.json`)
