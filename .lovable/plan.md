

# Change Active Image Size to 150px

## What Changes

**File:** `src/components/TestimonialsSection.tsx`

- Line 183: Change active image width from `120` to `150`
- Line 184: Change active image height from `120` to `150`
- Line 170: Update the centering padding from `calc(50% - 60px)` to `calc(50% - 75px)` so the larger image stays perfectly centered

## Result

The selected/center image will be 150px (instead of 120px), with the inactive images remaining at 70px -- giving a clearer size contrast.

