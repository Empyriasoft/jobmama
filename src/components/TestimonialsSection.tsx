import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import testimonialCenterImage from "@/assets/testimonial-center.png";
import testimonialRightImage from "@/assets/testimonial-right.png";
import testimonialAsyaImage from "@/assets/testimonial-asya.jpg";
import testimonialElenaImage from "@/assets/testimonial-elena.png";

// Real client testimonial data
const testimonials = [
  { 
    id: 1, 
    name: "Estervina", 
    role: "Varna",
    image: testimonialCenterImage,
    quote: "After three back-to-back maternity leaves, Svetlana's support was exactly what I needed to bridge the gap back to my career. From a modernized CV to constant encouragement, she ensured I felt empowered and supported every step of the way!"
  },
  { 
    id: 2, 
    name: "Nadya N.", 
    role: "Sofia",
    image: testimonialRightImage,
    quote: "Svetlana's expertise in modernizing my CV and LinkedIn gave me the confidence to re-enter the market, leading to interview calls almost immediately. I've been in my new role for four months now and feel excellent-I highly recommend her professional and inspiring guidance!"
  },
  { 
    id: 3, 
    name: "Asya A.", 
    role: "Sofia",
    image: testimonialAsyaImage,
    quote: "As a working mom of three making a career pivot, Svetlana helped me create a standout professional identity and shared invaluable insights into the pharmaceutical market. Her expert interview preparation gave me the strategic edge and confidence I needed to successfully navigate the entire process!"
  },
  { 
    id: 4, 
    name: "Elena", 
    role: "Sofia",
    image: testimonialElenaImage,
    quote: "With her practical guidance and genuine support, JobMama and Svetla helped me return to the job market with confidence and stand out after my maternity leave."
  },
  { 
    id: 5, 
    name: "Maria", 
    role: "Sofia",
    image: null, // Placeholder - waiting for image
    quote: "Coming soon..."
  },
];

// Size map based on position: [0, 1, 2, 3, 4] - symmetric around center
const sizeMap = [160, 260, 340, 260, 160];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(2); // Start with center (index 2)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const hasInitialized = useRef(false);
  
  // Calculate total width and overlap needed for desktop
  const totalImageWidth = sizeMap.reduce((a, b) => a + b, 0);
  const containerWidth = 1198;
  const overlapTotal = totalImageWidth - containerWidth;
  const overlapPerGap = overlapTotal / (testimonials.length - 1);

  const activeTestimonial = testimonials[activeIndex];

  // Sync carousel with active index on mobile
  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    // Scroll to center position on mount (only once)
    if (!hasInitialized.current) {
      carouselApi.scrollTo(2, true);
      hasInitialized.current = true;
    }
    
    onSelect();
    carouselApi.on("select", onSelect);
    
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  // Calculate which image should be enlarged based on visual position
  const getImageSize = (index: number) => {
    if (!isMobile) return 70;
    return index === activeIndex ? 100 : 70;
  };

  // Desktop overlapping view
  const DesktopOverlapping = () => (
    <div 
      className="flex items-center justify-center"
      style={{ 
        maxWidth: containerWidth,
        height: 392,
      }}
    >
      {testimonials.map((testimonial, index) => {
        const size = sizeMap[index];
        const isCenter = index === 2;
        const distanceFromCenter = Math.abs(index - 2);
        const isActive = index === activeIndex;
        
        return (
          <div
            key={testimonial.id}
            className="relative transition-all duration-300 hover:scale-110 hover:z-20 flex-shrink-0 cursor-pointer"
            style={{
              marginLeft: index === 0 ? 0 : -overlapPerGap,
              zIndex: isActive ? 15 : (isCenter ? 10 : 7 - distanceFromCenter),
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div
              className="rounded-full overflow-hidden bg-muted transition-all duration-300 flex items-center justify-center"
              style={{
                width: size,
                height: size,
              }}
            >
              {testimonial.image ? (
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground text-sm">Photo</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );


  // Mobile: Image carousel with fixed text below
  if (isMobile) {
    return (
      <section className="w-full pt-[200px] pb-16 overflow-hidden">
        {/* Testimonials heading */}
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
          className="text-[24px] font-medium text-center mb-8 px-4"
        >
          Here is what some of our clients have to say:
        </h2>

        {/* Image Carousel - only images swipe, centered layout */}
        <div className="relative">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "center",
              containScroll: false,
              startIndex: 2,
            }}
            className="w-full"
          >
            <CarouselContent 
              className="ml-0"
              style={{ paddingLeft: 'calc(50% - 75px)', paddingRight: 'calc(50% - 75px)' }}
            >
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex;
                return (
                  <CarouselItem 
                    key={testimonial.id} 
                    className="basis-auto pl-12 flex justify-center items-center"
                  >
                    <div
                      className="rounded-full overflow-hidden bg-muted flex items-center justify-center transition-all duration-300"
                      style={{
                        width: isActive ? 150 : 70,
                        height: isActive ? 150 : 70,
                      }}
                    >
                      {testimonial.image ? (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground text-xs">Photo</span>
                      )}
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Fixed Text Section - updates based on activeIndex */}
        <div className="text-center px-4 mt-8">
          <p
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
            className="text-[14px] leading-[1.6] text-muted-foreground mb-4 transition-opacity duration-300"
          >
            "{activeTestimonial.quote}"
          </p>
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-[14px] font-medium text-foreground transition-opacity duration-300"
          >
            — {activeTestimonial.name}, {activeTestimonial.role}
          </p>
        </div>
      </section>
    );
  }

  // Desktop layout
  return (
    <section className="w-full px-5 md:px-8 lg:px-[100px] pt-[200px] md:pt-[300px] lg:pt-[400px] pb-16 md:pb-24 lg:pb-32">
      {/* Desktop Overlapping Images */}
      <div className="flex justify-center items-center mb-12 md:mb-16 lg:mb-20">
        <DesktopOverlapping />
      </div>

      {/* Testimonials heading */}
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[36px] lg:text-[48px] font-medium text-center mb-8 lg:mb-10 mx-auto max-w-4xl px-4"
      >
        Here is what some of our clients have to say:
      </h2>

      {/* Testimonial text */}
      <div className="max-w-3xl mx-auto text-center">
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          className="text-[16px] lg:text-[18px] leading-[1.6] text-muted-foreground transition-opacity duration-300"
        >
          "{activeTestimonial.quote}"
        </p>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[16px] font-medium text-foreground mt-6 transition-opacity duration-300"
        >
          — {activeTestimonial.name}, {activeTestimonial.role}
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
