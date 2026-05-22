# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for Satria Chandra (lighting designer) built with TanStack Start, Tailwind CSS v4, GSAP for animations, and Nitro for the production server.

## Commands

Uses **Bun** as package manager. Scripts in package.json invoke `vite` directly, so `bun run dev` works fine.

```bash
bun install           # Install dependencies
bun run dev           # Start development server
bun run build         # Build for production
bun run preview       # Preview production build
bun run test          # Run tests with Vitest
bun run lint          # Lint with ESLint
bun run format        # Format with Prettier + fix lint
bun run check         # Check formatting without writing
```

## Architecture

### File-based Routing
Routes live in `src/routes/`. The root layout is `src/routes/__root.tsx`. Route tree is auto-generated in `src/routeTree.gen.ts` — do not edit manually.

### Path Alias
The `#/*` alias maps to `./src/*` (configured in package.json `imports`). Use it for cleaner imports: `import HeroSection from '#/components/HeroSection'`

### Key Files
- `src/router.tsx` — Router creation with SSR query integration
- `src/routes/index.tsx` — Home page composing all sections via `ExpandingSections`
- `src/styles.css` — Tailwind imports, custom fonts (Anton, Oswald, Inter), and `@theme` block
- `public/data.ts` — Static image data for sections (statsImages, rcheckImages, projects)

### Components
The home page uses a single `ExpandingSections` component (an animated accordion) that renders these sections:
- `HeroSection` — Full-screen hero with background video and large typography
- `StatsSection` — GSAP-animated overlapping images with mouse parallax (Biography)
- `RCheckSection` — Reality Check section with logo and images
- `SkillsSection` — Skills display
- `ProjectsSection` — Projects grid/list
- `ContactSection` — Contact information

### Styling
Tailwind CSS v4 with `@tailwindcss/vite` plugin and `@tailwindcss/typography` plugin. Fonts loaded via Google Fonts in styles.css:
- Anton (display font)
- Oswald (headings)
- Inter (body)

### Animations
GSAP with `@gsap/react` plugin. Components like `ExpandingSections` and `StatsSection` use `useGSAP` hook for scroll-triggered and mouse-driven animations.

### DevTools
TanStack Router DevTools and TanStack Query DevTools are integrated in the root layout shell.

### Theme System
Theme (light/dark/auto) is initialized via inline `<script>` in `__root.tsx` before React hydrates to prevent flash of wrong theme.

## Important Notes

- `src/routeTree.gen.ts` is auto-generated — any changes will be overwritten
- GSAP animations have complex state dependencies — read current component state before modifying
- The ExpandingSections component manages which section is open via local state — content sections render even when collapsed
