# Codrithm — Project Status

> **Build. Learn. Grow Together.**  
> A student tech community platform where developers discover specializations, build projects, and connect.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 5.9 |
| **Build Tool** | Vite 7 |
| **Routing** | wouter (lightweight hash-free router) |
| **Styling** | Tailwind CSS 4 + `tw-animate-css` |
| **Animation** | Framer Motion 12 |
| **UI Components** | Radix Primitives + shadcn-style components |
| **Forms** | React Hook Form + Zod |
| **State/Data** | TanStack React Query |
| **Charts** | Recharts |
| **3D (hero)** | Three.js + @react-three/fiber + drei |
| **Icons** | Lucide React |

---

## Project Structure

```
src/
├── App.tsx                   # Root app — providers, router, custom cursor
├── main.tsx                  # Entry point
├── index.css                 # Global styles (Tailwind 4, themes, utilities)
│
├── components/
│   ├── CustomCursor.tsx       # Custom cursor with dot + ring (NEW)
│   ├── MagneticButton.tsx     # Magnetic hover pull wrapper (NEW)
│   ├── ParallaxSection.tsx    # Parallax scroll motion wrapper (NEW)
│   ├── ParallaxBackground.tsx # Floating orbs & particles (NEW)
│   │
│   ├── AnimatedCounter.tsx    # Scroll-triggered number counter
│   ├── ScrollReveal.tsx       # Scroll-triggered fade/slide reveal
│   ├── PageTransition.tsx     # Page enter/exit transitions
│   ├── HeroScene.tsx          # 3D floating orbs & geometric shapes
│   ├── Navbar.tsx             # Responsive nav with theme toggle
│   ├── Footer.tsx             # Site footer
│   ├── CategoryCard.tsx       # 3D tilt card for categories
│   ├── EventCard.tsx          # Event card with progress bar
│   ├── StatCard.tsx           # Animated stat counter card
│   ├── AdminSidebar.tsx       # Admin navigation sidebar
│   ├── AdminTopBar.tsx        # Admin top bar
│   ├── theme-provider.tsx     # Light/dark theme provider
│   │
│   └── ui/                   # 50+ Radix-based UI primitives
│       ├── button.tsx, card.tsx, badge.tsx, input.tsx, ...
│       ├── dialog.tsx, drawer.tsx, sheet.tsx, dropdown-menu.tsx, ...
│       ├── toast.tsx, toaster.tsx, sonner.tsx
│       ├── chart.tsx, carousel.tsx, calendar.tsx
│       └── sidebar.tsx, skeleton.tsx, spinner.tsx, ...
│
├── pages/
│   ├── Splash.tsx             # Animated splash/loading screen
│   ├── Home.tsx               # Landing page with hero, stats, categories, events, CTA
│   ├── Login.tsx              # Login/signup with tabbed form
│   ├── Join.tsx               # Multi-step onboarding wizard
│   ├── Categories.tsx         # Category grid with search & filter
│   ├── CategoryDetail.tsx     # Single category with resources & projects
│   ├── Profile.tsx            # User profile with stats, badges, activity, settings
│   ├── Confirmation.tsx       # Post-signup confirmation with confetti
│   ├── not-found.tsx          # 404 page
│   │
│   └── admin/
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx  # KPIs, growth chart, category breakdown
│       ├── AdminContent.tsx
│       ├── AdminUsers.tsx
│       ├── AdminRequests.tsx
│       ├── AdminAnalytics.tsx
│       └── AdminSettings.tsx
│
├── data/
│   ├── categories.ts          # 10 tech categories with metadata
│   ├── events.ts              # 5 sample events
│   ├── users.ts               # 4 users + admin stats
│   └── requests.ts
│
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
└── lib/
    └── utils.ts               # cn() utility
```

---

## Routes

| Path | Page | Description |
|---|---|---|
| `/` | Splash | Animated loading screen → redirects to `/home` |
| `/home` | Home | Main landing page |
| `/login` | Login | Sign in / sign up with tabbed form |
| `/join` | Join | 3-step onboarding wizard |
| `/categories` | Categories | Category grid with search + difficulty filter |
| `/categories/:id` | CategoryDetail | Single category detail |
| `/profile` | Profile | User profile with stats & settings |
| `/confirmation` | Confirmation | Post-signup success page |
| `/admin/login` | AdminLogin | Admin authentication |
| `/admin/dashboard` | AdminDashboard | Admin KPIs & charts |
| `/admin/content` | AdminContent | Content management |
| `/admin/users` | AdminUsers | User management |
| `/admin/requests` | AdminRequests | Join requests |
| `/admin/analytics` | AdminAnalytics | Detailed analytics |
| `/admin/settings` | AdminSettings | Admin configuration |

---

## Animation Features

### Page-Level
- **Splash screen** — rotating rings, floating orbs, spring logo entrance, progress bar, fade-out exit
- **Page transitions** — `PageTransition` wraps pages with fade + slide (opacity + y offset)
- **AnimatePresence** — Active in App.tsx for route change detection

### Scroll-Based
- **ScrollReveal** — Fade + slide from up/left/right on scroll into view
- **ParallaxSection** — Configurable parallax movement (speed, axis, offset) using `useScroll` + `useSpring` (NEW)
- **ParallaxBackground** — Floating orbs + particles that drift at different scroll speeds (NEW)
- **AnimatedCounter** — Number counter animates from 0 to target on scroll
- **StatCard** — Combines ScrollReveal + AnimatedCounter + hover lift

### Hover / Interaction
- **CustomCursor** — Dot + ring cursor replacement. Ring grows & turns purple on hover over interactive elements. Auto-hides on touch devices. Event delegation-based. (NEW)
- **MagneticButton** — Wrapper that pulls child element toward cursor on hover with spring physics. (NEW)
- **CategoryCard** — 3D tilt effect on mouse move (rotateX/rotateY via motion values)
- **EventCard** — Animated progress bar fill on scroll, hover shift (x: 4)
- **Navbar** — Slide-down entrance, theme toggle rotation, mobile menu animation
- **Filter buttons** — `whileHover` scale, `whileTap` scale on category filter pills

### Background
- **HeroScene** — Floating orbs, rotating geometric shapes, twinkling dots (framer-motion)
- **Splash rings** — Continuous rotating circular borders

### Form / Navigation
- **Login tabs** — Slide transition between Sign In / Sign Up forms
- **Join wizard** — 3-step with progress bar, slide transitions between steps, checkmark on completed steps
- **Mobile nav** — Slide-down accordion with AnimatePresence

### Special Effects
- **Confetti** — Particle celebration on confirmation page (30 colored pieces falling)
- **Checkmark path** — SVG pathLength animation on success checkmark
- **Ripple rings** — Expanding concentric circles on confirmation icon

### Where Parallax Is Applied

| Page | Sections |
|---|---|
| **Home** | Stats, Categories, Events + Testimonials (opposing directions), CTA |
| **Categories** | Header background, "Showing X categories" counter |
| **CategoryDetail** | Header background, Resources, Projects, Community Stats, CTA sidebar |
| **Profile** | Header background, Badges, Activity timeline, Settings |

### Where Magnetic Effects Are Applied

| Component | Elements |
|---|---|
| **Navbar** | Logo, nav links, theme toggle |
| **Home** | Hero CTA buttons, "View All Categories" button, CTA section buttons |

---

## Theme System

- **Dark mode (default)** — Deep purple/indigo palette with cyan accents
- **Light mode** — Clean white/gray with adjusted shadow intensities
- **Custom properties** — Full CSS variable system via `@theme inline`
- **Theme toggle** — Animated sun/moon icon rotation in navbar
- **Typography** — Inter (sans), JetBrains Mono (mono), Georgia (serif)
- **Shadows** — Full shadow scale (2xs → 2xl) with primary color tint
- **Elevation** — `.hover-elevate` / `.hover-elevate-2` utilities for interactive surfaces

---

## Data Layer

- **10 tech categories** — Web Dev, Mobile, AI/ML, Cybersecurity, Game Dev, DevOps, Data Science, UI/UX, Blockchain, Open Source
- **5 sample events** — Workshops, Hackathons, Competitions, Sprints, Bootcamps
- **4 users** — Student, ML Engineer, Mentor, Admin
- **Admin stats** — User growth (6 months), category breakdown, skill distribution
- **Mock auth** — Demo flow (admin@codrithm.dev logs into admin dashboard)

---

## Current State

| Aspect | Status |
|---|---|
| TypeScript Compilation | ✅ Clean — zero errors |
| Routing | ✅ All 17 routes configured |
| Responsive Design | ✅ Mobile nav, grid layouts, stacked sections |
| Dark/Light Theme | ✅ Full support |
| Forms & Validation | ✅ React Hook Form + Zod schemas |
| Admin Panel | ✅ Dashboard, Content, Users, Requests, Analytics, Settings |
| Animations | ✅ Page transitions, scroll reveals, parallax, custom cursor, magnetic buttons |
| UI Components | ✅ 50+ shadcn-style components |

---

## Potential Enhancements

- [ ] **Backend integration** — Replace mock data with real API calls via TanStack Query
- [ ] **Authentication** — Real auth with JWT/sessions instead of mock login
- [ ] **Text animations** — Typewriter effect, word-by-word reveal for headings
- [ ] **Staggered list animations** — Framer-motion variants for children
- [ ] **Loading skeletons** — Animated placeholders for cards & content
- [ ] **Click ripple effects** — Water-ring ripple on buttons
- [ ] **Image lazy loading** — Intersection observer with blur-up effect
- [ ] **Accessibility audit** — Keyboard nav, screen readers, contrast ratios
- [ ] **Performance optimization** — Code splitting, lazy loading routes
- [ ] **Unit tests** — Vitest setup for components & hooks
- [ ] **Database** — PostgreSQL or SQLite persistence
