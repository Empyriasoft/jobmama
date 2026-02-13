

## Restructure Community Section to 3-Column, 3-Row Layout

Replace the current 4-column masonry grid with a precise 3-column, 3-row layout using exact pixel heights for each card.

### Card Dimensions

| Position | Column 1 | Column 2 | Column 3 |
|----------|----------|----------|----------|
| Row 1 | 478 x 397 | 478 x 244 | 478 x 154 |
| Row 2 | 478 x 551 | 478 x 551 | 478 x 551 |
| Row 3 | 484 x 237 | 478 x 383 | 478 x 472 |

### Implementation

**File: `src/components/CommunitySection.tsx`**

- Replace the desktop grid with `lg:grid grid-cols-3 gap-4`
- Use explicit pixel heights on each card instead of row-spans (since each card has a unique height)
- 9 cards total, laid out column by column using CSS Grid's `grid-auto-flow: column` or by manually ordering items
- Each card gets a fixed `h-[Xpx]` class matching the exact heights above
- Keep tablet (2-col) and mobile (1-col) responsive layouts with reasonable proportional heights

### Technical Approach

Since CSS Grid flows row-by-row by default but the cards are specified column-by-column, the grid will use column-first ordering. Each card will have its explicit height set via Tailwind classes like `h-[397px]`, `h-[551px]`, etc. The grid will use `grid-cols-3` with items ordered so they fill columns top-to-bottom.

