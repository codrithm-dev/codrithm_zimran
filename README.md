# Codrithm

A modern software development company website showcasing services, products, projects, and the team behind Codrithm.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (New York style) |
| Animations | GSAP + Framer Motion |
| Routing | Wouter |
| State | React Query |
| 3D Graphics | Three.js + React Three Fiber |
| Icons | Lucide React |

## Getting Started

```bash
git clone https://github.com/codrithm-dev/codrithm.git
cd codrithm
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:4173` by default.

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm serve` | Preview production build |
| `pnpm typecheck` | Run TypeScript type checking |

## Features

### Pages

- **Home** — Hero section, service grid, tech stack, products showcase, CTA
- **About** — Company mission, stats, and leadership team
- **Services** — 8 service offerings (Web Dev, Cloud, Security, Mobile, AI/ML, DevOps, Data, Design)
- **Products** — Codrithm Learn, Connect, Deploy, and AI products
- **Projects** — Open-source projects and community initiatives
- **Team** — Leadership team with bios and social links
- **Blog** — Engineering insights, tutorials, and perspectives
- **Contact** — Contact form with validation

### UI/UX

- Dark/light theme support (persisted to localStorage)
- Custom cursor component
- Parallax backgrounds and scroll reveal animations
- Magnetic button hover effects
- Page transitions with AnimatePresence
- Hero section with 3D floating orbs and geometric shapes
- Responsive design across all screen sizes

### Animations (GSAP + Framer Motion)

- **Page Loader** — Logo bounce, text character stagger, progress bar, slide-up exit (every page load)
- **Scroll Progress Bar** — Gradient bar at top showing scroll position
- **Floating Particles** — 35 animated dots drifting in hero background
- **Hero Stats Counter** — Numbers animate from 0 to target (50+, 3K+, 99%)
- **Card 3D Tilt** — Service and product cards tilt toward cursor with glare effect
- **Gradient Border Pulse** — Animated gradient border on CTA section hover
- **Nav Active Indicator** — Sliding gradient underline on active nav link
- **Scroll Reveal** — GSAP ScrollTrigger-based fade/slide reveals on all sections
- **Text Reveal** — Staggered word-by-word text animation
- **Staggered Entrances** — Cards and elements animate in sequentially on scroll
- **Parallax** — Scroll-linked parallax movement on background elements

## Project Structure

```
src/
├── components/
│   ├── branding/          # Logo
│   ├── gsap/              # GSAP animation components
│   │   ├── GsapReveal.tsx
│   │   ├── GsapTextReveal.tsx
│   │   ├── GsapStagger.tsx
│   │   └── GsapParallax.tsx
│   ├── layout/            # Navbar, Footer
│   ├── sections/          # Hero, ServiceGrid, TechStack, ContactForm
│   ├── ui/                # shadcn/ui primitives
│   ├── CardTilt.tsx       # 3D perspective tilt on hover
│   ├── CustomCursor.tsx   # Dot + ring cursor replacement
│   ├── FloatingParticles.tsx  # Animated background dots
│   ├── GradientPulse.tsx  # Animated gradient border wrapper
│   ├── HeroStatCounter.tsx    # Scroll-triggered number counter
│   ├── MagneticButton.tsx # Spring physics hover pull
│   ├── PageLoader.tsx     # Full-screen loading animation
│   ├── PageTransition.tsx # Route enter/exit transitions
│   ├── ScrollProgressBar.tsx  # Top scroll indicator
│   ├── ScrollReveal.tsx   # Scroll-triggered fade/slide
│   ├── ServiceCard.tsx
│   ├── StatCard.tsx
│   └── theme-provider.tsx
├── data/                  # Static data (services, products, projects, team, blogs, categories)
├── hooks/                 # Custom hooks (use-toast, use-mobile)
├── lib/
│   ├── gsap.ts            # GSAP config + ScrollTrigger registration
│   └── utils.ts           # cn() utility
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Products.tsx
│   ├── Projects.tsx
│   ├── Team.tsx
│   └── NotFound.tsx
├── App.tsx                # Root component with providers, router, loader, scroll bar
├── main.tsx               # Entry point
└── index.css              # Global styles and theme variables
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/blog` | Blog |
| `/contact` | Contact |
| `/products` | Products |
| `/projects` | Projects |
| `/team` | Team |

## Contributing

1. Fork the repository
2. Create a branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## License

MIT
