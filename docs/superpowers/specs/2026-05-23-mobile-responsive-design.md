# Mobile Responsive Design — Satria Chandra Portfolio

**Date:** 2026-05-23
**Status:** Approved

## Goal

Make the portfolio look good on mobile and small devices while preserving the existing accordion / swipe / menu interaction. Only appearance changes — no behavioral changes to navigation.

## Design Decisions

### Text Scaling
- Use `clamp()` for fluid hero typography where already in use
- Use responsive `sm:/md:/lg:` Tailwind classes for stepped breakpoints
- All large text (section labels, hero text, project names) scale down on mobile

### Section Label Tabs
- **Current:** `text-7xl font-inter font-bold tracking-tighter leading-14`
- **Mobile:** `text-3xl sm:text-4xl md:text-5xl lg:text-7xl`

## Changes by Section

### 1. Hero Section (`HeroSection.tsx`)

- "SATRIA CHANDRA" text: `text-10.5rem` → `text-5xl sm:text-7xl md:text-9xl lg:text-10.5rem`
- Lighting designer image: `w-[60%]` → `w-[80%] sm:w-[70%]`
- Background video: already covers full viewport — no change needed

### 2. Biography / Stats Section (`StatsSection.tsx`)

- Stats text: `text-7xl` → `text-2xl sm:text-3xl md:text-5xl lg:text-7xl`
- Horizontal padding: `mx-24` → `mx-4 sm:mx-8 md:mx-16 lg:mx-24`
- Flex column layout preserved (already stacked)

### 3. Skills Section (`SkillsSection.tsx`)

**Desktop:** 2x2 grid with text labels separate from image+description pairs

**Mobile:** 4 stacked full-width cards. Each card shows:
- Image on one side, description text on the other
- Image alternates left/right (DESIGN: image left, text right; PRE-VISUALIZER: text left, image right; etc.)
- PRE-VISUALIZER and OPERATE text is **right-aligned** since their images are on the left (text faces inward toward center)
- Card height: `h-[120px]` mobile, scaling up with breakpoints
- Background gradients preserved per card

### 4. RCHECK Section (`RCheckSection.tsx`)

- 5-image 2-row grid → single column vertical stack on mobile
- Grid gap: `gap-2.5` → `gap-3`
- Images take full width, rounded corners + shadows preserved

### 5. Projects Section (`ProjectsSection.tsx`)

- Project names: `text-7xl` → `text-2xl sm:text-3xl md:text-5xl lg:text-7xl`
- Date text: `text-4xl` → `text-lg sm:text-xl md:text-2xl lg:text-4xl`
- Horizontal padding: `px-12` → `px-4 sm:px-8 md:px-12`
- Image grids within project panels: stack vertically on mobile

## Out of Scope

- Contact section (already has responsive styles)
- Navigation behavior (accordion, swipe, menu button — unchanged)
- Dark/light theme changes

## File Changes

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Hero text and image responsive classes |
| `src/components/StatsSection.tsx` | Stats text size, horizontal padding |
| `src/components/SkillsSection.tsx` | Grid → stacked cards, image/text alternating sides |
| `src/components/RCheckSection.tsx` | Grid → vertical stack |
| `src/components/ProjectsSection.tsx` | Project name + date text sizes, horizontal padding |
| `src/routes/index.tsx` | Section label text sizes (all 6 tabs) |

## Breakpoints

| Name | Width | Use |
|------|-------|-----|
| Mobile (default) | < 640px | Smallest text sizes, stacked layouts |
| `sm:` | 640px+ | Slight upscaling |
| `md:` | 768px+ | Tablet sizes |
| `lg:` | 1024px+ | Desktop (restores original sizes) |