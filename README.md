# Codrithm

A student tech community platform where developers discover tech specializations, build real projects, and find their community. Features 10 learning categories, events, multi-step onboarding, user profiles, and a full admin dashboard.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (New York style) |
| Animations | Framer Motion |
| Routing | Wouter |
| State | React Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |

## Getting Started

```bash
git clone https://github.com/codrithm-dev/codrithm.git
cd codrithm
npm install
npm run dev
```

The dev server runs at `http://localhost:4173` by default.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run serve` | Preview production build |
| `npm run typecheck` | Run TypeScript type checking |

## Features

### User-Facing

- **Splash Screen** — Animated loading sequence with progress bar
- **Home Page** — Hero section, stats, category grid, events, testimonials
- **Authentication** — Login/signup with form validation (Zod schemas)
- **Categories** — 10 tech tracks (Web Dev, AI/ML, Cybersecurity, etc.) with search and difficulty filters
- **Category Detail** — Resources, projects, and member info per category
- **Multi-Step Onboarding** — 3-step join flow (personal info, skills & interests, goals)
- **Profile** — Stats, badges, activity feed, notification/settings toggles
- **Events** — Workshops, hackathons, sprints, and bootcamps

### Admin Panel

- **Dashboard** — Member growth chart, activity log, top members table
- **Content Management** — Category and event management
- **User Management** — View and manage community members
- **Join Requests** — Approve/reject membership applications
- **Analytics** — Charts and data visualizations
- **Settings** — Platform configuration

### UI/UX

- Dark/light theme support (persisted to localStorage)
- Custom cursor component
- Parallax backgrounds and scroll reveal animations
- Magnetic button hover effects
- Page transitions with AnimatePresence
- 3D hero scene with floating orbs and geometric shapes
- Responsive design across all screen sizes

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives
│   ├── AdminSidebar.tsx
│   ├── AdminTopBar.tsx
│   ├── CategoryCard.tsx
│   ├── CustomCursor.tsx
│   ├── EventCard.tsx
│   ├── Footer.tsx
│   ├── HeroScene.tsx
│   ├── MagneticButton.tsx
│   ├── Navbar.tsx
│   ├── PageTransition.tsx
│   ├── ParallaxBackground.tsx
│   ├── ParallaxSection.tsx
│   ├── ScrollReveal.tsx
│   ├── StatCard.tsx
│   └── theme-provider.tsx
├── data/                # Static data (categories, events, users, requests)
├── hooks/               # Custom hooks (use-toast, use-mobile)
├── lib/                 # Utilities
├── pages/               # Route components
│   ├── admin/           # Admin panel pages
│   ├── Splash.tsx
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── Categories.tsx
│   ├── CategoryDetail.tsx
│   ├── Join.tsx
│   ├── Profile.tsx
│   ├── Confirmation.tsx
│   └── not-found.tsx
├── App.tsx              # Root component with providers and router
├── main.tsx             # Entry point
└── index.css            # Global styles and theme variables
```

## Routes

| Path | Page |
|---|---|
| `/` | Splash screen |
| `/login` | Login/Signup |
| `/home` | Home page |
| `/categories` | Category listing |
| `/categories/:id` | Category detail |
| `/join` | Multi-step onboarding |
| `/profile` | User profile |
| `/confirmation` | Post-signup confirmation |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |
| `/admin/content` | Content management |
| `/admin/users` | User management |
| `/admin/requests` | Join requests |
| `/admin/analytics` | Analytics |
| `/admin/settings` | Admin settings |

## Demo Credentials

- **User:** `demo@codrithm.dev` / `password123`
- **Admin:** `admin@codrithm.dev` / `admin123`

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License

MIT
