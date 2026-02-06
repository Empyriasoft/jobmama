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

// Placeholder testimonial data - replace with real data/images later
const testimonials = [
  { 
    id: 1, 
    name: "Sarah M.", 
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    quote: "JobMama completely transformed my approach to returning to work. After two years of being a stay-at-home mom, I felt lost and unsure of my skills. The personalized coaching helped me regain my confidence, update my resume, and land a role that perfectly fits my family's needs."
  },
  { 
    id: 2, 
    name: "Emily R.", 
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    quote: "I was terrified to re-enter the tech industry after my maternity leave. JobMama's expert guidance helped me brush up on my skills and negotiate a flexible schedule. I'm now thriving in my dream role!"
  },
  { 
    id: 3, 
    name: "Jessica L.", 
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    quote: "The support I received was incredible. From resume workshops to interview prep, every step was tailored to my unique situation as a returning mom. I couldn't have done it without JobMama."
  },
  { 
    id: 4, 
    name: "Estee", 
    role: "JobMama Founder",
    image: testimonialCenterImage,
    quote: "After five years away from finance, I thought my career was over. JobMama showed me how to leverage my experience and helped me land a senior position. Their belief in me made all the difference."
  },
  { 
    id: 5, 
    name: "Nadia", 
    role: "HR Director",
    image: testimonialRightImage,
    quote: "The personalized coaching sessions were a game-changer. I went from feeling invisible in the job market to receiving multiple offers. JobMama truly understands the challenges moms face."
  },
  { 
    id: 6, 
    name: "Nicole P.", 
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    quote: "Returning to the creative industry felt daunting, but JobMama helped me showcase my portfolio in a fresh way. I'm now leading a team at an amazing agency. Thank you, JobMama!"
  },
  { 
    id: 7, 
    name: "Michelle D.", 
    role: "Sales Executive",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    quote: "I was worried my sales skills were outdated after being away. JobMama's training and confidence-building sessions helped me exceed my targets in my first quarter back. Highly recommend!"
  },
];

// Size map based on position: [0, 1, 2, 3(center), 4, 5, 6]
const sizeMap = [140, 191, 284, 392, 284, 191, 140];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(3);
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
      carouselApi.scrollTo(3, true);
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
        const isCenter = index === 3;
        const distanceFromCenter = Math.abs(index - 3);
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
