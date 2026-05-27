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
import testimonialSilviaImage from "@/assets/testimonial-svetla-client.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonialImages = [
  testimonialCenterImage,
  testimonialRightImage,
  testimonialAsyaImage,
  testimonialElenaImage,
  testimonialSilviaImage,
];

// Size map based on position
const sizeMap = [160, 260, 340, 260, 160];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(2);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const hasInitialized = useRef(false);
  
  const totalImageWidth = sizeMap.reduce((a, b) => a + b, 0);
  const containerWidth = 1198;
  const overlapTotal = totalImageWidth - containerWidth;
  const overlapPerGap = overlapTotal / (t.testimonials.items.length - 1);

  const activeTestimonial = t.testimonials.items[activeIndex];

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

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

  const DesktopOverlapping = () => (
    <div 
      className="flex items-center justify-center"
      style={{ maxWidth: containerWidth, height: 392 }}
    >
      {t.testimonials.items.map((testimonial, index) => {
        const size = sizeMap[index];
        const isCenter = index === 2;
        const distanceFromCenter = Math.abs(index - 2);
        const isActive = index === activeIndex;
        const image = testimonialImages[index];
        
        return (
          <div
            key={index}
            className="relative transition-all duration-300 hover:scale-110 hover:z-20 flex-shrink-0 cursor-pointer"
            style={{
              marginLeft: index === 0 ? 0 : -overlapPerGap,
              zIndex: isActive ? 15 : (isCenter ? 10 : 7 - distanceFromCenter),
            }}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div
              className="rounded-full overflow-hidden bg-muted transition-all duration-300 flex items-center justify-center"
              style={{ width: size, height: size }}
            >
              {image ? (
                <img src={image} alt={testimonial.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-muted-foreground text-sm">Photo</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (isMobile) {
    return (
      <section className="w-full pt-[130px] pb-16 overflow-hidden">
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
          className="text-[24px] font-medium text-center mb-8 px-4"
        >
          {t.testimonials.heading}
        </h2>

        <div className="relative">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "center", containScroll: false, startIndex: 2 }}
            className="w-full overflow-hidden"
          >
            <CarouselContent className="ml-0 flex items-center">
              {t.testimonials.items.map((testimonial, index) => {
                const isActive = index === activeIndex;
                const imageSize = isActive ? 150 : 70;
                const image = testimonialImages[index];
                return (
                  <CarouselItem 
                    key={index} 
                    className="basis-1/3 shrink-0 grow-0 pl-0 flex justify-center items-center"
                    style={{ minWidth: '33.333%' }}
                  >
                    <div
                      className="rounded-full overflow-hidden bg-muted flex items-center justify-center transition-all duration-300"
                      style={{ width: imageSize, height: imageSize }}
                    >
                      {image ? (
                        <img src={image} alt={testimonial.name} className="w-full h-full object-cover" />
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

        <div className="text-center px-4 mt-8" style={{ minHeight: 260 }}>
          <p
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
            className="text-[14px] leading-[1.6] text-muted-foreground mb-4"
          >
            &ldquo;{activeTestimonial.quote}&rdquo;
          </p>
          <p
            style={{ fontFamily: "'Inter', sans-serif" }}
            className="text-[14px] font-medium text-foreground"
          >
            — {activeTestimonial.name}, {activeTestimonial.location}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-5 sm:px-6 md:px-12 lg:px-[100px] pt-[160px] md:pt-[180px] lg:pt-[200px] pb-16 md:pb-24 lg:pb-32">
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[36px] lg:text-[48px] font-medium text-center mb-10 lg:mb-16 mx-auto max-w-4xl px-4"
      >
        {t.testimonials.heading}
      </h2>

      <div className="flex justify-center items-center mb-12 md:mb-16 lg:mb-20">
        <DesktopOverlapping />
      </div>

      <div className="max-w-3xl mx-auto text-center">
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          className="text-[16px] lg:text-[18px] leading-[1.6] text-muted-foreground transition-opacity duration-300"
        >
          &ldquo;{activeTestimonial.quote}&rdquo;
        </p>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[16px] font-medium text-foreground mt-6 transition-opacity duration-300"
        >
          — {activeTestimonial.name}, {activeTestimonial.location}
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
