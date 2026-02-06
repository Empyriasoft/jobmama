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
    name: "Estee", 
    role: "JobMama Founder",
    image: testimonialCenterImage,
    quote: "After five years away from finance, I thought my career was over. JobMama showed me how to leverage my experience and helped me land a senior position. Their belief in me made all the difference."
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
];

// Size map based on position: [0, 1, 2, 3] - symmetric around center
const sizeMap = [200, 340, 340, 200];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(1);
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
      carouselApi.scrollTo(1, true);
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
        const isCenter = index === 1 || index === 2;
        const distanceFromCenter = Math.abs(index - 1.5);
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
              className="rounded-full overflow-hidden bg-muted transition-all duration-300"
              style={{
                width: size,
                height: size,
              }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="w-full px-5 md:px-8 lg:px-[100px] pt-[200px] md:pt-[300px] lg:pt-[400px] pb-16 md:pb-24 lg:pb-32">
      {/* Overlapping round images / Mobile carousel */}
      <div className="flex justify-center items-center mb-12 md:mb-16 lg:mb-20">
        {isMobile ? (
          <Carousel
            opts={{
              align: "center",
              loop: true,
              containScroll: false,
            }}
            setApi={setCarouselApi}
            className="w-full max-w-[320px] mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="pl-4 basis-1/3">
                  <div className="flex justify-center items-center h-[110px]">
                    <div
                      className="rounded-full overflow-hidden bg-muted transition-all duration-300"
                      style={{
                        width: getImageSize(index),
                        height: getImageSize(index),
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <DesktopOverlapping />
        )}
      </div>

      {/* Testimonials heading */}
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[24px] md:text-[36px] lg:text-[48px] font-medium text-center mb-6 md:mb-8 lg:mb-10 mx-auto max-w-4xl px-4"
      >
        Here is what some of our clients have to say:
      </h2>

      {/* Testimonial text */}
      <div className="max-w-3xl mx-auto text-center">
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          className="text-[14px] md:text-[16px] lg:text-[18px] leading-[1.6] text-muted-foreground transition-opacity duration-300"
        >
          "{activeTestimonial.quote}"
        </p>
        <p
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[14px] md:text-[16px] font-medium text-foreground mt-6 transition-opacity duration-300"
        >
          — {activeTestimonial.name}, {activeTestimonial.role}
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
