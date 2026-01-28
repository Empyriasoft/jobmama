
# Mobile Expand-on-Touch for Service Card Features

## Summary
Change the feature bullet points in service cards to expand inline on mobile instead of showing a floating popover tooltip. Desktop behavior (hover card) will remain unchanged.

## Current vs New Behavior

### Current (Mobile)
- Tap feature heading → floating popover appears above
- Popover can be accidentally dismissed
- Feels disconnected from the content

### New (Mobile)
- Tap feature heading → description expands directly below the heading
- Tap again to collapse
- Smooth accordion-style animation
- More natural touch interaction

```text
BEFORE (Popover):                    AFTER (Inline Expand):
                                     
  +------------------+               ✓ 1-on-1 coaching session
  | Description here |               
  +------------------+               ✓ Personalized action plan ▼
        ↑                              A clear, step-by-step guide
  ✓ Feature heading                    tailored to your journey...
                                     
                                     ✓ Complete resume overhaul
```

## What Stays the Same
- Desktop: HoverCard on mouse hover (no changes)
- Visual styling: fonts, colors, check icons
- Card layout and structure

---

## Technical Details

### Changes to `src/components/ServiceCard.tsx`

**1. Update the `FeatureItem` component for mobile:**
- Replace `Popover` with a simple toggle state
- When tapped, show description directly below the heading
- Add smooth height animation using CSS transitions
- Keep the Info icon but change to a chevron that rotates on expand

**2. Mobile feature item structure:**
```text
<div>
  <button onClick={toggle}>
    <span>Feature heading</span>
    <ChevronDown className={rotateOnOpen} />
  </button>
  {isExpanded && (
    <div className="animate-accordion-down">
      <p>Description text...</p>
    </div>
  )}
</div>
```

**3. Animation:**
- Use existing `animate-accordion-down` keyframe from tailwind config
- Smooth expand/collapse transition

### Files to Modify

| File | Changes |
|------|---------|
| `src/components/ServiceCard.tsx` | Update `FeatureItem` component to use inline expand on mobile instead of Popover |

## Visual Result

**Mobile**: Tapping a feature heading expands/collapses the description directly below it with a smooth animation. The chevron icon rotates to indicate open/closed state.

**Desktop**: No change - hover still shows the floating card tooltip.
