# Design: Scroll-Based Section Navigation

## Overview

Enhance the `ExpandingSections` component with wheel and touch event handlers. When the user scrolls to the boundary of a section and continues scrolling in that direction, a GSAP timeline animates the current panel collapsing and the target panel expanding. Each section's scroll position is tracked in refs and restored when the user returns.

**Interaction modes:** Both mouse wheel and touch swipe trigger transitions. Click-to-open behavior is unchanged and works alongside scroll navigation.

---

## Architecture

### State & Refs

| Name | Type | Purpose |
|------|------|---------|
| `scrollPositions` | `RefObject<number>[]` | Stores scrollTop per section |
| `isTransitioning` | `RefObject<boolean>` | Blocks scroll during animation |
| `activeIndex` | `useState<number>` | Which section is currently open (-1 = all collapsed) |
| `isSectionActive` | `useState<boolean>` | Whether a section transition has completed |

### Data Flow

```
User scrolls within section
  → Save scroll position to scrollPositions[currentIndex]
  → Check if at scroll boundary (top or bottom)

At boundary + continue scrolling in same direction
  → If isTransitioning: ignore (drop scroll event)
  → Else: set isTransitioning true
  → Determine direction (next or previous)
  → Build GSAP timeline: animatePanels(currentPanel, targetPanel)
  → On timeline complete: restore scroll position, set isTransitioning false
```

### Panel Height Initial State

```ts
refs.current.forEach((el, i) => {
  if (el) gsap.set(el, { height: i === 0 ? '100dvh' : '0px' })
})
```

First section starts open at 100dvh; all others start at 0px.

---

## Animation

### Single Timeline Function

One `animatePanels(from, to)` function handles both directions:

```ts
const animatePanels = (from: HTMLDivElement, to: HTMLDivElement) => {
  const tl = gsap.timeline({
    onComplete: () => {
      isTransitioning.current = false
    }
  })
  tl.to(from, { height: '0px', duration: 0.5, ease: 'power2.inOut' })
    .to(to, { height: '100dvh', duration: 0.5, ease: 'power2.inOut' }, '<')
}
```

**Direction logic** lives in the event handler, not the animation function. The animation is symmetric — same duration, same easing, reversed only in which element is the target.

---

## Interaction Details

### Wheel Navigation

- Listen for `onWheel` on each section panel
- Accumulate `deltaY` to detect scroll intent at boundaries
- At top of section + scroll up → transition to previous
- At bottom of section + scroll down → transition to next
- **No overscroll required** — transition triggers the moment the user attempts to scroll past the boundary

### Touch Navigation

- `onTouchStart` / `onTouchEnd` on each section panel
- Direction determined by `touchstartY - touchendY`:
  - Positive delta → swipe down → next section
  - Negative delta → swipe up → previous section
- Velocity threshold to distinguish swipe from tap

### Boundary Conditions

- At first section + scroll up → ignore
- At last section + scroll down → ignore
- Bounded navigation, no wrap-around

### Scroll Position Memory

```ts
// Before transitioning away
scrollPositions.current[activeIndex] = refs.current[activeIndex]?.scrollTop ?? 0

// After transition completes, restore
refs.current[newActiveIndex].scrollTop = scrollPositions.current[newActiveIndex]
```

### Scroll Locking

During transition, `isTransitioning` blocks all scroll triggers. After transition completes:
- Current panel: `overflow-y: hidden`
- New active panel: `overflow-y: auto`

---

## Component Changes

### ExpandingSections.tsx

**Refs to add:**
- `scrollPositions: React.useRef<number[]>(sections.map(() => 0))`
- `isTransitioning: React.useRef(false)`

**Event handlers on each panel:**
- `onWheel` — accumulate deltaY, detect boundary hit, trigger direction
- `onTouchStart` / `onTouchEnd` — track swipe direction and velocity

**Handler logic:**
```
handleWheel(deltaY):
  if isTransitioning.current: return

  if atTop && deltaY < 0 && hasPrev:
    animatePanels(current, prev)
  else if atBottom && deltaY > 0 && hasNext:
    animatePanels(current, next)

handleTouchStart(y): touchStartY = y
handleTouchEnd(y):
  delta = touchStartY - y
  if isTransitioning.current: return
  if delta > threshold && hasNext:
    animatePanels(current, next)
  else if delta < -threshold && hasPrev:
    animatePanels(current, prev)
```

**Click behavior unchanged** — `onClick` on collapsed labels still opens sections as it does now.

### Empty Section Check

Before enabling scroll trigger on a section, verify it has scrollable content:

```ts
const hasScrollableContent = el.scrollHeight > el.clientHeight
```

Sections without scrollable content cannot trigger navigation — they just pass through to the next section.

---

## Error Handling

| Scenario | Handling |
|----------|----------|
| Scroll during transition | Drop — `isTransitioning` gate |
| Mid-animation direction reversal | Impossible — scroll blocked during animation |
| Missing panel refs | Guard with `if (el)` before GSAP calls |
| Scroll at boundary in middle of animation | Already blocked by `isTransitioning` |
| Rapid repeated scrolling | Same — events dropped, not queued |

---

## Design Decisions Summary

| Decision | Choice |
|----------|--------|
| Interaction modes | Wheel + Touch (both) |
| Scroll behavior | Bounded (no wrap-around) |
| Scroll memory | Per-section scroll position in ref |
| Scroll trigger | Immediate at boundary (no overscroll) |
| Scroll during animation | Blocked (drop events) |
| Timeline count | Single `animatePanels(from, to)` function |
| Click behavior | Unchanged, works alongside scroll |

---

## Files Modified

- `src/components/ExpandingSections.tsx` — add scroll/touch handlers, `scrollPositions` ref, `isTransitioning` ref, `animatePanels` function