

# Fix Bulgarian Text Overlapping and Responsiveness Issues

## Problems Identified

After thorough visual inspection at desktop (1920px), tablet (768px), and mobile (375px) breakpoints, the following issues were found with Bulgarian text:

### 1. About Section -- Desktop Card: Text Overlaps Image (Critical)
The `DesktopAboutCard` has a **fixed height** (`lg:h-[950px]`, `md:h-[700px]`) with the image absolutely positioned at the top and the text absolutely positioned at the bottom. Bulgarian descriptions are significantly longer (3 paragraphs with `\n\n` line breaks via `whitespace-pre-line`), causing the bottom-positioned text to grow upward and **overlap the image**.

### 2. About Section -- Desktop Sidebar: Labels Overflow
The sidebar has a fixed width of `lg:w-[340px]` with `text-[40px]` font. Bulgarian labels like "Защо съществува JobMama?" are much wider than the English equivalents ("The Purpose"), causing text to overflow or look cramped.

### 3. About Section -- Tablet Card: Same Overlap Issue
Same fixed-height problem as desktop at `md:h-[700px]`, but Bulgarian text is even more constrained in the narrower tablet viewport.

### 4. Process Section -- Step Titles with Number Badges
Bulgarian step titles like "Обновяване на твоя \u201Eинструментариум\u201C" and "Синхронизиране на програмата" are significantly longer than their English counterparts, causing them to wrap awkwardly next to the number badges at medium screen sizes.

### 5. Service Cards -- Long Bulgarian Titles
Titles like "Корпоративни решения за бизнеса" and feature headings are longer in Bulgarian, potentially causing cards to look uneven in the 4-column desktop grid.

---

## Solution Plan

### Fix 1: About Section -- DesktopAboutCard (Text/Image Overlap)
**File:** `src/components/AboutSection.tsx` (lines 74-114)

Replace the fixed-height absolute-positioning layout with a **flex column layout** that lets the card grow with content:
- Remove fixed heights (`h-[500px]`, `md:h-[700px]`, `lg:h-[950px]`)
- Use `min-h-[500px] md:min-h-[700px] lg:min-h-[800px]` instead
- Switch from absolute positioning to a flex layout: image at the top, text at the bottom with `flex-grow` to fill available space
- Add `overflow-hidden` with a scrollable text area or clamp the description text on desktop with a "read more" toggle
- Reduce the desktop description font from `lg:text-[24px]` to `lg:text-[20px]` to accommodate longer Bulgarian text

### Fix 2: About Section -- Desktop Sidebar Labels
**File:** `src/components/AboutSection.tsx` (lines 199-232)

- Widen the sidebar from `lg:w-[340px]` to `lg:w-[400px]`
- Reduce the label font size from `text-[40px]` to `text-[32px]` so longer Bulgarian labels fit comfortably
- Reduce vertical spacer height from `113px` to `80px` to keep sidebar vertically balanced with the card

### Fix 3: About Section -- Tablet Card
**File:** `src/components/AboutSection.tsx` (lines 152-185)

- Apply the same flex layout fix as desktop
- Add `overflow-y-auto` to the text content area with a max-height, so long descriptions become scrollable rather than overflowing

### Fix 4: Process Section -- Step Titles
**File:** `src/components/ProcessSection.tsx` (lines 19-31)

- Change the step title `h3` from very large fixed sizes to clamped responsive sizes
- Add `break-words` to prevent long Bulgarian words from overflowing their containers
- Reduce the largest step title font from `lg:text-[58px]` to `lg:text-[48px]` to prevent wrapping issues with longer Bulgarian titles

### Fix 5: Service Cards -- Title Sizing
**File:** `src/components/ServiceCard.tsx` (lines 116-121)

- Add `min-h-[72px]` to the card title to ensure consistent card alignment across the 4-column grid when Bulgarian titles are longer
- The titles already wrap naturally, so this is mainly about visual alignment

### Fix 6: Section Headings -- Responsive Scaling
**File:** `src/pages/Index.tsx` (line 24) and `src/components/ServicesSection.tsx` (line 16) and `src/components/AboutSection.tsx` (line 193)

- Add `break-words` to all large section headings at `128.7px` to prevent horizontal overflow
- For "Нашите услуги" (the longest Bulgarian heading at 128.7px), reduce to a responsive `lg:text-[100px] xl:text-[128.7px]` scale so it doesn't overflow on smaller large screens (1024-1280px)

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/AboutSection.tsx` | Fix card layout (flex instead of absolute), widen sidebar, reduce font sizes |
| `src/components/ProcessSection.tsx` | Reduce step title font size, add word-break |
| `src/components/ServiceCard.tsx` | Add min-height to titles for alignment |
| `src/components/ServicesSection.tsx` | Add responsive heading scaling |
| `src/pages/Index.tsx` | Add responsive heading scaling for process title |

## No files will be created or deleted.
