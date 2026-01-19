import { useState, useRef } from "react";
import aboutBlobImage from "@/assets/about-blob-image.png";

type ValueKey = "empathy" | "determination" | "change" | "confidence";

interface AboutContent {
  title: string;
  description: string;
}

const aboutContent: Record<ValueKey, AboutContent> = {
  empathy: {
    title: "The Heart Behind the Brand",
    description:
      "JobMama was born out of real-world experience. After a sixteen-month maternity leave, our founder faced a challenge all too common: a layoff. Beyond being a mother who has 'been there,' she is a seasoned HR professional who knows exactly what employers are looking for. JobMama is where expert professional insight meets true maternal empathy.",
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

const AboutSection = () => {
  const [activeValue, setActiveValue] = useState<ValueKey>("empathy");
  const [tiltX, setTiltX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    // Limit tilt to ±8 degrees for a subtle effect
    const tilt = Math.max(-8, Math.min(8, diff / 20));
    setTiltX(tilt);
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      const currentIndex = values.findIndex(v => v.key === activeValue);
      if (diff > 0 && currentIndex < values.length - 1) {
        // Swipe left - next
        setActiveValue(values[currentIndex + 1].key);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous
        setActiveValue(values[currentIndex - 1].key);
      }
    }
    
    // Reset tilt with animation
    setTiltX(0);
    setIsSwiping(false);
  };


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
        {/* Tabs - HIDDEN on mobile, shown on LEFT on desktop */}
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

        {/* Card - New Figma Design */}
        <div className="flex-1">
          <div 
            className="relative overflow-hidden rounded-[40px] lg:rounded-[80px] h-[500px] md:h-[700px] lg:h-[950px] w-full cursor-default animate-[pulse-hint_2s_ease-in-out_1] lg:animate-none"
            style={{ 
              backgroundColor: '#ececec',
              transform: `perspective(1000px) rotateY(${tiltX}deg) scale(${isSwiping ? 0.98 : 1})`,
              transition: isSwiping ? 'none' : 'transform 0.3s ease-out'
            }}
            
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Blob-shaped mother-child image */}
            <img 
              src={aboutBlobImage}
              alt="Mother and child"
              className="absolute w-[200px] h-[113px] md:w-[400px] md:h-[226px] lg:w-[671px] lg:h-[379px] left-4 top-6 md:left-8 md:top-10 lg:left-[44px] lg:top-[49px] object-contain"
            />

            {/* Dot pagination - mobile only */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
              {values.map((value) => (
                <button
                  key={value.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveValue(value.key);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeValue === value.key
                      ? "bg-primary w-6"
                      : "bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Go to ${value.label}`}
                />
              ))}
            </div>

            {/* Content container positioned from bottom */}
            <div 
              key={activeValue}
              className="absolute bottom-12 left-5 right-5 md:bottom-[70px] md:left-12 md:right-12 lg:bottom-[108px] lg:left-[95px] lg:right-[95px] flex flex-col gap-2 md:gap-4 lg:gap-[36px] animate-fade-in"
            >
              {/* Main heading - "I'm a new mother. Now What?" style */}
              <h3
                style={{ fontFamily: "'Google Sans', sans-serif", letterSpacing: '-0.04em', color: '#000000' }}
                className="text-[28px] md:text-[48px] lg:text-[75.88px] font-medium leading-[1.1]"
              >
                {aboutContent[activeValue].title}
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.04em', color: '#000000' }}
                className="text-[14px] md:text-[18px] lg:text-[24px] max-w-[500px] lg:max-w-[600px] leading-[1.5] lg:leading-[1.6] font-light opacity-90"
              >
                {aboutContent[activeValue].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
