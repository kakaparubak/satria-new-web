# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for Satria Chandra (lighting designer) built with TanStack Start, Tailwind CSS v4, and GSAP for animations.

## Commands

```bash
bun install           # Install dependencies
bun --bun run dev     # Start development server
bun --bun run build   # Build for production
bun --bun run preview # Preview production build
bun --bun run test    # Run tests with Vitest
bun --bun run lint    # Lint with ESLint
bun --bun run format  # Format with Prettier + fix lint
bun --bun run check   # Check formatting without writing
```

Uses **Bun** as package manager. Always use `bun --bun` when running scripts.

## Architecture

### File-based Routing
Routes live in `src/routes/`. The root layout is `src/routes/__root.tsx`. Route tree is auto-generated in `src/routeTree.gen.ts` — do not edit manually.

### Key Files
- `src/router.tsx` — Router creation with SSR query integration
- `src/routes/index.tsx` — Home page composing HeroSection, StatsSection, RCheckSection
- `src/styles.css` — Tailwind imports and custom theme fonts (Anton, Oswald, Inter)
- `public/data.ts` — Static image data for sections (statsImages, rcheckImages)

### Components
- `HeroSection` — Full-screen hero with large typography
- `StatsSection` — GSAP-animated overlapping images with mouse parallax
- `RCheckSection` — Reality Check section (in progress)

### Styling
Tailwind CSS v4 with `@tailwindcss/vite` plugin and `@tailwindcss/typography` plugin. Custom fonts defined via Google Fonts import in styles.css.

### Animations
GSAP with `@gsap/react` plugin. StatsSection uses `useGSAP` hook for scroll-triggered animations and mouse parallax effects.

### DevTools
TanStack Router DevTools and TanStack Query DevTools are integrated in the root layout shell.

## Important Notes

- `src/routeTree.gen.ts` is auto-generated — any changes will be overwritten
- Read current component state before modifying — GSAP animations may have complex state dependencies
- The site uses CSS custom fonts: Anton (display), Oswald (headings), Inter (body)
- Theme (light/dark/auto) is initialized via inline script in `__root.tsx` before React hydrates