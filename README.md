# NexusMind Web

A mental health and psychological wellbeing platform built with React + TypeScript + Vite.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| State | Zustand |
| Server State | TanStack React Query |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Analytics | Vercel Analytics + Speed Insights |

## Project Structure

```
src/
├── api/                    # Axios HTTP client & interceptors
├── app/                    # App bootstrap (App, Providers, Router)
├── assets/                 # Images, SVGs, and static media
│   └── svg/
├── components/             # Shared UI components (Button, Input)
├── constants/              # Design tokens (colors, spacing, typography…)
├── features/               # Feature modules
│   ├── auth/               # Registration, Login, OTP, Password reset
│   │   ├── components/     # Form components + AuthPageLayout
│   │   ├── pages/          # Route-level page components
│   │   └── schemas/        # Zod validation schemas
│   ├── landing/            # Public marketing & content pages
│   │   ├── components/     # Navbar, Footer, ScrollReveal, sections/
│   │   │   └── sections/   # HeroSection, FeaturesSection, PillarsSection…
│   │   ├── constants/      # Landing-specific data (pillars, testimonials)
│   │   ├── data/           # Psychologist profiles
│   │   ├── hooks/          # useActiveSection, useRoadmapMascot
│   │   ├── pages/          # LandingPage, JournalPage, PsychologistPage
│   │   └── types/          # Psychologist type definitions
│   └── onboarding/         # User onboarding flow
│       ├── constants/      # IMAGE_MAP for onboarding assets
│       ├── data/           # onboardingData.json
│       └── pages/          # OnboardingPage
├── routes/                 # PATHS constant (route path definitions)
├── store/                  # Zustand stores (appStore, authStore)
└── styles/                 # globals.css (Tailwind theme + utilities)
```

## Getting Started

```bash
npm install
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Architecture Principles

- **Feature-based structure** — each feature is self-contained with its own components, pages, hooks, constants, and types
- **Single Responsibility** — pages are pure composition layers; logic lives in hooks and utilities
- **DRY** — shared layouts (`AuthPageLayout`) and data constants eliminate duplication
- **No God Components** — large pages are decomposed into focused section components
