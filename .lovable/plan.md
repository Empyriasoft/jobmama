

## Fix Horizontal Scrollbar on Mobile

### Problem
The horizontal scrollbar appears because the mobile About section carousel uses negative margins (`-ml-3`) that extend beyond the section container. While the carousel's inner wrapper has `overflow-hidden`, the section itself doesn't, causing content to overflow horizontally.

### Solution
Add `overflow-hidden` to the mobile About section container to prevent the carousel's negative margins from causing page-level horizontal scroll.

### Changes to Make

**File: `src/components/AboutSection.tsx`**

Update the mobile section container (line 160):

```tsx
// Current
<section className="w-full px-4 pt-16 pb-12">

// Updated
<section className="w-full px-4 pt-16 pb-12 overflow-hidden">
```

### Technical Notes

- The Embla carousel uses negative margins on `CarouselContent` and positive padding on `CarouselItem` to create proper spacing between slides
- The carousel's viewport (`div` with `overflow-hidden` in `carousel.tsx` line 139) handles clipping the slides, but the negative margin still affects the parent layout
- Adding `overflow-hidden` to the section container clips any content that extends beyond its bounds, preventing horizontal page scroll

