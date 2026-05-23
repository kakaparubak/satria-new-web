# Mobile Responsive Design — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add responsive Tailwind classes to 5 sections so the portfolio looks good on mobile and small devices, while preserving the existing accordion / swipe / menu interaction.

**Architecture:** Purely CSS class changes — no logic, no state, no new components. Each section component gets responsive `sm:/md:/lg:` Tailwind classes for text sizes, spacing, and layout. SkillsSection additionally changes from a 2x2 grid to stacked cards on mobile.

**Tech Stack:** TanStack Start, Tailwind CSS v4, GSAP (animations unchanged)

---

## File Changes

| File | Changes |
|------|---------|
| `src/routes/index.tsx` | Section label text sizes (6 tabs) |
| `src/components/HeroSection.tsx` | Hero text + image responsive classes |
| `src/components/StatsSection.tsx` | Stats text size + horizontal padding |
| `src/components/SkillsSection.tsx` | Grid → stacked cards layout |
| `src/components/RCheckSection.tsx` | Grid → vertical stack |
| `src/components/ProjectsSection.tsx` | Project name + date text sizes, padding |

---

## Task 1: Section Label Tabs — `src/routes/index.tsx`

**Files:** Modify: `src/routes/index.tsx`

Currently each tab label uses `text-7xl`. Update all 6 section labels to use responsive text sizes.

- [ ] **Step 1: Update HOME label**

Change:
```tsx
{ label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>HOME</p>, ... }
```
To:
```tsx
{ label: <p className='font-inter text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-14'>HOME</p>, ... }
```

- [ ] **Step 2: Update BIOGRAPHY label**

Change:
```tsx
{ label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>BIOGRAPHY</p>, ... }
```
To:
```tsx
{ label: <p className='font-inter text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-14'>BIOGRAPHY</p>, ... }
```

- [ ] **Step 3: Update SKILLS label**

Change:
```tsx
{ label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>SKILLS</p>, ... }
```
To:
```tsx
{ label: <p className='font-inter text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-14'>SKILLS</p>, ... }
```

- [ ] **Step 4: Update PROJECTS label**

Change:
```tsx
{ label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14 text-[#111111]'>PROJECTS</p>, ... }
```
To:
```tsx
{ label: <p className='font-inter text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-14 text-[#111111]'>PROJECTS</p>, ... }
```

- [ ] **Step 5: Update CONTACT label**

Change:
```tsx
{ label: <p className='font-inter text-7xl font-bold tracking-tighter leading-14'>CONTACT</p>, ... }
```
To:
```tsx
{ label: <p className='font-inter text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-14'>CONTACT</p>, ... }
```

- [ ] **Step 6: RCHECK label** — already uses an `<img>` tag, no text to resize. No changes needed.

- [ ] **Step 7: Commit**

```bash
git add src/routes/index.tsx
git commit -m "feat: make section labels responsive on mobile

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 2: Hero Section — `src/components/HeroSection.tsx`

**Files:** Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Update SATRIA and CHANDRA text sizes**

Change both `text-[10.5rem]` to `text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem]`:
```tsx
<h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] font-medium font-anton tracking-tight text-white">SATRIA</h1>
<h1 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] font-medium font-anton tracking-tight text-white">CHANDRA</h1>
```

- [ ] **Step 2: Update lighting designer image width**

Change `w-[60%]` to `w-[80%] sm:w-[70%]`:
```tsx
<img className="w-[80%] sm:w-[70%]" src="../../public/lighting-designer.png" />
```

- [ ] **Step 3: Adjust right margin on mobile**

The text container uses `mr-[5%]`. On mobile this can be reduced. Update the parent div:
```tsx
<div className="leading-none relative text-right flex flex-col items-end mr-[2%] sm:mr-[5%]">
```

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: make hero section responsive on mobile

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 3: Biography / Stats Section — `src/components/StatsSection.tsx`

**Files:** Modify: `src/components/StatsSection.tsx`

- [ ] **Step 1: Update stats text size**

Change `text-7xl` to `text-2xl sm:text-3xl md:text-5xl lg:text-7xl`:
```tsx
<div className="flex flex-col gap-4 mx-4 sm:mx-8 md:mx-16 lg:mx-24 text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-anton tracking-tight">
```

- [ ] **Step 2: Commit**

```bash
git add src/components/StatsSection.tsx
git commit -m "feat: make stats section responsive on mobile

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 4: Skills Section — `src/components/SkillsSection.tsx`

**Files:** Modify: `src/components/SkillsSection.tsx`

This is the most substantial change — converting the 2x2 grid to stacked cards on mobile.

Currently the section uses a flex column with nested flex rows for each skill pair. On mobile, each skill becomes a full-width card with image on one side and text on the other.

- [ ] **Step 1: Replace the skills layout**

The current layout is:
```tsx
<div className="w-full h-full justify-center flex items-end gap-3 @container-size">
  <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-[6cqw] tracking-tighter leading-none">DESIGN</p>
  <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-1/2 h-full flex">
    <img className="h-full w-1/2 object-cover" src="..." />
    <div className="flex justify-center items-center h-full w-1/2 bg-[#F3F3F3]">
      <p className="leading-tight text-black p-[10%] font-inter text-right text-xl font-medium tracking-tighter">...</p>
    </div>
  </div>
</div>
```

Replace the entire inner content with a stacked card layout. Each card uses:
- `flex flex-col sm:flex-row` — column on mobile, row on desktop
- On mobile: `h-[120px]`; on desktop: `h-full`
- Image alternates sides via `sm:flex-row` vs `sm:flex-row-reverse`
- Text alignment: `text-right` for cards with image on left, `text-left` for cards with image on right

Replace the entire `<div className="w-full h-full px-[4%] py-[6%] ...">` block with:

```tsx
<div className="w-full h-full px-[4%] py-[6%] flex flex-col items-center justify-center gap-6">
  {/* DESIGN */}
  <div className="w-full h-[120px] sm:h-full justify-center flex items-end gap-3 @container-size">
    <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row">
      <img className="h-1/2 sm:h-full sm:w-1/2 object-cover" src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779017197/Sketch_Plot_RAMADHAN_JAZZ_ooxf67.png" />
      <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#F3F3F3]">
        <p className="leading-tight text-black p-[10%] font-inter text-right text-lg sm:text-xl font-medium tracking-tighter">Utilizing WYSIWYG for precise dimensional accuracy and high-fidelity fixture plotting</p>
      </div>
    </div>
    <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-[6cqw] tracking-tighter leading-none hidden sm:block">DESIGN</p>
  </div>

  {/* PRE-VISUALIZER */}
  <div className="w-full h-[120px] sm:h-full justify-center flex items-end gap-3 @container-size">
    <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-[6cqw] tracking-tighter leading-none hidden sm:block">PRE-VISUALIZER</p>
    <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row-reverse">
      <img className="h-1/2 sm:h-full sm:w-1/2 object-cover" src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016889/PDI_Main_photo_lorql0.png" />
      <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#1B1B1B]">
        <p className="leading-tight text-[#EAEAEA] p-[10%] font-inter text-left text-lg sm:text-xl font-medium tracking-tighter">Seeing the finished stage before construction even begins</p>
      </div>
    </div>
  </div>

  {/* PROGRAMMING */}
  <div className="w-full h-[120px] sm:h-full justify-center flex items-end gap-3 @container-size">
    <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row">
      <img className="h-1/2 sm:h-full sm:w-1/2 object-cover" src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779017266/IMG_8797.JPG_n229yx.jpg" />
      <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#1B1B1B]">
        <p className="leading-tight text-[#EAEAEA] p-[10%] font-inter text-right text-lg sm:text-xl font-medium tracking-tighter">Programming anywhere, from the home studio to the venue</p>
      </div>
    </div>
    <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-[6cqw] tracking-tighter leading-none hidden sm:block">PROGRAMMING</p>
  </div>

  {/* OPERATE */}
  <div className="w-full h-[120px] sm:h-full justify-center flex items-end gap-3 @container-size">
    <p className="text-shadow-[0_5px_20px_rgba(0,0,0,0.40)] font-inter font-semibold h-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-[6cqw] tracking-tighter leading-none hidden sm:block">OPERATE</p>
    <div className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full sm:w-1/2 h-full flex flex-col sm:flex-row-reverse">
      <img className="h-1/2 sm:h-full sm:w-1/2 object-cover" src="https://res.cloudinary.com/dipyszxjg/image/upload/q_auto/f_auto/v1779016889/20251003_232255_dfs9pv.jpg" />
      <div className="flex justify-center items-center h-1/2 sm:h-full sm:w-1/2 bg-[#F3F3F3]">
        <p className="leading-tight text-black p-[10%] font-inter text-left text-lg sm:text-xl font-medium tracking-tighter">It's not just about the console, it's about the craft</p>
      </div>
    </div>
  </div>
</div>
```

Key responsive patterns used:
- `flex-col sm:flex-row` — stacks vertically on mobile, side-by-side on desktop
- `flex-row-reverse` for PRE-VISUALIZER and OPERATE — image on left, text on right (text inward)
- `text-right` for DESIGN and PROGRAMMING (image on left), `text-left` for PRE-VISUALIZER and OPERATE (image on left = text right-aligned, but on the left side so text-left)
- `text-lg sm:text-xl` for description text — readable on mobile
- `hidden sm:block` on the large text labels — only show them on desktop (mobile uses image+description cards)
- `h-[120px] sm:h-full` — fixed height on mobile for consistent card sizing, full height on desktop

- [ ] **Step 2: Commit**

```bash
git add src/components/SkillsSection.tsx
git commit -m "feat: make skills section responsive with stacked cards on mobile

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 5: RCHECK Section — `src/components/RCheckSection.tsx`

**Files:** Modify: `src/components/RCheckSection.tsx`

- [ ] **Step 1: Replace 2-row grid with vertical stack**

Change:
```tsx
<div className="grid grid-cols-5 grid-rows-2 gap-2.5 h-[60%] w-[90%]">
```
To:
```tsx
<div className="flex flex-col gap-3 h-auto w-[90%]">
```

- [ ] **Step 2: Update each image to be full-width**

Each `<img>` currently has grid-specific classes. Update them to:
```tsx
<img
  src={rcheckImages[0].src}
  className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full h-48 object-cover transition-transform duration-300 hover:scale-[1.05] rounded-lg"
/>
```

Apply the same pattern to all 5 images, using `h-48` (192px) on mobile and `h-auto` maintaining aspect ratio on desktop via `sm:` classes if needed. For now, use a fixed height that looks good for portrait/landscape mix — `h-48 sm:h-auto`.

```tsx
<div className="flex flex-col gap-3 h-auto w-[90%]">
  <img src={rcheckImages[0].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full h-48 sm:h-auto object-cover transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
  <img src={rcheckImages[1].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full h-48 sm:h-auto object-cover transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
  <img src={rcheckImages[2].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full h-48 sm:h-auto object-cover transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
  <img src={rcheckImages[3].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full h-48 sm:h-auto object-cover transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
  <img src={rcheckImages[4].src} className="shadow-[0_5px_20px_rgba(0,0,0,0.40)] w-full h-48 sm:h-auto object-cover transition-transform duration-300 hover:scale-[1.05] rounded-lg" />
</div>
```

- [ ] **Step 3: Adjust the container top offset**

The section has `-top-10` which may not be needed on mobile. Update to:
```tsx
<div className="relative -top-5 sm:top-0 flex flex-col justify-center items-center w-full h-full py-8 sm:py-0">
```

- [ ] **Step 4: Commit**

```bash
git add src/components/RCheckSection.tsx
git commit -m "feat: make rcheck section responsive with vertical image stack on mobile

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 6: Projects Section — `src/components/ProjectsSection.tsx`

**Files:** Modify: `src/components/ProjectsSection.tsx`

- [ ] **Step 1: Update section title text size**

Change:
```tsx
<h2 className="font-inter text-[7rem] font-bold tracking-tighter">MY PROJECTS</h2>
```
To:
```tsx
<h2 className="font-inter text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-bold tracking-tighter">MY PROJECTS</h2>
```

- [ ] **Step 2: Update project name text size**

Find the project name rendering:
```tsx
<p className="font-anton text-7xl decoration-4 underline underline-offset-4" ...>
```
Change `text-7xl` to `text-2xl sm:text-3xl md:text-5xl lg:text-7xl`.

- [ ] **Step 3: Update date text size**

Find:
```tsx
<p className="font inter text-4xl font-bold tracking-tighter">{curr.date}</p>
```
Change `text-4xl` to `text-lg sm:text-xl md:text-2xl lg:text-4xl`.

- [ ] **Step 4: Update horizontal padding**

The section has `px-12` on the outer div. Change:
```tsx
<div className="relative z-100 flex h-full py-16 px-4 sm:px-8 md:px-12 gap-12">
```

Also update the total/hours/coke stats at the bottom:
```tsx
<p className="font-anton text-5xl sm:text-5xl md:text-6xl lg:text-7xl decoration-4">TOTAL</p>
```
Change all three stat labels from `text-7xl` or `text-5xl` to `text-2xl sm:text-3xl md:text-5xl lg:text-7xl`.

And stat values from `text-5xl` to `text-lg sm:text-xl md:text-2xl lg:text-5xl`.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectsSection.tsx
git commit -m "feat: make projects section responsive on mobile

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```

---

## Task 7: Final Verification

- [ ] **Step 1: Run dev server and verify**

```bash
bun run dev
```

- [ ] **Step 2: Test at mobile viewport (375px width)** — all sections should have readable text and no overflow

- [ ] **Step 3: Test at tablet (768px)** — sections should begin restoring desktop layouts

- [ ] **Step 4: Test at desktop (1024px+)** — original appearance restored

- [ ] **Step 5: Verify accordion / swipe / menu still work** — no behavioral changes

- [ ] **Step 6: Commit any final adjustments**

```bash
git add -A
git commit -m "chore: responsive fixes from testing

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
```