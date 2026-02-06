
# Testimonials Mobile Layout Fix

## Problem
Currently, the mobile testimonials section scrolls the entire card (image + text) together. You want only the images to scroll in a carousel, with the text staying fixed below and updating based on the selected image - similar to how the desktop version works.

## Solution
Restructure the mobile layout to have:
1. A swipeable image carousel at the top (like the wireframe shows)
2. A fixed text section below that updates based on the active selection

## Implementation Details

### File to Modify
`src/components/TestimonialsSection.tsx`

### Changes

**1. Restructure Mobile Layout**
- Separate the image carousel from the text display
- Images will be in a horizontal swipeable carousel
- Active image will be larger (e.g., 120px) than inactive ones (e.g., 70px)
- Text section stays fixed below and updates based on `activeIndex`

**2. Image Carousel Setup**
- Use the Carousel component with `setApi` to track selection
- Center-align items so the active image is in the middle
- Apply scaling: active image is larger, adjacent ones smaller
- Sync `activeIndex` state with carousel selection

**3. Fixed Text Section**
- Display the quote and name for the currently active testimonial
- Add smooth fade transition when text changes
- Position below the image carousel

### Technical Approach

```text
+----------------------------------+
|     [img] [IMG] [img]            |  <- Swipeable carousel
|      70   120   70               |     (center is larger)
+----------------------------------+
|                                  |
|  "Quote text for selected..."   |  <- Fixed text area
|                                  |     (updates on selection)
|  — Name, Location               |
|                                  |
+----------------------------------+
```

### Code Structure

```tsx
// Mobile layout structure
if (isMobile) {
  return (
    <section>
      {/* Heading */}
      <h2>Here is what some of our clients have to say:</h2>

      {/* Image Carousel - swipeable */}
      <Carousel setApi={setCarouselApi} opts={{ align: "center" }}>
        <CarouselContent>
          {testimonials.map((t, index) => (
            <CarouselItem className="basis-1/3">
              <div style={{ 
                width: isActive ? 120 : 70, 
                height: isActive ? 120 : 70 
              }}>
                <img src={t.image} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Fixed Text Section - updates based on activeIndex */}
      <div className="text-center px-4">
        <p>"{activeTestimonial.quote}"</p>
        <p>— {activeTestimonial.name}, {activeTestimonial.role}</p>
      </div>
    </section>
  );
}
```

## Expected Result
- Swipe left/right to navigate between testimonials
- Only the images move during swipe
- Text below updates smoothly to show the selected person's quote
- Center image is visually larger than adjacent images
