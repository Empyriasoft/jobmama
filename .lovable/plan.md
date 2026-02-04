

## Fix White Stripe / Horizontal Overflow on Mobile

### Problem
The page has horizontal overflow causing a white stripe on the right side. This is due to the carousel's default spacing:
- `CarouselContent` defaults to `-ml-4` (negative margin-left)
- `CarouselItem` defaults to `pl-4` (padding-left)

An empty `className=""` doesn't override these Tailwind defaults - you need to explicitly set `ml-0` and `pl-0`.

### Solution
Explicitly override the carousel's default spacing classes with `ml-0` and `pl-0`.

### Changes

**File: `src/components/AboutSection.tsx`**

**Line 177** - Add `ml-0` to override the default negative margin:
```tsx
// Before
<CarouselContent className="">

// After
<CarouselContent className="ml-0">
```

**Line 179** - Add `pl-0` to override the default padding:
```tsx
// Before
<CarouselItem key={value.key} className="basis-[85%]">

// After
<CarouselItem key={value.key} className="pl-0 basis-[85%]">
```

### Result
This will eliminate the horizontal overflow and remove the white stripe on the right side of the mobile view.

