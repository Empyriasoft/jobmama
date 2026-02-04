
## Fix White Stripe on Mobile About Cards

### Problem
The mobile carousel cards show a white stripe on the partially visible card (as shown in the screenshot with red arrows). This happens because:
- `CarouselContent` uses `-ml-3` (negative margin)
- `CarouselItem` uses `pl-3` (padding-left) to create gaps between cards
- The padding area shows the white page background through the gap

### Solution
Change the gap approach from padding-based to margin-based gap on the card itself, which will keep the card background consistent without showing white stripes.

### Changes to Make

**File: `src/components/AboutSection.tsx`**

Update the CarouselItem (line 179) to remove padding and add margin to the card:

Current:
```tsx
<CarouselItem key={value.key} className="pl-3 basis-[85%]">
  <MobileAboutCard value={value} />
</CarouselItem>
```

Updated:
```tsx
<CarouselItem key={value.key} className="basis-[85%]">
  <div className="pr-3">
    <MobileAboutCard value={value} />
  </div>
</CarouselItem>
```

Also update CarouselContent (line 177) to remove the negative margin:

Current:
```tsx
<CarouselContent className="-ml-3">
```

Updated:
```tsx
<CarouselContent className="">
```

### Why This Works
- Removing the negative margin and left padding eliminates the gap that was showing the white background
- Using `pr-3` (padding-right) on an inner wrapper creates the visual gap between cards without exposing the page background
- The card backgrounds extend edge-to-edge within their container, preventing any white stripe from appearing
