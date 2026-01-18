import { useState } from "react";
import aboutCardBg from "@/assets/about-card-bg.png";

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
  { key: "empathy", label: "Empathy" },
  { key: "determination", label: "Determination" },
  { key: "change", label: "Change" },
  { key: "confidence", label: "Confidence" },
];

const AboutSection = () => {
  const [activeValue, setActiveValue] = useState<ValueKey>("empathy");

  // Handle card tap to cycle through values (mobile)
  const handleCardClick = () => {
    const currentIndex = values.findIndex(v => v.key === activeValue);
    const nextIndex = (currentIndex + 1) % values.length;
    setActiveValue(values[nextIndex].key);
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

        {/* Card */}
        <div className="flex-1">
          <div 
            className="relative overflow-hidden rounded-[20px] lg:rounded-[32px] h-[400px] md:h-[600px] lg:h-[950px] w-full bg-cover bg-center bg-no-repeat cursor-pointer lg:cursor-default animate-[pulse-hint_2s_ease-in-out_1] lg:animate-none"
            style={{ backgroundImage: `url(${aboutCardBg})` }}
            onClick={handleCardClick}
          >
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
              <h3
                style={{ fontFamily: "'Google Sans', sans-serif", letterSpacing: '-0.04em' }}
                className="text-[24px] md:text-[40px] lg:text-[75.88px] font-medium leading-[1.1] text-foreground"
              >
                {values.find(v => v.key === activeValue)?.label}
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.04em' }}
                className="text-[14px] md:text-[16px] lg:text-[24px] max-w-[500px] leading-[1.5] lg:leading-[1.6] text-foreground/90 font-light"
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
