

## Adapt Community Section for Mobile and Tablet

The desktop 3-column gallery currently has 9 real photos, but the mobile and tablet layouts still show placeholder images. Here's the plan to fix that.

### Mobile (below 768px)
- **2-column masonry layout** with the 9 community photos arranged in two columns
- Column 1: 4 images, Column 2: 5 images (or vice versa), with varied heights to create visual interest
- Heights scaled down proportionally (roughly 40-50% of desktop values) to fit mobile screens
- All 9 real images used with proper `object-cover` cropping

### Tablet (768px - 1024px)
- **2-column layout** reusing all 9 real images
- Heights scaled to roughly 60-70% of desktop values
- Similar masonry-style arrangement as desktop but in 2 columns

### Technical Details

**File: `src/components/CommunitySection.tsx`**

1. **Mobile layout** - Replace the placeholder loop with two flex columns containing the actual imported images at reduced heights (e.g., 150px-250px range)
2. **Tablet layout** - Replace placeholders with the real images, distributing 4-5 images per column with intermediate heights
3. All images keep `rounded-2xl overflow-hidden` styling and `object-cover object-center` for consistent appearance

This is a straightforward update -- just swapping placeholder references for the already-imported image assets and adjusting card heights for smaller screens.

