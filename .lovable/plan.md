
# Mobile-Only Carousel Redesign for About Section

## Summary
Add a horizontal carousel with sweav.works-inspired card styling **only on mobile devices**. Desktop will remain completely unchanged with the current sidebar tabs and single card layout. Cards will use your brand colors (blue #00CEFF and gray #ececec).

## What Changes (Mobile Only)

### Current Mobile View
- Single gray card with swipe gestures
- Dot pagination at bottom
- Content changes within the same card

### New Mobile View (sweav.works style)
```text
   +----- visible area -----+
   |  +----------------+ +--|
   |  | ABOUT US       | |  | <- peek of next card
   |  |                | |  |
   |  | [blob image]   | |  |
   |  |                | |  |
   |  | "The Heart     | |  |
   |  |  Behind..."    | |  |
   |  |                | |  |
   |  | Read more ->   | |  |
   |  +----------------+ +--|
   +------------------------+
```

### Design Elements
- **"ABOUT US" label**: Small pill/badge at top-left of each card
- **Horizontal carousel**: Cards peek from the right edge (~85% width visible)
- **Brand blue background** (#00CEFF) for cards
- **"Read more" link**: At bottom of each card (optional - can scroll to show full content)
- **Smooth swipe navigation**: Using Embla Carousel

## What Stays the Same (Desktop)
- Sidebar tab navigation on the left
- Single gray card (#ececec) on the right
- Blob image positioning
- All existing styling and animations

---

## Technical Implementation

### Step 1: Add `useIsMobile` Hook
Import the existing `useIsMobile` hook from `src/hooks/use-mobile.tsx` to detect screen size.

### Step 2: Conditional Rendering
- **Mobile (< 768px)**: Render the new Embla Carousel with styled cards
- **Desktop (>= 768px)**: Keep existing layout exactly as-is

### Step 3: Mobile Carousel Structure
```text
<Carousel>
  <CarouselContent>
    {values.map(value => (
      <CarouselItem key={value.key}>
        <MobileAboutCard
          label="ABOUT US"
          title={value.title}
          description={value.description}
          blobImage={aboutBlobImage}
        />
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

### Step 4: Mobile Card Styling
- Background: Brand blue (#00CEFF)
- Border radius: 24px (slightly smaller for carousel cards)
- "ABOUT US" pill badge: White text on darker blue or black background
- Title: Black text, Google Sans font
- Description: Black text, Inter font (truncated with "Read more" link)
- Card width: ~85% of viewport to show peek of next card

### Step 5: Carousel Configuration
- `align: "start"` - Cards align to left
- `containScroll: "trimSnaps"` - Clean edge snapping
- Gap between cards: 16px

---

## File Changes

| File | Changes |
|------|---------|
| `src/components/AboutSection.tsx` | Add useIsMobile hook, conditional rendering for mobile carousel vs desktop layout, new mobile card component |

## Visual Result

**Mobile**: Swipeable horizontal carousel with blue cards, each showing "ABOUT US" label, blob image, title, description preview, and "Read more" link. Next card peeks from the right.

**Desktop**: No changes - same sidebar tabs with single gray card.
