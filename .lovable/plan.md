
## Testimonials Image Row Update

### Summary
Update the testimonials section image row to have a fixed container size of 1198x392px with perfectly round images at specific sizes decreasing from the center.

### Changes

**Container dimensions:**
- Width: 1198px (max-width for desktop)
- Height: 392px

**Image sizes (based on position from center):**
| Position | Size |
|----------|------|
| Center (index 3) | 392x392 |
| Distance 1 (index 2, 4) | 284x284 |
| Distance 2 (index 1, 5) | 191x191 |
| Distance 3 (index 0, 6) | 140x140 |

**Shape:**
- Remove blob/polygon clip paths
- Use `border-radius: 50%` for perfectly round circles

---

### Technical Details

**File to modify:** `src/components/TestimonialsSection.tsx`

1. Remove the `blobClipPaths` array entirely
2. Replace size calculation logic with a size map based on distance from center:
   ```typescript
   const sizeMap = [140, 191, 284, 392, 284, 191, 140];
   ```
3. Set container to `max-w-[1198px] h-[392px]` with `items-center`
4. Change image container from `clipPath` to `rounded-full` for circular shape
5. Calculate appropriate overlap margins to fit images within the 1198px width
6. Add responsive scaling for mobile devices
