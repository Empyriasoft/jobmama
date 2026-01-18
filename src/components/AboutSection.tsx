import { useState } from "react";
import aboutCardBg from "@/assets/about-card-bg.png";

type ValueKey = "empathy" | "determination" | "change" | "confidence";

interface AboutContent {
  title: string;
  description: string;
}

const aboutContent: Record<ValueKey, AboutContent> = {
  empathy: {
    title: "Understanding Your Unique ",
    description:
      "We believe every mother's path back to work is different. Our approach centers on truly listening to your needs, fears, and aspirations. We're here to support you without judgment, celebrating your strengths while helping you overcome challenges.",
  },
  determination: {
    title: "How To Prepare For Your First Interview",
    description:
      "Duis sed iaculis lectus. Integer sit amet malesuada magna. Aenean scelerisque tellus vitae quam sodales blandit. Cras luctus arcu et justo finibus mollis. Donec rhoncus nisl sed sem viverra.",
  },
  change: {
    title: "Embracing New Opportunities",
    description:
      "Change can feel overwhelming, especially after a career break. We help you see change as an opportunity for growth. Whether you're pivoting to a new field or returning to your previous role, we'll guide you through every step of the transition.",
  },
  confidence: {
    title: "Building Unshakeable Self-Belief",
    description:
      "Confidence isn't about being perfect—it's about knowing your worth. Through our coaching sessions, we help you rediscover your professional identity and build the self-assurance needed to thrive in interviews and beyond.",
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

      {/* Two Column Layout - reversed on mobile so card appears first */}
      <div className="flex flex-col-reverse gap-8 lg:flex-row lg:gap-16">
        {/* Tabs - appears BELOW card on mobile, LEFT on desktop */}
        <div className="flex flex-row flex-wrap justify-center gap-4 lg:flex-col lg:justify-center lg:w-[340px] lg:h-[950px]">
          {values.map((value, index) => {
            const isActive = activeValue === value.key;
            const isLast = index === values.length - 1;
            
            return (
              <div key={value.key} className="flex flex-col items-center lg:items-start">
                <button
                  onClick={() => setActiveValue(value.key)}
                  className="group relative text-left"
                >
                  <span
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                    className={`text-[14px] md:text-[24px] lg:text-[40px] font-bold md:font-normal leading-[1.2] transition-colors duration-200 ${
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
                    className="h-[3px] w-[30px] lg:w-[60px] bg-primary transition-all duration-300 mt-2 lg:mt-[113px] lg:mb-[113px]"
                  />
                )}
                
                {/* Spacing for non-selected items - only on desktop */}
                {!isActive && !isLast && (
                  <div className="hidden lg:block" style={{ height: '113px' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card - appears FIRST on mobile, RIGHT on desktop */}
        <div className="flex-1">
          <div 
            className="relative overflow-hidden rounded-[20px] lg:rounded-[32px] h-[400px] md:h-[600px] lg:h-[950px] w-full bg-cover bg-center bg-no-repeat cursor-pointer lg:cursor-default animate-[pulse-hint_2s_ease-in-out_1] lg:animate-none"
            style={{ backgroundImage: `url(${aboutCardBg})` }}
            onClick={handleCardClick}
          >
            {/* Content container positioned from bottom */}
            <div 
              key={activeValue}
              className="absolute bottom-8 left-5 right-5 md:bottom-[70px] md:left-12 md:right-12 lg:bottom-[108px] lg:left-[95px] lg:right-[95px] flex flex-col gap-3 md:gap-6 lg:gap-[36px] animate-fade-in"
            >
              <h3
                style={{ fontFamily: "'Google Sans', sans-serif", letterSpacing: '-0.04em' }}
                className="text-[24px] md:text-[40px] lg:text-[75.88px] font-medium leading-[1.1] text-foreground"
              >
                {aboutContent[activeValue].title}
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
