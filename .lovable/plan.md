
## Footer Component Implementation

### Summary
Create a new Footer component that matches the reference design with a clean top section containing navigation links and a large decorative brand text at the bottom.

### Design Elements

**Top Section Layout (4 columns on desktop):**

| Column 1 | Column 2 | Column 3 | Column 4 |
|----------|----------|----------|----------|
| Logo | Projects | Instagram | hello@jobmama.com |
| "Europe based." | Pricing | LinkedIn | ©2025 |
| | About | X (Twitter) | |

**Bottom Section:**
- Large decorative text "bMar" (cropped portion of "JobMama") in dark navy color (#0D141C)
- Text positioned to be partially visible/cropped at the bottom edge
- Creates a bold visual statement

### File Changes

**1. Create new file:** `src/components/Footer.tsx`
- Footer container with white background
- Top section with 4-column grid layout
- JobMama logo (reusing existing logo.svg)
- Navigation links (Projects, Pricing, About)
- Social links (Instagram, LinkedIn, X)
- Contact info and copyright
- Large decorative brand text at bottom

**2. Update:** `src/pages/Index.tsx`
- Import and add Footer component after TestimonialsSection

---

### Technical Details

**Container styling:**
- Full width with 100px horizontal padding on desktop (matching existing layout margins)
- Responsive padding for tablet/mobile

**Top section grid:**
```text
Grid layout with 4 columns:
[Logo + tagline] [Nav links] [Social links] [Contact + copyright]
```

**Typography:**
- Logo: existing logo.svg asset
- Links: Inter font, light weight, ~14px
- Large brand text: Google Sans or similar, ~300px+ font size
- Color for brand text: #0D141C (dark navy)

**Large decorative text:**
- Text content: "bMar" (stylized portion of brand)
- Positioned to overflow/crop at bottom
- Font size approximately 300-400px for desktop
- Uses the same dark navy color as the logo

**Responsive behavior:**
- Desktop: 4-column layout, full-size decorative text
- Tablet: 2x2 grid for top section, smaller decorative text
- Mobile: Stacked single column, even smaller decorative text
