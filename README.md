# Codrithm - Student Tech Community Platform

**Build. Learn. Grow Together.**

A modern, frontend-only web application for student developers to discover technology, build real projects, and connect with like-minded peers.

## 🚀 Features

- **10 Tech Categories**: Web Dev, Mobile, AI/ML, Cybersecurity, Game Dev, DevOps, Data Science, UI/UX, Blockchain, Open Source
- **Beautiful UI**: Modern design with Tailwind CSS, Radix UI components, and smooth Framer Motion animations
- **3D Graphics**: Interactive Three.js hero scene
- **Admin Panel**: Complete admin dashboard for managing content, users, and analytics
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Dark Theme**: Built-in dark mode support

## 📦 Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Three.js** with React Three Fiber for 3D graphics
- **Radix UI** for accessible components
- **Wouter** for lightweight routing
- **TanStack Query** for data fetching

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
cd artifacts/codrithm
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve
```

The app will be available at `http://localhost:4173` (or the PORT specified in your environment).

## 📁 Project Structure

```
codrithm_zimran/
├── artifacts/
│   ├── codrithm/          # Main frontend application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Page components
│   │   │   ├── data/        # Mock data
│   │   │   └── App.tsx      # Main app component
│   │   ├── public/          # Static assets
│   │   └── package.json
│   └── mockup-sandbox/    # Design mockup preview tool
├── scripts/               # Build scripts
└── package.json          # Root workspace config
```

## 🎨 Available Pages

### Public Pages
- `/` - Splash screen with loading animation
- `/home` - Landing page with hero, categories, events, testimonials
- `/categories` - Browse all tech categories
- `/categories/:id` - Category detail page
- `/login` - User login
- `/join` - User registration
- `/profile` - User profile
- `/confirmation` - Confirmation page

### Admin Pages
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Overview with stats and charts
- `/admin/content` - Content management
- `/admin/users` - User management
- `/admin/requests` - Join request approvals
- `/admin/analytics` - Platform analytics
- `/admin/settings` - System settings

## 🎯 Categories

1. **Web Development** (1,240 members) - Beginner
2. **Mobile Development** (890 members) - Intermediate
3. **AI/Machine Learning** (1,050 members) - Advanced
4. **Cybersecurity** (620 members) - Advanced
5. **Game Development** (730 members) - Intermediate
6. **DevOps & Cloud** (550 members) - Advanced
7. **Data Science** (810 members) - Intermediate
8. **UI/UX Design** (670 members) - Beginner
9. **Blockchain/Web3** (420 members) - Advanced
10. **Open Source** (960 members) - Beginner

## 📝 Scripts

```bash
# Development
pnpm dev              # Start dev server

# Production
pnpm build            # Build for production
pnpm serve            # Preview production build

# Type checking
pnpm typecheck        # Run TypeScript type checking
```

## 🎨 UI Components

The project includes 55+ pre-built UI components from Radix UI:
- Accordion, Alert Dialog, Avatar, Badge, Button, Card, Checkbox
- Dialog, Dropdown Menu, Form, Input, Select, Tabs, Toast
- And many more...

## 🌟 Key Features

- **Smooth Animations**: Page transitions and scroll reveals using Framer Motion
- **3D Hero Scene**: Interactive Three.js background on the home page
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Type-Safe**: Full TypeScript coverage
- **Modern Stack**: Latest React 19 with cutting-edge tooling
- **Component Library**: Comprehensive set of reusable UI components

## 📄 License

MIT

## 🤝 Contributing

This is a frontend-only application with mock data. To add real functionality:
1. Connect to a backend API
2. Implement authentication
3. Add database integration
4. Set up real-time features

---

Built with ❤️ for student developers
