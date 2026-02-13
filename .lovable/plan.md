

## "Our Community" Photo Gallery Section

A new section placed between ProcessSection and TestimonialsSection, featuring a masonry/grid gallery layout inspired by the reference image.

### What It Will Look Like
- A masonry-style grid of photos with gaps between cards
- **White background** with photo cards of varying sizes
- Section heading: "Нашата общност" (BG) / "Our Community" (EN) -- styled like other section headings
- Initially hardcoded with placeholder images; you can later upload real event photos to replace them

### Implementation Steps

1. **Add translations** for both BG and EN:
   - BG: `community.heading` = "Нашата общност"
   - EN: `community.heading` = "Our Community"

2. **Create `src/components/CommunitySection.tsx`**:
   - White background section
   - CSS Grid masonry-style layout (3 columns desktop, 2 tablet, 1 mobile)
   - Cards with varying row spans to create the staggered look from the reference image
   - Rounded corners on photo cards
   - Placeholder images initially -- you'll upload real event photos and I'll wire them in

3. **Update `src/pages/Index.tsx`**:
   - Import and place CommunitySection between ProcessSection and TestimonialsSection

### Technical Details

- CSS Grid with `grid-auto-rows` and varying `row-span` values for the masonry effect
- Rounded corners (`rounded-2xl`), subtle gaps between cards
- White background to match the site's minimalist aesthetic
- Responsive: 3 columns desktop, 2 tablet, 1 mobile
- No new dependencies needed

### Files Modified
| File | Change |
|------|--------|
| `src/translations/bg.ts` | Add `community` translation key |
| `src/translations/en.ts` | Add `community` translation key |
| `src/components/CommunitySection.tsx` | New masonry gallery component |
| `src/pages/Index.tsx` | Add CommunitySection between Process and Testimonials |

