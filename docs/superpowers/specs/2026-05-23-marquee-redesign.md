# Marquee Redesign Specification

**Date:** 2026-05-23
**Status:** Approved
**Deciders:** Architect, Skeptic, Pragmatist, Critic

## Context

The `ContactSection` component has a marquee displaying "SATRIA CHANDRA" repeatedly. The current GSAP timeline implementation has a visible seam at loop reset due to incorrect percentage math (`-25%` to `25%` jump). The requirement is simple: infinitely scrolling text with no user interaction.

## Design Decision

**Replace GSAP with CSS `@keyframes`** for the marquee animation.

### Why CSS
- Seamless infinite loop via `translateX(0)` → `translateX(-50%)` with duplicated content
- Zero JS overhead — runs on compositor thread
- ~3KB bundle savings (no GSAP needed for this effect)
- Simpler, more maintainable code

## Implementation

### Markup

```tsx
<div className="marquee-wrapper overflow-hidden">
  <div className="marquee-track flex flex-nowrap gap-4" aria-hidden="true">
    <p>SATRIA CHANDRA SATRIA CHANDRA ...</p>
    <p>SATRIA CHANDRA SATRIA CHANDRA ...</p>
  </div>
</div>
```

- Two copies of the text side-by-side (each 50% width)
- `aria-hidden="true"` hides duplicate from screen readers
- Container uses `overflow: hidden` to clip visible area

### CSS

```css
.marquee-wrapper {
  position: absolute;
  top: -0.75rem;
  z-index: 50;
}

.marquee-track {
  animation: marquee-scroll 20s linear infinite;
  will-change: transform;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

### Animation Timing

- **Duration:** 20 seconds for one full cycle
- **Easing:** `linear` (required for seamless loop — any easing other than linear creates visible speed changes)
- **Infinite:** loops seamlessly because the duplicated content fills the gap exactly

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
```

Disables animation for users who prefer reduced motion.

## Changes Summary

| File | Change |
|------|--------|
| `src/components/ContactSection.tsx` | Remove GSAP `useGSAP` hook, remove `useRef`, replace with CSS class + duplicated text |
| `src/styles.css` (or inline `<style>`) | Add `@keyframes marquee-scroll`, `.marquee-wrapper`, `.marquee-track` |

## Out of Scope

- Hover-to-pause (not requested)
- Speed adjustment controls (not requested)
- Scroll-linked velocity (not requested)
- Any changes to the section content (social links, email, layout)

## Verification

- [ ] Marquee scrolls continuously without visible seam
- [ ] Animation pauses when tab is backgrounded
- [ ] `prefers-reduced-motion` users see no animation
- [ ] No console errors
- [ ] Build passes