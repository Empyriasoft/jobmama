import { useState, useRef } from "react";
import aboutHeartImage from "@/assets/about-heart-image.png";
import aboutPurposeImage from "@/assets/about-purpose-image.png";
import aboutVisionImage from "@/assets/about-vision-image.png";
import aboutSolutionImage from "@/assets/about-solution-image.png";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

type ValueKey = "empathy" | "determination" | "change" | "confidence";

const valueImages: Record<ValueKey, string> = {
  empathy: aboutHeartImage,
  determination: aboutPurposeImage,
  change: aboutVisionImage,
  confidence: aboutSolutionImage,
};

interface AboutContent {
  title: string;
  description: string;
}

const aboutContent: Record<ValueKey, AboutContent> = {
  empathy: {
    title: "The Heart Behind the Brand",
    description:
      "JobMama was born out of real-world experience. After maternity leave, our founder faced a common challenge: navigating the job market with a young child while experiencing the \"confidence gap.\"\n\nBeyond being a mother who has \"been there,\" she is a seasoned HR professional with years on the other side of the hiring table. JobMama is where expert professional insight meets true maternal empathy.",
  },
  determination: {
    title: "The Purpose",
    description:
      "For many mothers, the end of maternity leave isn't a simple return—it's a forced career pivot. Nearly 50% of women report being unable to return to their previous roles. JobMama is a human resources consultancy dedicated to helping mothers transition back into the workforce. We believe a career break for motherhood should be a pause, not a full stop.",
  },
  change: {
    title: "Our Vision & Mission",
    description:
      "Our mission is to empower women to rebuild their professional confidence, modernize their job search skills, and secure fulfilling employment. We envision a labor market where mothers are valued for their resilience and expertise, and where professional reintegration is a seamless, empowering experience.",
  },
  confidence: {
    title: "The Solution",
    description:
      "A holistic path to your career relaunch. Empathetic coaching to overcome confidence gaps, expert HR-led career services to make you the top candidate, and measurable results turning your transition into a career launchpad. We offer a specialized bridge back to professional life.",
  },
};

const values: { key: ValueKey; label: string }[] = [
  { key: "empathy", label: "The Heart Behind the Brand" },
  { key: "determination", label: "The Purpose" },
  { key: "change", label: "Our Vision & Mission" },
  { key: "confidence", label: "The Solution" },
];

// Mobile Card Component
const MobileAboutCard = ({ value }: { value: { key: ValueKey; label: string } }) => {
  const [expanded, setExpanded] = useState(false);
  const content = aboutContent[value.key];
  
  return (
    <div 
      className="relative overflow-hidden rounded-[24px] h-[480px] w-full"
      style={{ backgroundColor: 'hsl(192 100% 50%)' }} // Brand blue #00CEFF
    >
      {/* Blob-shaped mother-child image */}
      <img 
        src={valueImages[value.key]}
        alt="Mother and child"
        className="absolute w-[200px] h-[113px] left-5 top-8 object-contain"
      />

      {/* Content container */}
      <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
        {/* Title */}
        <h3
          style={{ fontFamily: "'Google Sans', sans-serif", letterSpacing: '-0.04em' }}
          className="text-[24px] font-medium leading-[1.1] text-foreground"
        >
          {content.title}
        </h3>
        
        {/* Description - truncated or full */}
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
          className={`text-[14px] leading-[1.5] font-light text-foreground/90 ${
            expanded ? '' : 'line-clamp-4'
          }`}
        >
          {content.description}
        </p>

        {/* Read more link */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-foreground font-medium text-[14px] mt-1 self-start hover:opacity-80 transition-opacity"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {expanded ? 'Show less' : 'Read more'} 
          <span className="text-lg">{expanded ? '↑' : '→'}</span>
        </button>
      </div>
    </div>
  );
};

// Desktop Card Component (existing design)
const DesktopAboutCard = ({ activeValue }: { activeValue: ValueKey }) => {
  const [tiltX, setTiltX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  return (
    <div 
      className="relative overflow-hidden rounded-[40px] lg:rounded-[80px] h-[500px] md:h-[700px] lg:h-[950px] w-full cursor-default"
      style={{ 
        backgroundColor: '#ececec',
        transform: `perspective(1000px) rotateY(${tiltX}deg) scale(${isSwiping ? 0.98 : 1})`,
        transition: isSwiping ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Blob-shaped mother-child image */}
      <img 
        src={valueImages[activeValue]}
        alt="Mother and child"
        className="absolute w-[400px] h-[226px] lg:w-[671px] lg:h-[379px] left-8 top-10 lg:left-[44px] lg:top-[49px] object-contain"
      />

      {/* Content container positioned from bottom */}
      <div 
        key={activeValue}
        className="absolute bottom-[70px] left-12 right-12 lg:bottom-[108px] lg:left-[95px] lg:right-[95px] flex flex-col gap-4 lg:gap-[36px] animate-fade-in"
      >
        {/* Main heading */}
        <h3
          style={{ fontFamily: "'Google Sans', sans-serif", letterSpacing: '-0.04em', color: '#000000' }}
          className="text-[48px] lg:text-[75.88px] font-medium leading-[1.1]"
        >
          {aboutContent[activeValue].title}
        </h3>
        <p
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.04em', color: '#000000' }}
          className="text-[18px] lg:text-[24px] leading-[1.5] lg:leading-[1.6] font-light opacity-90"
        >
          {aboutContent[activeValue].description}
        </p>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [activeValue, setActiveValue] = useState<ValueKey>("empathy");
  const isMobile = useIsMobile();

  // Mobile: Carousel Layout
  if (isMobile) {
    return (
      <section className="w-full px-4 pt-16 pb-12 overflow-hidden">
        {/* Section Title */}
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
          className="text-[36px] mb-8 font-medium text-center"
        >
          About JobMama
        </h2>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {values.map((value) => (
              <CarouselItem key={value.key} className="pl-3 basis-[85%]">
                <MobileAboutCard value={value} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    );
  }

  // Desktop: Original Layout (unchanged)
  return (
    <section className="w-full px-5 pt-20 pb-16 md:px-8 md:pt-[150px] md:pb-20 lg:px-[100px] lg:pt-[251px] lg:pb-[100px]">
      {/* Section Title */}
      <h2
        style={{ fontFamily: "'Google Sans', sans-serif", color: '#0D141C' }}
        className="text-[40px] md:text-[72px] lg:text-[128.7px] mb-12 md:mb-[100px] lg:mb-[196px] font-medium text-center"
      >
        About JobMama
      </h2>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row lg:gap-16">
        {/* Tabs - shown on LEFT on desktop */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:w-[340px] lg:h-[950px]">
          {values.map((value, index) => {
            const isActive = activeValue === value.key;
            const isLast = index === values.length - 1;
            
            return (
              <div key={value.key} className="flex flex-col items-start">
                <button
                  onClick={() => setActiveValue(value.key)}
                  className="group relative text-left"
                >
                  <span
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                    className={`text-[40px] font-normal leading-[1.2] transition-colors duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                    }`}
                  >
                    {value.label}
                  </span>
                </button>
                
                {/* Blue indicator line - only shown for selected item */}
                {isActive && (
                  <div 
                    className="h-[3px] w-[60px] bg-primary transition-all duration-300 mt-[113px] mb-[113px]"
                  />
                )}
                
                {/* Spacing for non-selected items */}
                {!isActive && !isLast && (
                  <div style={{ height: '113px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="flex-1">
          <DesktopAboutCard activeValue={activeValue} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
