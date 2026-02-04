
## Fix Mobile Testimonials Carousel

### Problem
The mobile carousel exists but the image sizing and text sync aren't working properly when swiping. The current implementation has issues with:
1. The `MobileCarousel` component is defined inline, which can cause issues with React hooks
2. The size comparison uses array index vs activeIndex, which doesn't properly reflect the carousel's scroll position

### Solution
Refactor the mobile carousel to properly sync the visual state with the carousel's scroll position.

### Changes to `src/components/TestimonialsSection.tsx`

1. **Fix the carousel event listener** - Add proper cleanup and ensure the select event updates the activeIndex correctly

2. **Update the MobileCarousel sizing logic** - Instead of comparing `index === activeIndex`, we need to calculate the visual position relative to the current scroll position to determine which image should be enlarged

3. **Ensure smooth transitions** - The centered image enlarges (100px), adjacent images stay smaller (70px), and the quote text updates to match the centered person

### Technical Details

The fix involves:
- Moving the scroll snap index tracking to properly update `activeIndex` on carousel slide changes
- The quote and attribution at the bottom already use `activeTestimonial` which derives from `activeIndex`, so once we fix the index sync, the text will update automatically
- Adjusting the carousel options to ensure proper centering behavior

### Expected Behavior After Fix
- Swipe left/right on mobile to navigate between testimonials
- The centered image becomes larger (100px)
- Adjacent images remain smaller (70px)  
- The quote text and attribution below update to show the centered person's testimonial
- Smooth transitions between slides
