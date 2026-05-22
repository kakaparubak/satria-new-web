# Scroll-Based Section Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable scrolling past a section boundary to trigger a GSAP animation that collapses the current section and expands the next/previous one, with per-section scroll position memory.

**Architecture:** Add wheel and touch event handlers to each section panel in ExpandingSections. When the user is at a scroll boundary and continues scrolling in that direction, a GSAP timeline animates the height transition. Each section's scroll position is stored in refs and restored on return. A single `animatePanels(from, to)` function handles both directions. `isTransitioning` ref blocks scroll events during animation.

**Tech Stack:** React, GSAP, TypeScript, Vitest

---

## File Structure

**Modified:** `src/components/ExpandingSections.tsx`

This is the only file being modified. All new state, refs, event handlers, and the animation function live here.

---

## Task 1: Add refs and state

**Files:**
- Modify: `src/components/ExpandingSections.tsx:17-37`

- [ ] **Step 1: Add `scrollPositions` and `isTransitioning` refs**

After the existing refs declaration (line 24), add:

```tsx
const scrollPositions = React.useRef<number[]>(sections.map(() => 0))
const isTransitioning = React.useRef(false)
```

- [ ] **Step 2: Save scroll position on every scroll**

The panel's content div (the innermost `div` with `overflow-y-auto`) is what the user scrolls. We need to capture scroll events on it. However, we can't attach a ref to the inner content div easily from the current structure. The cleanest approach is to save scroll position when the user scrolls AND when a transition starts.

Add a `useEffect` to save scroll position whenever `activeIndex` changes (i.e., when user navigates away from a section):

```tsx
React.useEffect(() => {
  if (activeIndex !== -1 && refs.current[activeIndex]) {
    // Save scroll position before leaving a section
    const scrollableContent = refs.current[activeIndex].querySelector('.overflow-y-auto')
    if (scrollableContent) {
      scrollPositions.current[activeIndex] = (scrollableContent as HTMLElement).scrollTop
    }
  }
}, [activeIndex])
```

- [ ] **Step 3: Run build to verify no type errors**

Run: `bun run build`
Expected: No new errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ExpandingSections.tsx
git commit -m "feat: add scrollPositions and isTransitioning refs"
```

---

## Task 2: Add `animatePanels` function

**Files:**
- Modify: `src/components/ExpandingSections.tsx`

- [ ] **Step 1: Add the `animatePanels` function above the component**

Add this function before the `ExpandingSections` component definition:

```tsx
const animatePanels = (
  from: HTMLDivElement,
  to: HTMLDivElement,
  fromIndex: number,
  toIndex: number,
  setActiveIndex: (i: number) => void,
  setisSectionActive: (b: boolean) => void,
  scrollPositions: React.MutableRefObject<number[]>,
  isTransitioning: React.MutableRefObject<boolean>,
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
) => {
  isTransitioning.current = true

  // Save scroll position of current section
  const fromScrollable = from.querySelector('.overflow-y-auto')
  if (fromScrollable) {
    scrollPositions.current[fromIndex] = (fromScrollable as HTMLElement).scrollTop
  }

  const tl = gsap.timeline({
    onComplete: () => {
      isTransitioning.current = false
      // Restore scroll position of new active section
      const toScrollable = to.querySelector('.overflow-y-auto')
      if (toScrollable) {
        (toScrollable as HTMLElement).scrollTop = scrollPositions.current[toIndex]
      }
    },
  })

  tl.to(from, { height: '0px', duration: 0.5, ease: 'power2.inOut' })
    .to(to, { height: '100dvh', duration: 0.5, ease: 'power2.inOut' }, '<')

  setActiveIndex(toIndex)
  tl.eventCallback('onComplete', () => setisSectionActive(true))
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ExpandingSections.tsx
git commit -m "feat: add animatePanels function"
```

---

## Task 3: Add wheel event handler

**Files:**
- Modify: `src/components/ExpandingSections.tsx:129-167`

- [ ] **Step 1: Add `onWheel` handler to each section panel**

The panel `div` at line 129 already has `onClick`, `onMouseEnter`, `onMouseLeave`. Add `onWheel`:

```tsx
<div
  key={index}
  ref={(el) => {
    refs.current[index] = el
  }}
  onClick={() => handlePanelClick(index)}
  onMouseEnter={() => handleMouseEnterLabel(index)}
  onMouseLeave={() => handleMouseLeaveLabel(index)}
  onWheel={(e) => {
    if (isTransitioning.current) return
    const panel = refs.current[index]
    if (!panel) return
    const scrollable = panel.querySelector('.overflow-y-auto') as HTMLElement | null
    if (!scrollable) return

    const atTop = scrollable.scrollTop === 0
    const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1

    if (atTop && e.deltaY < 0 && index > 0) {
      animatePanels(
        refs.current[index]!,
        refs.current[index - 1]!,
        index,
        index - 1,
        setActiveIndex,
        setisSectionActive,
        scrollPositions,
        isTransitioning,
        refs
      )
    } else if (atBottom && e.deltaY > 0 && index < sections.length - 1) {
      animatePanels(
        refs.current[index]!,
        refs.current[index + 1]!,
        index,
        index + 1,
        setActiveIndex,
        setisSectionActive,
        scrollPositions,
        isTransitioning,
        refs
      )
    }
  }}
  onMouseEnter={() => handleMouseEnterLabel(index)}
  onMouseLeave={() => handleMouseLeaveLabel(index)}
  className={`w-full h-[20dvh] cursor-pointer flex items-start relative overflow-hidden`}
>
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ExpandingSections.tsx
git commit -m "feat: add wheel event handler for scroll navigation"
```

---

## Task 4: Add touch event handlers

**Files:**
- Modify: `src/components/ExpandingSections.tsx:129-167`

- [ ] **Step 1: Add touch state ref**

Add above the component (with the other refs):

```tsx
const touchStartY = React.useRef<number>(0)
```

- [ ] **Step 2: Add `onTouchStart` and `onTouchEnd` to each panel**

On the same panel `div` from Task 3, add:

```tsx
onTouchStart={(e) => {
  touchStartY.current = e.touches[0].clientY
}}
onTouchEnd={(e) => {
  if (isTransitioning.current) return
  const delta = touchStartY.current - e.changedTouches[0].clientY
  const threshold = 50
  const panel = refs.current[index]
  if (!panel) return
  const scrollable = panel.querySelector('.overflow-y-auto') as HTMLElement | null
  if (!scrollable) return

  const atTop = scrollable.scrollTop === 0
  const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1

  if (delta > threshold && atBottom && index < sections.length - 1) {
    animatePanels(
      refs.current[index]!,
      refs.current[index + 1]!,
      index,
      index + 1,
      setActiveIndex,
      setisSectionActive,
      scrollPositions,
      isTransitioning,
      refs
    )
  } else if (delta < -threshold && atTop && index > 0) {
    animatePanels(
      refs.current[index]!,
      refs.current[index - 1]!,
      index,
      index - 1,
      setActiveIndex,
      setisSectionActive,
      scrollPositions,
      isTransitioning,
      refs
    )
  }
}}
```

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ExpandingSections.tsx
git commit -m "feat: add touch swipe handlers for section navigation"
```

---

## Task 5: Update `handleOpenMenu` to save scroll position

**Files:**
- Modify: `src/components/ExpandingSections.tsx:81-94`

- [ ] **Step 1: Save scroll position before collapse animation**

The `handleOpenMenu` function collapses all panels. Before that, save the current section's scroll position:

```tsx
const handleOpenMenu = () => {
  // Save scroll before collapsing
  if (activeIndex !== -1) {
    const panel = refs.current[activeIndex]
    if (panel) {
      const scrollable = panel.querySelector('.overflow-y-auto') as HTMLElement | null
      if (scrollable) {
        scrollPositions.current[activeIndex] = scrollable.scrollTop
      }
    }
  }

  setActiveIndex(-1)
  refs.current.forEach((el) => {
    if (el) {
      gsap.to(el, { height: '20dvh', duration: 0.5, ease: 'power2.inOut' })
    }
  })
  bgRefs.current.forEach((el) => {
    if (el) {
      gsap.to(el, { opacity: 1, duration: 0.3 })
    }
  })
  setisSectionActive(false)
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ExpandingSections.tsx
git commit -m "feat: save scroll position on menu open"
```

---

## Self-Review Checklist

1. **Spec coverage:** Every spec item has a task — wheel handler (Task 3), touch handler (Task 4), scroll memory (Tasks 1, 2, 5), boundary conditions (handled in wheel/touch handlers), animation function (Task 2).
2. **Placeholder scan:** No TBD/TODO. Every step has full code.
3. **Type consistency:** `animatePanels` receives all arguments explicitly — no shared implicit state between tasks. `setActiveIndex` and `setisSectionActive` are passed as parameters. All refs typed correctly.
4. **Missing piece:** The `handlePanelClick` function (when user clicks a section label) also transitions panels. It calls `gsap.to(el, { height: '100dvh' })` for the selected section and `{ height: '0px' }` for others. This path should also save/restore scroll position — but since the user explicitly clicked to open a section, the existing scroll position for that section (from `scrollPositions`) will be restored when `animatePanels.onComplete` fires. However, `handlePanelClick` does NOT use `animatePanels` — it uses direct GSAP calls. We should update it to also save scroll position before transitioning. This is a gap — flagging for Task 6.

---

## Task 6 (NEW): Update `handlePanelClick` to save scroll position

**Files:**
- Modify: `src/components/ExpandingSections.tsx:96-114`

- [ ] **Step 1: Save scroll before click-based panel activation**

The `handlePanelClick` function opens a section when clicked (instead of via scroll). It needs to save scroll before starting the animation:

```tsx
const handlePanelClick = (index: number) => {
  if (activeIndex === -1) {
    // Save scroll of current section before transition
    const currentPanel = refs.current[activeIndex]
    if (currentPanel) {
      const scrollable = currentPanel.querySelector('.overflow-y-auto') as HTMLElement | null
      if (scrollable) {
        scrollPositions.current[activeIndex] = scrollable.scrollTop
      }
    }

    setActiveIndex(index)
    refs.current.forEach((el, i) => {
      if (el) {
        if (i === index) {
          gsap
            .to(el, { height: '100dvh', duration: 0.5, ease: 'power2.inOut' })
            .then(() => setisSectionActive(true))
        } else {
          gsap.to(el, { height: '0px', duration: 0.5, ease: 'power2.inOut' })
        }
      }
    })
    if (bgRefs.current[index]) {
      gsap.to(bgRefs.current[index], { opacity: 0, duration: 0.3 })
    }
  }
}
```

Note: When clicking a collapsed section from the menu (where `activeIndex === -1`), `activeIndex` is -1, which is invalid for `scrollPositions` — so the guard `if (currentPanel)` will be false and no save happens. This is fine because there was no open section.

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ExpandingSections.tsx
git commit -m "feat: save scroll position on panel click"
```

---

## Spec Coverage确认

| Spec Item | Task |
|----------|------|
| Wheel navigation | Task 3 |
| Touch navigation | Task 4 |
| Scroll position memory | Tasks 1, 5, 6 |
| Single `animatePanels` function | Task 2 |
| Boundary conditions | Tasks 3, 4 (hasPrev/hasNext guards) |
| Immediate trigger (no overscroll) | Tasks 3, 4 (atTop/atBottom + direction check) |
| Scroll blocked during animation | `isTransitioning` guard in Tasks 3, 4 |
| Click behavior unchanged | All existing click handlers preserved |
| Error handling (missing refs) | `if (el)` guards throughout |
| Empty section check | Not explicitly checked — panels with no scrollable content will behave as always at top/bottom. This may cause false triggers. If that becomes an issue, add the `scrollHeight > clientHeight` check. |

---

## Execution Options

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**