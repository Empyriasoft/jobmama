

## Mobile About Cards Improvements

### Summary
Make two changes to the mobile About section cards: remove the "ABOUT US" badge and improve the image sizing/positioning.

### Changes to Make

**File: `src/components/AboutSection.tsx`**

**1. Remove the "ABOUT US" Badge**
Delete the Badge component from the MobileAboutCard (lines 68-74):
```tsx
{/* ABOUT US Badge - REMOVE THIS */}
<Badge 
  variant="secondary"
  className="absolute top-4 left-4 bg-foreground text-background text-[10px] font-semibold tracking-wider px-3 py-1"
>
  ABOUT US
</Badge>
```

**2. Fit the Image Better**
Update the image styling to be larger and better positioned:
- Increase image size from 160x90px to approximately 180-200px width
- Adjust positioning to fit naturally in the top-right area
- Keep `object-contain` to preserve the blob/organic shape

Current image styling (line 77-81):
```tsx
<img 
  src={valueImages[value.key]}
  alt="Mother and child"
  className="absolute w-[160px] h-[90px] right-4 top-4 object-contain"
/>
```

New image styling:
```tsx
<img 
  src={valueImages[value.key]}
  alt="Mother and child"
  className="absolute w-[200px] h-[113px] right-2 top-8 object-contain"
/>
```

### Technical Notes

- The Badge import can remain in the file (used elsewhere on desktop) but the component call will be removed from the mobile card
- Image dimensions maintain the original aspect ratio (~16:9) while being larger
- Position adjusted slightly for better visual balance without the badge

