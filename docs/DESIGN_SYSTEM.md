# NexusMind — Design System

> **This is the single source of truth for all UI implementation.** Every future component, page, and modification must conform to the standards defined here. Descriptions of what currently exists and prescriptions for what must be used are unified — there is no distinction between "legacy" and "standard" except where explicitly noted.

---

## Table of Contents

1. [Design Language](#1-design-language)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Design Tokens](#3-design-tokens)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [Spacing & Layout](#6-spacing--layout)
7. [Border Radius](#7-border-radius)
8. [Shadows & Elevation](#8-shadows--elevation)
9. [Backgrounds & Gradients](#9-backgrounds--gradients)
10. [Animations & Transitions](#10-animations--transitions)
11. [Components](#11-components)
12. [Page Templates](#12-page-templates)
13. [Section Patterns](#13-section-patterns)
14. [Navigation](#14-navigation)
15. [Forms](#15-forms)
16. [Icons](#16-icons)
17. [Responsive Design](#17-responsive-design)
18. [Accessibility](#18-accessibility)
19. [Code Organization](#19-code-organization)
20. [Rules & Anti-Patterns](#20-rules--anti-patterns)

---

## 1. Design Language

### Identity

NexusMind is a psychological wellness platform. The visual language communicates **calm, depth, and trustworthiness** through:

- **Dark immersive glassmorphism** — frosted surfaces layered over rich gradient backgrounds give depth without heaviness.
- **Purple-teal palette** — deep purples and teals evoke intuition, clarity, and healing. Neon cyan (`#00F2FF`) acts as a precise, high-contrast signal color.
- **Single typeface** — Lexend is used at all sizes. It is clean, readable, and wellness-appropriate.
- **Consistent 8px radius** — a single border radius creates visual harmony across every surface.
- **Restraint in animation** — transitions are purposeful. Everything uses one of two durations: `300ms` for micro-interactions, `1000ms` for entrance animations.

### Interaction Principles

- Hover states: soft glow shadows + subtle brightness lift. Never abrupt color jumps.
- Focus states: `ring-2 ring-brand` (cyan) on all interactive elements.
- Entrance: every content block enters via `ScrollReveal` — fade up + scale from 95%.
- Transition easing: `cubic-bezier(0.25,1,0.5,1)` for entrance/exit, `ease-in-out` for hover.

---

## 2. Tech Stack & Architecture

| Category | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Routing | React Router DOM v7 |
| Forms | React Hook Form + Zod |
| State | Zustand |
| Data Fetching | TanStack Query |
| HTTP | Axios |
| Icons | Lucide React |

### Directory Structure

```
src/
├── app/              # router.tsx, providers.tsx, App.tsx
├── assets/           # Images, SVGs
├── components/       # Shared atoms: button/, input/
├── features/
│   ├── auth/         # Pages, forms, schemas
│   ├── landing/      # All public pages
│   │   ├── components/
│   │   │   ├── sections/     # One file per landing section
│   │   │   ├── news/         # News-specific components
│   │   │   ├── gallery/      # Gallery-specific components
│   │   │   └── ScrollReveal/ # Scroll animation wrapper
│   │   ├── constants/        # Static data arrays
│   │   ├── hooks/            # useActiveSection, useRoadmapMascot
│   │   └── pages/            # Page-level components
│   └── onboarding/   # Onboarding wizard
├── routes/           # PATHS constant
├── store/            # Zustand stores
└── styles/           # globals.css — all tokens + utilities
```

### Routes

| Path | Page |
|---|---|
| `/` | Landing |
| `/journal` | Journal |
| `/psychologist/:id` | Psychologist Detail |
| `/blog` | Blog |
| `/articles` | Articles |
| `/news` | News |
| `/news/:id` | News Detail |
| `/gallery` | Gallery |
| `/login` | Login |
| `/register` | Registration |
| `/forgot-password` | Forgot Password |
| `/verify-otp` | OTP Verification |
| `/new-password` | New Password |
| `/registration-success` | Success |
| `/onboarding` | Onboarding |

---

## 3. Design Tokens

All tokens are defined in `src/styles/globals.css` inside `@theme {}`. They map directly to Tailwind utility classes.

### Color Tokens

```css
/* Core brand */
--color-brand:        #00F2FF;               /* Cyan — active states, focus, glows */
--color-accent:       #A682FF;               /* Purple — secondary emphasis, links */
--color-primary-text: #E0E0E0;               /* Default text */

/* UI surfaces */
--color-ui-bg:        #0D1117;               /* True dark (auth bg) */
--color-ui-surface:   rgba(255,255,255,0.06);/* Input fills, subtle cards */
--color-ui-glass:     rgba(255,255,255,0.08);/* Glass card fill (.glass-card) */
--color-ui-border:    rgba(255,255,255,0.12);/* Standard border */
--color-ui-muted:     rgba(224,224,224,0.7); /* Placeholder / helper text */

/* Ambient gradient anchors (do not use directly as fills) */
--color-gradient-start: #7B2CBF;
--color-gradient-end:   #1B3A4B;
```

### Font Token

```css
--font-sans: "Lexend", sans-serif;
```

### Radius Tokens

> All `--radius-*` tokens are overridden to `8px`. The codebase uses a single border radius for all rectangular elements.

```css
--radius-xs through --radius-4xl: 8px
```

### Tailwind Aliases

| Tailwind Class | Resolves To |
|---|---|
| `text-brand` | `#00F2FF` |
| `text-accent` | `#A682FF` |
| `text-primary-text` | `#E0E0E0` |
| `text-ui-muted` | `rgba(224,224,224,0.7)` |
| `bg-ui-bg` | `#0D1117` |
| `bg-ui-surface` | `rgba(255,255,255,0.06)` |
| `bg-ui-glass` | `rgba(255,255,255,0.08)` |
| `border-ui-border` | `rgba(255,255,255,0.12)` |
| `font-sans` | `"Lexend", sans-serif` |

---

## 4. Color System

### Brand Colors

| Role | Token / Value | Tailwind Class | Usage |
|---|---|---|---|
| **Brand Cyan** | `#00F2FF` | `text-brand` / `bg-brand` | Active nav, focus rings, glow, read-more links |
| **Accent Purple** | `#A682FF` | `text-accent` / `bg-accent` | Secondary buttons, password indicator, form links |

### Purple Scale

The codebase uses several purple variants. The canonical values and their specific contexts are:

| Value | Context |
|---|---|
| `#9f5bff` | Onboarding progress bar, onboarding CTA buttons, selection state borders |
| `#a88bff` | CTA section submit button, VR section CTA button |
| `#c084fc` | Journal save button, psychologist booking button |
| `#a072ff` | Roadmap SVG connector paths (stroke only) |
| `#581c87` / `hover:#581c87` | News detail "Məsləhət Al" button, `NewsHero` read button |

> **Rule:** Do not introduce additional purple values. Map new purple needs to the closest value above.

### Text Opacity Scale

| Class | Alpha | Usage |
|---|---|---|
| `text-white` | 100% | Primary headings, card titles |
| `text-white/90` | 90% | Emphasis body text |
| `text-white/80` | 80% | Standard body text, paragraphs |
| `text-white/70` | 70% | Secondary descriptions |
| `text-white/60` | 60% | Muted metadata, date labels |
| `text-white/50` | 50% | Very muted (copyright, footer legal) |
| `text-white/40` | 40% | Disabled or decorative-only |
| `text-white/30` | 30% | Icon fills at rest (e.g. Eye icon) |
| `text-primary-text` | — | Input labels (`#E0E0E0`) |
| `text-ui-muted` | — | Placeholder text in inputs |
| `text-brand` | — | Active links, brand highlights |
| `text-accent` | — | Auth page links, password indicator |

### Surface / Background Fills

| Tailwind / Value | Opacity | Usage |
|---|---|---|
| `bg-white/5` | 5% | Subtle button states (glass btn hover) |
| `bg-ui-surface` / `bg-white/6` | 6% | Input background, subtle card fill |
| `bg-ui-glass` / `bg-white/8` | 8% | `.glass-card` base fill |
| `bg-white/10` | 10% | Hero mini-cards, nav drawer items at rest |
| `bg-white/15` | 15% | Filter button hover |
| `bg-white/20` | 20% | CTA section card, onboarding selected option |
| `bg-[#1e293b]/30` | — | News/Gallery card surface (legacy; use for these cards only) |
| `bg-[#2a3a46]/70` | — | Onboarding container (unique; do not generalize) |
| `#111827` | — | Mobile nav drawer background (solid) |

### Component-Specific Colors

These are intentional one-off colors tied to specific components. Do not reuse them outside their documented context.

| Component | Color | Role |
|---|---|---|
| FeaturesSection — "Gündəlik Rituallar" card | `#2A7B9B` | Card solid background |
| FeaturesSection — "Gündəlik Notlar" card | `#276F8C` | Card solid background |
| Roadmap — card 1 & 3 | `#155567` | Card solid background (teal) |
| Roadmap — card 2 | `#7B4B8B` | Card solid background (purple) |
| HeroSection — primary button | `#591b98` default, `#6c22b5` hover | Button background |
| VR section — floating content panel | `#eeb3b3` at 30% opacity | Panel background tint |
| Onboarding — loading indicator dot | `#ffb040` | Active dot color |
| Psychologist — badge accent | `#03C6B2` | Price / rating teal |
| Journal — selected mood | `#9333ea` | Mood icon background |
| Journal — default mood | `#2b6a8c` | Mood icon background |
| Journal — timeline dot (latest) | `#00f2ff` | Dot color (= brand) |
| Journal — timeline dot (older) | `#d8b4fe` | Dot color |
| Accordion — open item background | `#F4F5F6` | Light fill (inverted) |
| Accordion — open item title | `#1a2b3c` | Dark text (inverted) |
| Accordion — body text | `#475467` | Dark body text (inverted) |
| Testimonials — card background | `white` | White card (inverted on gradient) |
| Testimonials — quote text | `#155a6d` | Dark teal text |
| Testimonials — author name | `#1a2b3c` | Dark text |
| Testimonials — author role | `#667085` | Muted gray text |
| Footer — social icon bg | `#422B63` default, `#5E3F8C` hover | Circle background |
| Auth — OTP input border | `#4F4F6C` | Default border for OTP digits |
| Auth — OTP icon container | `#113B4A` | Icon circle background |
| Auth — success icon container | `#1A4F65` | Icon circle background |
| News Detail — blockquote accent | `#c39ffd` | Quote icon + cite color |
| News Detail — checkmark icon | `#2dd4bf` | Check icon (teal) |
| News Detail — checkmark bg | `rgba(17,94,89,0.3)` border `rgba(17,94,89,0.6)` | Checkmark circle |

### Validation Colors

| State | Color |
|---|---|
| Error border | `border-red-500` |
| Error ring | `ring-red-500` |
| Error message | `text-red-400 text-xs` |

---

## 5. Typography

### Font Family

**One font: Lexend** — loaded from Google Fonts in `index.html` (weights 300–700). Applied globally via `font-sans` on `html, body`. Never import or use another font family.

**Editorial exception:** `font-serif` (system serif) is used exclusively for the `<h1>` page title on content-heavy inner pages: Journal, Psychologist Detail, Blog, and Articles. This is an intentional stylistic accent — do not extend it to other elements.

### Type Scale

The following is the canonical scale. Use these sizes. Do not introduce intermediate sizes.

#### Headings

| Role | Mobile | Desktop | Weight | Tracking |
|---|---|---|---|---|
| Landing H1 (hero card title) | `text-[28px]` | `sm:text-[40px] lg:text-[48px]` | `font-bold` | `tracking-tight` |
| Section H2 (standard) | `text-[30px]` | `sm:text-[44px]` | `font-bold` | `tracking-tight` |
| Inner page H1 (editorial) | `text-[42px]` | `sm:text-[56px]` | `font-light font-serif` | `leading-tight` |
| Auth H1 | `text-[32px]` | `text-[32px]` | `font-bold` | `tracking-tight` |
| Onboarding H2 | `text-[32px]` | `sm:text-[36px]` | `font-bold` | `tracking-tight` |
| Card H3 (feature, roadmap) | `text-[22px]` | `sm:text-[26px]` | `font-semibold` | `tracking-tight` |
| Card H3 (expert, news hero) | `text-[18px]` | `sm:text-[20px]` | `font-semibold` | — |
| News detail hero title | `text-[24px]` | `sm:text-[32px] lg:text-[40px]` | `font-semibold` | `tracking-tight` |

#### Body & UI Text

| Role | Size | Weight | Notes |
|---|---|---|---|
| Section subheading | `text-[15px] sm:text-[19px]` | `font-normal` | Under section H2 |
| Card body text | `text-[13px] sm:text-[14px]` | `font-light` | Line-height `leading-relaxed` |
| Nav items (desktop) | `text-[15px]` | `font-medium` | — |
| Nav items (mobile) | `text-[16px]` | `font-medium` | Sub-items: `text-[14px]` |
| Input label | `text-[14px]` | `font-medium` | `text-primary-text` |
| Input placeholder | `text-[14px]` | `font-normal` | `text-ui-muted` |
| Input error | `text-[12px]` | `font-normal` | `text-red-400` |
| Footer links | `text-[14px]` | `font-normal` | — |
| Footer section heading | `text-[16px]` | `font-semibold` | — |
| Badge / tag text | `text-[10px] sm:text-[11px]` | `font-bold` | `uppercase tracking-widest` |
| Breadcrumb / meta | `text-[12px] sm:text-[13px]` | `font-medium` | — |
| News detail body | `text-[15px] sm:text-[16px]` | `font-light` | `leading-relaxed` |

### Text Transform & Spacing Rules

- `tracking-tight` — all headings (H1, H2, H3)
- `tracking-widest` + `uppercase` — badge/tag text, mood labels, micro-labels
- `tracking-wider` — timestamps, category labels (metadata only)
- `tracking-wide` — feature card H3 and VR section heading (exceptions within their components)

---

## 6. Spacing & Layout

### Page Horizontal Padding (Standard)

All pages must use this responsive padding scale on the root content wrapper:

```
px-4 sm:px-8 md:px-12 lg:px-[72px]
```

> **Legacy note:** News and Gallery pages currently use flat `px-[72px]`. This is a known inconsistency that should be migrated to the standard scale when those pages are refactored.

### Content Max-Widths

Two standard container widths are used. Choose based on context:

| Width | Token | Usage |
|---|---|---|
| `max-w-[1100px]` | **Standard** | Most sections: Features, Roadmap, Auth layout, Blog/Articles content |
| `max-w-[1200px]` | **Wide** | Sections with large imagery: VR, Experts grid, Footer inner, News Detail |

Additional specific max-widths (do not generalize these):

| Value | Context |
|---|---|
| `max-w-[1056px]` | Hero card |
| `max-w-[898px]` | CTA section card |
| `max-w-[800px]` | Onboarding step container |
| `max-w-[650px]` | CTA email form |
| `max-w-[420px]` | Auth form inner |
| `max-w-[280px]` | Hero primary button |

### Vertical Section Spacing

| Section type | Top padding | Bottom padding |
|---|---|---|
| **Standard landing section** | `py-10 md:py-20` | (same) |
| Hero | `pt-[60px] sm:pt-[80px]` | `pb-[80px] sm:pb-[100px]` |
| CTA | `pt-10 md:pt-[112px]` | `pb-10 md:pb-0` |
| Experts (last section, contains Footer) | `pt-10 md:pt-[112px]` | — |
| Inner page top | `pt-[40px]` | — |
| Inner page bottom | — | `pb-[80px]` |
| Gallery / News pages top | `pt-[32px]` | — |

### Gap Scale

Use only these gap values. Do not use arbitrary gap values.

| Value | Canonical Usage |
|---|---|
| `gap-2` | Tag/badge rows, icon+text pairs |
| `gap-3` | Footer link groups, breadcrumb separators |
| `gap-4` | Nav items, side-by-side form fields |
| `gap-5` | Form field stacks |
| `gap-6` | Card internal content, section component groups |
| `gap-8` | Card grids, two-column page layouts |
| `gap-10` | News detail body ↔ sidebar |
| `gap-12` | Footer link column groups (mobile) |
| `gap-16` | News detail body ↔ sidebar (lg+) |
| `gap-20` | Footer link column groups (desktop), Pillars image ↔ content |

Special-use gaps (do not generalize):

| Value | Context |
|---|---|
| `gap-28` | Roadmap cards (mobile) |
| `gap-[240px]` | Roadmap cards (desktop) |

### Card Internal Padding

| Card Type | Padding |
|---|---|
| Standard glass card | `p-6 sm:p-8` |
| Feature card (bento) | `p-6 sm:p-8 pb-[17px]` |
| Roadmap / Testimonial card | `p-6 sm:p-10` |
| Expert profile card | `p-6` |
| News card content area | `p-6` |
| News hero content panel | `p-6 sm:p-8 lg:p-10` |
| Onboarding step container | `p-8 sm:p-12` |
| Auth form inner wrapper | `px-6 py-8` |

---

## 7. Border Radius

**The entire design system uses a single border radius: `8px`.**

All Tailwind `--radius-*` tokens are set to `8px`, so `rounded-lg` always equals `8px`.

| Shape | Class | When to use |
|---|---|---|
| **Rectangular** | `rounded-lg` | Cards, buttons, inputs, dropdowns, modals, badges, tags, sections |
| **Circular** | `rounded-full` | Avatar images, icon circles, progress dots, timeline dots, language tags |
| **Top-only** | `rounded-t-lg` | Footer container |

> **Badge inconsistency:** Some badge elements use `rounded-md` (6px). The standard is `rounded-lg`. Use `rounded-lg` on all new badge elements. Existing `rounded-md` badges are legacy and should be migrated.

---

## 8. Shadows & Elevation

### Elevation Levels

Use the lowest elevation that creates sufficient depth.

| Level | Tailwind | Value | Usage |
|---|---|---|---|
| 1 — Surface | `shadow-lg` | Default large shadow | Feature cards, filter bars |
| 2 — Raised | `shadow-xl` | Deeper shadow | Profile cards, booking widgets |
| 3 — Lifted | `shadow-2xl` | Deepest Tailwind shadow | Roadmap cards, VR section image |
| 4 — Custom deep | `shadow-[0_30px_70px_rgba(0,0,0,0.5)]` | Extra heavy | VR full-bleed image only |
| Glass | Custom | `0 8px 32px rgba(0,0,0,0.25), 0 0 18px rgba(0,242,255,0.08)` | `.glass-card` surfaces |

### Glow Shadows (Branded Hover States)

| Context | Shadow value |
|---|---|
| Primary button hover (cyan) | `shadow-[0_0_18px_rgba(0,242,255,0.4)]` |
| Secondary button hover (purple) | `shadow-[0_0_18px_rgba(166,130,255,0.4)]` |
| CTA / VR button default | `shadow-[0_4px_14px_rgba(168,139,255,0.4)]` |
| CTA / VR button hover | `shadow-[0_6px_20px_rgba(168,139,255,0.6)]` |
| Glass button hover | `shadow-[0_0_24px_rgba(0,242,255,0.15)]` |
| Nexie mascot (desktop) | `drop-shadow-[0_0_35px_rgba(0,242,255,0.4)]` |

### Animated Nav Shadow

Applied by `.nav-active-glow` (mobile active nav items):

```css
@keyframes nav-pulse {
  0%, 100% {
    box-shadow: inset 4px 0 8px -4px rgba(0, 242, 255, 0.4);
    text-shadow: 0 0 8px rgba(0, 242, 255, 0.3);
  }
  50% {
    box-shadow: inset 4px 0 16px -4px rgba(0, 242, 255, 0.8);
    text-shadow: 0 0 14px rgba(0, 242, 255, 0.7);
  }
}
/* Applied as: animation: nav-pulse 2s infinite ease-in-out */
```

---

## 9. Backgrounds & Gradients

### Page Background Gradients

There are exactly **four background gradient contexts**. Do not create new gradients.

#### G1 — Global Body Default

```css
/* Applied in globals.css on html, body */
background: linear-gradient(260.37deg, #263151 -4.41%, #245D68 51.97%, #914899 100%);
background-attachment: fixed;
```

This is the base background visible through all glass surfaces.

#### G2 — All Inner Pages

```css
/* Applied via inline style on the root <div> of every inner page */
style={{ background: 'linear-gradient(320deg, #914899 -4.41%, #263151 51.97%, #245D68 100%)' }}
```

Every inner page (Journal, Blog, Articles, News, Gallery, Psychologist) must use this exact value.

#### G3 — Dynamic Landing Page Layers

The Landing Page uses three gradient layers that cross-fade based on `activeSection`. These are implementation details of `LandingPage.tsx` and are not reusable.

| Layer | Gradient | Trigger |
|---|---|---|
| Layer 1 (base) | `linear-gradient(260.37deg, #263151 -4.41%, #245D68 51.97%, #914899 100%)` | Always visible |
| Layer 2 | `linear-gradient(180deg, #263151 5%, #245D68 45%, #914899 95%)` | `activeSection` 2–4 |
| Layer 3 | `linear-gradient(45deg, #263151 0%, #245D68 60%, #914899 100%)` | `activeSection` ≥ 7 |

#### G4 — Auth Right Panel

```css
/* Tailwind: bg-gradient-to-br from-[#1E293B] to-[#0F172A] */
```

Applied to the right illustration panel of `AuthPageLayout`. Not used elsewhere.

### Glass Card Surface

The `.glass-card` utility class is the standard for frosted surfaces:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 0 0 18px rgba(0, 242, 255, 0.08);
}
```

Use `.glass-card` for: nav dropdowns, sort dropdowns, and the auth layout outer container. For inline card elements, apply the equivalent Tailwind classes: `bg-ui-glass backdrop-blur-[18px] border border-ui-border`.

### Decorative Orbs

These are ambient light elements — not interactive, never focusable.

**Landing Page (top-left ambient orb):**
```jsx
<div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%]
                bg-[#b070ff] rounded-full blur-[150px] opacity-20 pointer-events-none z-10" />
```

**Auth Right Panel (neon orbs):**
```jsx
<div className="absolute bottom-[30%] left-[20%] w-32 h-32 bg-brand/30 blur-[60px] rounded-full pointer-events-none" />
<div className="absolute top-[20%] right-[20%] w-40 h-40 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />
```

### Gradient Border Technique

Used for the auth submit button and the nav login button. This renders a 1.5px gradient-colored border stroke using a CSS mask:

```jsx
{/* Wraps any button element */}
<div className="absolute inset-0 rounded-lg pointer-events-none transition-opacity group-hover:opacity-80
                bg-gradient-to-r from-purple-600 via-indigo-500 to-white/90"
  style={{
    padding: '1.5px',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }}
/>
```

**Nav login button uses a different gradient:** `from-[#9f5bff] via-[#00f2ff] to-white/90`

---

## 10. Animations & Transitions

### Two Durations — No Exceptions

| Duration | Usage |
|---|---|
| `duration-300` | All hover states, focus states, color changes, dropdown reveals, icon toggles |
| `duration-1000` | `ScrollReveal` entrance animations, landing background cross-fade |

Special-case durations (do not generalize):
- `duration-700` — card image zoom on hover (NewsCard, GalleryCard)
- `duration-[800ms]` — GalleryCard image zoom (legacy; align to `duration-700` on refactor)
- `duration-[3s]` — VR section image zoom (intentionally slow, cinematic)
- `duration-500` — filter pills slide animation

### Easing

| Easing | Class | Usage |
|---|---|---|
| `cubic-bezier(0.25,1,0.5,1)` | `ease-[cubic-bezier(0.25,1,0.5,1)]` | Entrance/exit animations, ScrollReveal, mobile drawer |
| `ease-in-out` | `ease-in-out` | Landing background cross-fade, nav-pulse keyframe |
| `ease-out` | `ease-out` | Card image zoom |

### ScrollReveal

**File:** `src/features/landing/components/ScrollReveal/index.tsx`

Wraps every landing page section. Uses `IntersectionObserver` at 10% threshold with `-5% 0px -5% 0px` root margin. Elements re-hide when scrolled back out of view.

| State | Classes |
|---|---|
| Hidden | `opacity-0 translate-y-12 scale-95 pointer-events-none` |
| Visible | `opacity-100 translate-y-0 scale-100` |

```
transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
```

### Card Image Zoom

```
Standard cards (NewsCard, GalleryCard):
  group-hover:scale-105  transition-transform duration-700 ease-out

NewsHero featured card:
  group-hover:scale-[1.02]  transition-transform duration-[1000ms] ease-out

VR section background image:
  group-hover:scale-105  transition-transform duration-[3s]
```

### Mobile Nav Transitions

```
Hamburger → X icon:   rotate(-90deg) scale(0.5) opacity-0   →  rotate(0) scale(1) opacity-100
Drawer open:          translateY(-16px) opacity-0            →  translateY(0) opacity-1
Duration: 300ms, easing: cubic-bezier(0.25,1,0.5,1)
Nav item stagger:     transitionDelay: index × 60ms
```

### Dropdown Transitions

| Dropdown | Hidden state | Visible state |
|---|---|---|
| Desktop nav Media dropdown | `opacity-0 translate-y-2 pointer-events-none` | `group-hover:opacity-100 translate-y-0` |
| Sort / filter dropdown | `opacity-0 translate-y-2 pointer-events-none` | `opacity-100 translate-y-0` |
| Filter pills reveal | `max-w-0 opacity-0 -translate-x-8` | `max-w-[700px] opacity-100 translate-x-0` (duration-500) |
| Accordion body | `max-h-0 opacity-0` | `max-h-[200px] opacity-100` (duration-300 ease-in-out) |

### Global Keyframes

**`nav-pulse`** — see §8 (Shadows). Applied to `.nav-active-glow`.

**`ticker`** — partner logo strip:
```css
@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}
.animate-ticker {
  display: flex;
  width: max-content;
  animation: ticker 30s linear infinite;
}
.animate-ticker:hover { animation-play-state: paused; }
```

### Loading Spinner

```jsx
<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
```

### Footer Mascot

```
Speech bubble:  animate-bounce
Body:           transition-transform duration-700 group-hover:scale-105
```

---

## 11. Components

### 11.1 Button

**File:** `src/components/button/index.tsx` — the only button implementation in the project.

#### Base Classes

```
inline-flex items-center justify-center rounded-lg font-medium
transition-[all_0.3s_ease]
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
disabled:pointer-events-none disabled:opacity-50
cursor-pointer overflow-hidden relative
```

#### Variants

| Variant | Background | Text Color | Hover Effect |
|---|---|---|---|
| `primary` | `bg-brand` (`#00F2FF`) | `#0D1117` (dark) | `brightness-110` + cyan glow |
| `secondary` | `bg-accent` (`#A682FF`) | `white` | `brightness-110` + purple glow |
| `outline` | transparent | `text-brand` | `bg-[rgba(0,242,255,0.08)]` + cyan glow |
| `ghost` | transparent | `text-primary-text` | `bg-ui-surface` + `text-white` |
| `glass` | `.glass-card` styles | `white` | `bg-ui-surface` + glass glow |

#### Sizes

| Size | Height | Horizontal Padding | Font Size |
|---|---|---|---|
| `sm` | `h-9` (36px) | `px-3` | `text-sm` (14px) |
| `md` | `h-11` (44px) | `px-6` | `text-base` (16px) |
| `lg` | `h-14` (56px) | `px-8` | `text-lg` (18px) |

#### Loading State

When `isLoading={true}`, renders a spinner before children and sets `disabled`. The button remains the same size.

#### Auth Button Pattern

Every auth form submit button uses this exact wrapper:

```jsx
<div className="relative w-full group">
  {/* Gradient border overlay */}
  <div
    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-500 to-white/90
               pointer-events-none transition-opacity group-hover:opacity-80"
    style={{
      padding: '1.5px',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    }}
  />
  <Button
    type="submit"
    variant="glass"
    size="lg"
    className="w-full !border-0 !rounded-lg bg-white/5 hover:bg-white/10"
    isLoading={isSubmitting}
  >
    Button label
  </Button>
</div>
```

---

### 11.2 Input

**File:** `src/components/input/index.tsx` — the only text input implementation in the project.

#### Structure

```jsx
<div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
  <label className="text-[14px] text-primary-text font-medium ml-1">
    {label}
  </label>
  <div className="relative flex items-center">
    <input
      className={`
        w-full h-11 px-4 bg-ui-surface border border-ui-border rounded-lg
        text-[14px] text-white placeholder-ui-muted transition-colors
        focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand
        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
      `}
    />
    {rightElement && (
      <span className="absolute right-3 text-ui-muted">{rightElement}</span>
    )}
  </div>
  {error && <span className="text-red-400 text-xs ml-1">{error}</span>}
</div>
```

#### Props

| Prop | Type | Purpose |
|---|---|---|
| `label` | `string` | Field label |
| `error` | `string` | Error message |
| `rightElement` | `ReactNode` | Slot for eye-toggle or icon |
| `containerClassName` | `string` | Override on outer wrapper |

#### Eye Toggle (Password)

```jsx
<button
  type="button"
  tabIndex={-1}
  onClick={toggle}
  className="text-ui-muted hover:text-white transition-colors"
>
  {show ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
```

---

### 11.3 Glass Card

The glass card is a **pattern**, not a standalone component. Apply it using the `.glass-card` utility class or equivalent inline classes.

**CSS utility** (defined in `globals.css`):
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), 0 0 18px rgba(0, 242, 255, 0.08);
}
```

**Inline Tailwind equivalent:**
```
bg-ui-glass backdrop-blur-[18px] border border-ui-border
shadow-[0_8px_32px_rgba(0,0,0,0.25),_0_0_18px_rgba(0,242,255,0.08)]
```

Use `.glass-card` when the class is available. Use inline Tailwind when inside JSX without access to the class name.

---

### 11.4 ScrollReveal

**File:** `src/features/landing/components/ScrollReveal/index.tsx`

A `forwardRef` `<div>` wrapper using `IntersectionObserver`. Apply to the immediate inner wrapper of every landing page section.

```jsx
<section id="[id]" className="...section styles...">
  <ScrollReveal className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
    {/* section content */}
  </ScrollReveal>
</section>
```

---

### 11.5 NewsCard

**File:** `src/features/landing/components/news/NewsCard.tsx`

```
Container:  bg-[#1e293b]/30 backdrop-blur-md rounded-lg border border-white/10 shadow-xl
            flex flex-col h-full
            hover:border-white/20 hover:translate-y-[-4px] transition-all duration-300

Image block:  Link > <img>, aspect-[3/2], group-hover:scale-105 duration-700 ease-out
              Overlay:  bg-black/10 group-hover:bg-transparent duration-300

Content area: p-6 flex flex-col flex-1 justify-between
  Top:
    Badge:  bg-white/10 border border-white/15 rounded-md px-2.5 py-1
            text-[10px] font-bold uppercase tracking-widest
    Date:   text-white/50 text-[12px] font-medium
    Title:  Link > h3 text-white text-[18px] font-semibold leading-snug line-clamp-2
            group-hover:text-brand duration-300
    Body:   p text-white/60 text-[13px] font-light leading-relaxed line-clamp-3

  Bottom (border-t border-white/5 pt-4):
    View counter:  Eye(14) text-white/30 + span text-white/50 text-[12px]
    CTA link:      text-brand text-[13px] font-semibold hover:underline
```

---

### 11.6 GalleryCard

**File:** `src/features/landing/components/gallery/GalleryCard.tsx`

```
Container:  relative aspect-[3/2] rounded-lg overflow-hidden border border-white/10 shadow-lg group

Image:      w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out

Overlay:    absolute inset-0 bg-black/15 group-hover:bg-transparent duration-300 pointer-events-none

Badge:      absolute bottom-4 right-4
            bg-white/10 backdrop-blur-md border border-white/15 rounded-lg
            px-3.5 py-1.5 text-[10px] md:text-[11px] font-medium text-white/90
            tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.15)]
```

---

### 11.7 Accordion

**File:** `src/features/landing/components/sections/PillarsSection.tsx`

Used only in PillarsSection. This is a bespoke component — it intentionally uses a light background (`#F4F5F6`) when open, creating a contrast inversion against the dark gradient.

| State | Classes |
|---|---|
| Container (closed) | `bg-transparent rounded-lg overflow-hidden` |
| Container (open) | `bg-[#F4F5F6] rounded-lg overflow-hidden` |
| Trigger | `w-full flex items-center justify-between py-[18px] px-6 hover:bg-white/5` |
| Title (closed) | `text-white font-semibold` |
| Title (open) | `text-[#1a2b3c] font-semibold` |
| Body (hidden) | `max-h-0 opacity-0 overflow-hidden` |
| Body (visible) | `max-h-[200px] opacity-100` — `transition-all duration-300 ease-in-out` |
| Body text | `text-[#475467] text-[13px] sm:text-[14px] leading-relaxed` |

---

### 11.8 Password Strength Indicator

**File:** `src/features/auth/components/PasswordStrengthIndicator.tsx`

4 horizontal segment bars that fill based on password score:

| Segment state | Classes |
|---|---|
| Active | `bg-accent shadow-[0_0_8px_rgba(166,130,255,0.6)]` |
| Inactive | `bg-ui-surface border border-ui-border` |

Label: `text-[10px] text-ui-muted font-semibold uppercase tracking-wider`
Score labels: `ZƏİF` (1) · `NORMAL` (2) · `YAXŞI` (3) · `GÜCLÜ` (4)

---

### 11.9 OTP Input

**File:** `src/features/auth/components/VerifyOtpForm.tsx`

6 individual `<input>` elements rendered as digit boxes:

```
w-[52px] h-[52px] text-center text-[24px] font-medium
bg-transparent text-white
border border-[#4F4F6C] rounded-[8px]
focus:ring-1 focus:ring-brand focus:border-brand
```

Error state: `border-red-500 focus:border-red-500 focus:ring-red-500`

Supports paste (auto-distributes digits) and auto-advance on single keystroke.

---

### 11.10 Onboarding Option Selectors

**File:** `src/features/onboarding/pages/OnboardingPage.tsx`

Three layouts based on `question.layout`:

**`cards`** — 2-col (mobile) / 3-col (desktop) grid:
```
button: p-6 rounded-lg flex flex-col items-center gap-4
  Image: w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-full
  Label: text-[18px] sm:text-[20px] font-medium

Unselected: bg-white/5 border-2 border-transparent hover:bg-white/10
Selected:   bg-white/20 border-2 border-[#9f5bff] shadow-[0_0_15px_rgba(159,91,255,0.3)]
```

**`circles`** — flex wrap, centered:
```
button: flex flex-col items-center gap-5
  Ring: w-[170px] h-[170px] rounded-full p-[3px]
  Image: w-full h-full rounded-full overflow-hidden bg-[#1E293B]
  Label: text-[24px] font-medium

Unselected: ring bg-gradient-to-br from-[#7030a0] to-[#401080]
Selected:   ring bg-gradient-to-br from-[#b070ff] to-[#6020c0] scale-105
            shadow-[0_0_20px_rgba(176,112,255,0.4)]
```

**default** — 1-col (mobile) / 2-col (desktop) grid:
```
button: flex items-center p-3 rounded-lg gap-6
  Image: w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full
  Label: text-[20px] font-medium

Unselected: bg-white/10 border-2 border-transparent hover:bg-white/15
Selected:   bg-white/20 border-2 border-[#9f5bff] shadow-[0_0_15px_rgba(159,91,255,0.3)]
```

---

## 12. Page Templates

### 12.1 Landing Page

```jsx
<div className="w-full min-h-screen flex flex-col relative font-sans text-white">
  {/* Absolute: 3 gradient layers, cross-fade via activeSection */}
  {/* Absolute: Ambient purple orb top-left */}
  <LandingNavbar activePage="landing" activeSection={n} scrollToSection={fn} />
  <main className="flex-1 w-full relative">
    <div className="w-full relative flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <PillarsSection />
      <TestimonialsSection />
      <RoadmapSection />
      <VrConsultationSection />
      <CtaSection />
      <ExpertsSection />  {/* renders <Footer /> internally */}
    </div>
  </main>
</div>
```

### 12.2 Standard Inner Page

All inner pages (Journal, Blog, Articles, News, Gallery, Psychologist) must use this exact shell:

```jsx
<div
  className="min-h-screen w-full flex flex-col font-sans text-white"
  style={{ background: 'linear-gradient(320deg, #914899 -4.41%, #263151 51.97%, #245D68 100%)' }}
>
  <LandingNavbar activePage="[page-id]" />
  <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-[40px] pb-[80px]
                   flex flex-col items-center">
    {/* Page content */}
  </main>
  <Footer />
</div>
```

> Never use a different background value on inner pages. Never omit `LandingNavbar` or `Footer`.

### 12.3 Auth Pages

```jsx
<AuthPageLayout>
  {/* AuthPageLayout renders: */}
  {/*   Left panel (md:w-[45%]): children (the form) */}
  {/*   Right panel (hidden md:block flex-1): illustration + neon orbs */}
</AuthPageLayout>
```

`AuthPageLayout` outer container: `max-w-[1100px] min-h-[700px] glass-card rounded-lg flex flex-col md:flex-row overflow-hidden`

Auth form inner wrapper (used by all auth forms):

```jsx
<div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
  {/* Logo → Home link */}
  {/* h1: text-[32px] font-bold text-white tracking-tight */}
  <form className="flex flex-col gap-5">
    {/* Input fields */}
    {/* Auth Button Pattern (see §11.1) */}
  </form>
  {/* Helper text + link */}
</div>
```

### 12.4 Onboarding Page

```jsx
<div className="min-h-screen flex flex-col p-6 sm:p-10">
  {/* Logo + Back button */}
  <div className="flex-1 flex items-center justify-center">
    <div className="bg-[#2a3a46]/70 backdrop-blur-md border border-white/10 w-full max-w-[800px]
                    min-h-[550px] rounded-lg p-8 sm:p-12 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      {/* Progress bar */}
      {/* Step counter: text-[13px] text-white/60 */}
      {/* h2: text-[32px] sm:text-[36px] font-bold text-white tracking-tight */}
      {/* Option selector (cards | circles | default) */}
      {/* Navigation buttons */}
    </div>
  </div>
</div>
```

### 12.5 News Detail Page

```jsx
<div className="min-h-screen w-full flex flex-col font-sans text-white"
     style={{ background: 'linear-gradient(320deg, #914899 -4.41%, #263151 51.97%, #245D68 100%)' }}>
  <LandingNavbar activePage="news" />
  <main className="flex-1 w-full px-4 sm:px-8 md:px-12 lg:px-[72px] pt-8 pb-[80px]">
    <div className="w-full max-w-[1200px] mx-auto flex flex-col">
      <NewsDetailHeader />
      <NewsDetailHero />     {/* aspect-[21/9] full-width hero */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="flex-1"><NewsDetailBody /></div>
        <aside className="w-full lg:w-[300px] xl:w-[340px]"><NewsDetailSidebar /></aside>
      </div>
      <NewsDetailRelated />
    </div>
  </main>
  <Footer />
</div>
```

---

## 13. Section Patterns

### Standard Section Shell

```jsx
<section
  id="[section-id]"
  className="relative w-full min-h-0 md:min-h-screen flex flex-col items-center justify-center
             px-4 sm:px-8 md:px-12 lg:px-[72px] py-10 md:py-20 scroll-mt-20"
>
  <ScrollReveal className="w-full max-w-[1100px] mx-auto flex flex-col items-center">
    {/* content */}
  </ScrollReveal>
</section>
```

Rules:
- All sections must have an `id` for scroll targeting
- All sections must have `scroll-mt-20`
- All sections must wrap content in `<ScrollReveal>`
- Exceptions: Hero, CTA, and Experts sections omit `md:min-h-screen`

### Standard Section Header

```jsx
<div className="text-center mb-10">
  <h2 className="text-[30px] sm:text-[44px] font-bold text-white mb-3 tracking-tight">
    Heading Text
  </h2>
  <p className="text-[15px] sm:text-[19px] text-white/80">
    Subheading text
  </p>
</div>
```

### Bento Grid (FeaturesSection)

```jsx
<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="md:col-span-2 bg-ui-glass ...">  {/* Large card */}</div>
  <div className="bg-[#2A7B9B] ...">               {/* Teal card */}</div>
  <div className="bg-[#276F8C] ...">               {/* Teal card */}</div>
  <div className="md:col-span-2 bg-ui-glass ...">  {/* Large card */}</div>
</div>
```

### Two-Column (Image + Content)

Used in PillarsSection:

```jsx
<div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
  <div className="w-full lg:w-[582px] h-[300px] sm:h-[400px] lg:h-[728px] rounded-lg overflow-hidden flex-shrink-0">
    <img className="w-full h-full object-cover" />
  </div>
  <div className="w-full lg:w-[45%] xl:w-[50%] flex flex-col">
    {/* Accordion list */}
  </div>
</div>
```

### Expert Cards Grid

```jsx
<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
  {psychologists.map(p => (
    <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10
                    hover:bg-white/10 transition-colors shadow-xl">
      {/* Profile row, description, tags, CTA */}
    </div>
  ))}
</div>
```

### Roadmap Cards

3 cards in a `flex flex-col` column, alternating `self-auto` / `self-end`:
- Cards: `max-w-[581px] min-h-[345px] md:h-[345px]`
- SVG connectors: `stroke="#a072ff" strokeWidth="3" strokeDasharray="8 8"`
- Partner ticker: `w-screen -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-[72px]` (negative margin bleed)

---

## 14. Navigation

### LandingNavbar

**File:** `src/features/landing/components/LandingNavbar.tsx`

**Props:**

| Prop | Type | Description |
|---|---|---|
| `activePage` | `ActivePage` | Controls which nav item is highlighted |
| `activeSection` | `number?` | Landing-page section index (0–9) |
| `scrollToSection` | `(id: string) => void?` | Scroll handler for landing |

**ActivePage:** `'landing' | 'journal' | 'psychologist' | 'blog' | 'articles' | 'news' | 'gallery'`

#### Header Element

```
<header>: sticky top-0 w-full z-50
           px-4 sm:px-8 md:px-[72px] py-4
           flex items-center justify-between
           bg-white/5 backdrop-blur-md border-b border-white/10
```

#### Desktop Nav

`hidden md:flex items-center gap-8 text-[15px] font-medium`

Nav items and their `activePage` mapping:

| Label | Type | Scroll index / activePage match |
|---|---|---|
| Əsas səhifə | scroll | index 0 |
| Mütəxəssislər | scroll | index 9 |
| Media | dropdown | `blog` / `articles` / `news` / `gallery` |
| Maariflənmə | scroll | index 2 |
| Qeydlərim | navigate → `/journal` | `journal` |
| Vr konsultasiya | scroll | index 7 |

**Active state:** `text-brand font-semibold` + `::after` underline (`h-0.5 bg-brand w-full`)

**Default state:** `text-white/60 hover:text-white transition-colors duration-300`

**Media dropdown:** `glass-card` container, `w-48`, `group-hover` reveal, items navigate to `/blog`, `/articles`, `/news`, `/gallery`.

**Login button:** Gradient border mask technique with `from-[#9f5bff] via-[#00f2ff] to-white/90`. Inner button: `px-8 py-2.5 text-[15px] bg-transparent hover:bg-white/5`.

#### Mobile Nav

Hamburger button: `p-2 w-10 h-10` — renders `Menu` / `X` icons with animated swap.

Drawer: rendered via `createPortal(…, document.body)`

```
fixed inset-0 top-[headerHeight] z-[9999] bg-[#111827]
flex flex-col overflow-y-auto
```

Item behavior:
- Default: `text-white/70`
- Active: `text-brand font-semibold nav-active-glow`
- Entrance: `transitionDelay: index × 60ms`, slide-in from `translateY(-16px)`
- Login button: `bg-gradient-to-r from-[#9f5bff] to-[#00f2ff] py-3.5 rounded-lg`

#### Scrollbars

Hidden globally in `globals.css`. Class `.no-scrollbar` available for explicit suppression.

```css
::-webkit-scrollbar { display: none; }
* { -ms-overflow-style: none; scrollbar-width: none; }
```

---

## 15. Forms

### Standard Auth Form Layout

```jsx
<div className="w-full h-full flex flex-col justify-center max-w-[420px] mx-auto px-6 py-8">
  <div className="mb-8">
    <Link to={PATHS.HOME}>
      <img src={nexusLogo} alt="Nexus Mind" className="h-10 object-contain mb-6" />
    </Link>
    <h1 className="text-[32px] font-bold text-white tracking-tight mb-2">Page Title</h1>
    <p className="text-[14px] text-ui-muted leading-relaxed">Subtitle text</p>
  </div>

  <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
    <Input label="..." {...register('field')} error={errors.field?.message} />
    {/* Auth Button Pattern */}
  </form>

  <div className="mt-6 text-center">
    <p className="text-[14px] text-ui-muted">
      Helper text{' '}
      <Link to={PATHS.LOGIN} className="text-brand hover:text-white font-medium transition-colors">
        Link text
      </Link>
    </p>
  </div>
</div>
```

### Validation

- **Library:** React Hook Form + `@hookform/resolvers/zod`
- **Mode:** `onTouched` — validates on blur, re-validates on change
- **Schema location:** `features/auth/schemas/[form-name].schema.ts`
- **Error display:** `text-red-400 text-xs ml-1` (via `Input` component's `error` prop)

### CTA Email Form

```jsx
<form className="w-full max-w-[650px] flex flex-col sm:flex-row gap-4 mt-2">
  <input
    type="email"
    className="flex-1 bg-[#0b2430] rounded-lg px-6 py-3.5 sm:px-8 sm:py-5
               text-[14px] sm:text-[16px] text-white placeholder-white/50
               focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
    placeholder="Email ünvanınız"
  />
  <button
    type="submit"
    className="bg-[#a88bff] hover:bg-[#9773fc] text-[#1a2b3c] font-bold
               text-[14px] sm:text-[16px] rounded-lg px-6 py-3.5 sm:px-10 sm:py-5
               transition-all duration-300
               shadow-[0_4px_14px_rgba(168,139,255,0.4)]
               hover:shadow-[0_6px_20px_rgba(168,139,255,0.6)]"
  >
    Göndər
  </button>
</form>
```

### Journal Textarea

```jsx
<textarea
  className="w-full flex-1 bg-transparent text-white text-[18px]
             resize-none outline-none placeholder:text-white/80 leading-relaxed"
/>
```

---

## 16. Icons

### Library

**Lucide React** is the only permitted icon library. Never import from other sources.

### Canonical Sizes

| Size | Usage |
|---|---|
| 14px | View counter Eye, small dropdown chevrons |
| 16px | Nav ChevronDown, filter bar chevrons |
| 18px | Password eye toggles, CTA arrow |
| 20px | Accordion ChevronDown, journal history |
| 24px | Section feature icons, mobile hamburger/close |
| 28px | Roadmap card icons |
| 44px | OTP MailCheck |
| 52px | Registration success Handshake |

### Colors

| Color class | Usage |
|---|---|
| `text-brand` (`#00f2ff`) | Feature card icons on glass background, active state chevrons |
| `text-white` | Nav toggle, general icons |
| `text-white/70` | Psychologist detail info icons |
| `text-white/60` | Sort dropdown chevron |
| `text-white/30` | View counter Eye icon |
| `text-ui-muted` | Input right-element (eye toggle) |
| `text-[#c39ffd]` | Quote icon in News Detail |

### Pairing with Text

Always `flex items-center` with gap. Use `gap-2` for compact pairings (badges, meta), `gap-3` for card metadata rows, `gap-4` for heading+icon rows.

---

## 17. Responsive Design

### Breakpoints

| Prefix | Min-width | Purpose |
|---|---|---|
| `sm` | 640px | Tablet portrait |
| `md` | 768px | Tablet landscape / small desktop |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |

### Layout Patterns

| Pattern | Classes |
|---|---|
| Single → two column | `flex flex-col md:flex-row` |
| Single → three column | `grid grid-cols-1 md:grid-cols-3` |
| Two-column page layout | `flex flex-col lg:flex-row gap-8` |
| Right sidebar | `w-full lg:w-[350px] xl:w-[400px]` |

### Navigation

| Element | Mobile | Desktop |
|---|---|---|
| Nav links | `hidden` | `md:flex` |
| Login button | `hidden` | `md:block` |
| Hamburger | `flex` | `md:hidden` |
| Mobile drawer | Portal, full-screen, `bg-[#111827]` | — |

### Auth Layout

| Element | Mobile | Desktop |
|---|---|---|
| Form panel | Full width | `md:w-[45%]` |
| Illustration panel | `hidden` | `md:block flex-1` |

### Hero Mascot

| Breakpoint | Position | Size |
|---|---|---|
| Mobile | Inside hero card, bottom | `w-[135px] sm:w-[165px]` |
| Desktop | Outside card, bottom-left | `w-[285px]` |

### Typography Scaling

All headings use responsive size pairs. Never use a fixed heading size without a responsive counterpart (unless it is an auth H1 which is fixed at `text-[32px]`).

---

## 18. Accessibility

### What Is Implemented

- **Focus rings:** `Button` → `focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`. `Input` → `focus:ring-1 focus:ring-brand`.
- **Semantic HTML:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<aside>` used correctly.
- **Images:** All `<img>` elements have descriptive `alt` attributes.
- **Form labels:** All inputs labelled via the `Input` component.
- **Interactive elements:** All buttons use `<button>` or `<Link>` except where noted below.

### Known Gaps (Do Not Replicate)

| Gap | Location | Impact |
|---|---|---|
| `<div onClick>` for mood selection | `JournalPage.tsx` | Not keyboard accessible |
| No `aria-label` on loading spinner | `Button` component | Screen readers cannot announce loading state |
| No `aria-modal` or focus trap | Mobile nav drawer | Focus may escape the drawer |
| `focus:outline-none` on ad-hoc buttons | Various sections | Keyboard users lose focus visibility |

> When building new interactive elements, always use `<button>` or `<Link>`. Never suppress outlines on buttons without providing an alternative focus indicator.

---

## 19. Code Organization

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `NewsCard.tsx` |
| Hooks | `use` prefix + camelCase | `useActiveSection.ts` |
| Constants / data arrays | SCREAMING_SNAKE_CASE | `NEWS_ITEMS`, `GALLERY_ITEMS` |
| Route paths | SCREAMING_SNAKE_CASE keys | `PATHS.NEWS_DETAIL` |
| Exports | Named exports only | `export const NewsCard = ...` |

### Architecture

Feature-first: code lives in its feature domain folder. Shared atoms only go in `src/components/`.

```
New page:         features/[feature]/pages/[PageName]Page.tsx
New section:      features/landing/components/sections/[Name]Section.tsx
New data:         features/landing/constants/[name].ts
New shared atom:  src/components/[name]/index.tsx
New route:        routes/paths.ts  +  app/router.tsx
```

### Custom Hooks

| Hook | Purpose |
|---|---|
| `useActiveSection` | Tracks which landing section intersects the viewport (drives nav highlighting + bg cross-fade) |
| `useRoadmapMascot` | Animates the Nexie mascot SVG position along the roadmap path |

---

## 20. Rules & Anti-Patterns

### Before Writing Any UI

1. Read the relevant sections of this document for the component/page type you are building.
2. Search `src/components/` for an existing atom that covers your need.
3. Search `features/*/components/` for an existing pattern.
4. Only build new if nothing reusable exists.

### Mandatory Standards

| Category | Rule |
|---|---|
| **Colors** | Use only the values in §4. Map purple needs to the existing purple scale. |
| **Backgrounds** | Inner pages always use Gradient G2 (320°). Landing uses G1/G3. Auth right panel uses G4. |
| **Typography** | Lexend only. `font-serif` only for editorial inner-page H1s. |
| **Radius** | `rounded-lg` (rectangles) or `rounded-full` (circles). Nothing else. |
| **Padding** | Page horizontal: `px-4 sm:px-8 md:px-12 lg:px-[72px]`. |
| **Max-width** | Standard container: `max-w-[1100px]`. Wide container: `max-w-[1200px]`. |
| **Transitions** | `duration-300` for hover/interactive. `duration-1000` for entrance. |
| **Sections** | Always use `scroll-mt-20`, `<ScrollReveal>`, and an `id`. |
| **Buttons** | Always use `<Button>` from `src/components/button/`. |
| **Inputs** | Always use `<Input>` from `src/components/input/`. |
| **Icons** | Lucide React only. Use canonical sizes from §16. |
| **Auth layout** | Always use `<AuthPageLayout>` wrapper. |
| **Inner pages** | Always use the standard inner page shell from §12.2. |
| **Footer** | Never place `<Footer>` inside `<main>`. |
| **Interactive HTML** | Never use `<div onClick>`. Use `<button>` or `<Link>`. |

### Anti-Patterns

- Introducing a new color not documented in §4
- Adding a new gradient or changing stop values / angles of existing gradients
- Using a font other than Lexend (outside the editorial exception)
- Using `rounded-md` on new elements — standardize to `rounded-lg`
- Nesting a new page wrapper around the standard inner-page shell
- Re-implementing Button or Input inline instead of using the shared components
- Importing icons from any library other than `lucide-react`
- Using `inline style` for a color that has a Tailwind token
- Adding a third `duration-*` value for hover states (use only `duration-300`)
- Building a duplicate component when an existing one can be extended with a new prop or variant

### Introducing New Patterns

When a genuinely new reusable pattern is required:

1. Confirm it cannot be satisfied by an existing component + props
2. Build the new pattern in the appropriate feature or shared directory
3. Update this document (§11 for components, §13 for section patterns) before the PR is merged

---

*Last refined: 2026-07-12 — Standardized from reverse-engineered draft. All visual identity preserved. No design changes made.*
