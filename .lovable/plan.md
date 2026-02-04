

# Fix: About Section Card Text Overlapping on Medium Screens

## Problem Analysis

The desktop About card has three responsive breakpoints, but the medium (`md`) breakpoint causes text to overlap with the image:

| Element | Mobile | Medium (md) | Large (lg) |
|---------|--------|-------------|------------|
| Card height | - | 700px | 950px |
| Image size | - | 400x226px | 671x379px |
| Title font | - | 48px | 75.88px |
| Description font | - | 18px | 24px |
| Content bottom offset | - | 70px | 108px |

On a 700px card, the image ends at ~266px from top, but the large text content (title + description) starting from bottom-70px extends upward and overlaps with the image.

## Solution

Add proper `md` breakpoint values to ensure adequate spacing between the image and text content:

### Changes to `src/components/AboutSection.tsx`

**1. Reduce image size on medium screens**
```
Current: w-[400px] h-[226px]
New: w-[300px] h-[170px] md:w-[350px] md:h-[198px]
```

**2. Reduce title font size on medium screens**
```
Current: text-[48px] lg:text-[75.88px]
New: text-[36px] md:text-[42px] lg:text-[75.88px]
```

**3. Reduce description font size on medium screens**
```
Current: text-[18px] lg:text-[24px]
New: text-[16px] md:text-[18px] lg:text-[24px]
```

**4. Adjust content container padding**
```
Current: bottom-[70px] left-12 right-12
New: bottom-[50px] left-8 right-8 md:bottom-[60px] md:left-10 md:right-10 lg:bottom-[108px] lg:left-[95px] lg:right-[95px]
```

## Technical Details

The fix targets the `DesktopAboutCard` component (lines 109-151), specifically:

- Line 127: Image sizing classes
- Line 133: Content container positioning
- Line 138: Title text size
- Line 144: Description text size

These changes ensure proper vertical spacing between the image and text content across all screen sizes while maintaining the design's visual proportions.

