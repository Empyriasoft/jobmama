import { useState, useEffect } from "react";
import aboutCardBg from "@/assets/about-card-bg.png";
type ValueKey = "empathy" | "determination" | "change" | "confidence";
interface AboutContent {
  title: string;
  description: string;
}
const aboutContent: Record<ValueKey, AboutContent> = {
  empathy: {
    title: "Understanding Your Unique ",
    description: "We believe every mother's path back to work is different. Our approach centers on truly listening to your needs, fears, and aspirations. We're here to support you without judgment, celebrating your strengths while helping you overcome challenges."
  },
  determination: {
    title: "How To Prepare For Your First Interview",
    description: "Duis sed iaculis lectus. Integer sit amet malesuada magna. Aenean scelerisque tellus vitae quam sodales blandit. Cras luctus arcu et justo finibus mollis. Donec rhoncus nisl sed sem viverra."
  },
  change: {
    title: "Embracing New Opportunities",
    description: "Change can feel overwhelming, especially after a career break. We help you see change as an opportunity for growth. Whether you're pivoting to a new field or returning to your previous role, we'll guide you through every step of the transition."
  },
  confidence: {
    title: "Building Unshakeable Self-Belief",
    description: "Confidence isn't about being perfect—it's about knowing your worth. Through our coaching sessions, we help you rediscover your professional identity and build the self-assurance needed to thrive in interviews and beyond."
  }
};
const values: {
  key: ValueKey;
  label: string;
}[] = [{
  key: "empathy",
  label: "Empathy"
}, {
  key: "determination",
  label: "Determination"
}, {
  key: "change",
  label: "Change"
}, {
  key: "confidence",
  label: "Confidence"
}];
const AboutSection = () => {
  const [activeValue, setActiveValue] = useState<ValueKey>("empathy");
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedValue, setDisplayedValue] = useState<ValueKey>("empathy");
  const handleValueChange = (newValue: ValueKey) => {
    if (newValue === activeValue) return;
    setIsAnimating(true);
    setActiveValue(newValue);

    // After fade out, update displayed content and fade in
    setTimeout(() => {
      setDisplayedValue(newValue);
      setIsAnimating(false);
    }, 150);
  };

  const handleCardClick = () => {
    const currentIndex = values.findIndex(v => v.key === activeValue);
    const nextIndex = (currentIndex + 1) % values.length;
    handleValueChange(values[nextIndex].key);
  };
  return <section className="w-full px-4 pt-[80px] pb-[60px] md:px-8 lg:px-24 lg:pt-[251px] lg:pb-[100px]">
      {/* Section Title */}
      <h2 style={{
      fontFamily: "'Google Sans', sans-serif"
    }} className="mb-[60px] lg:mb-[196px] font-medium text-center text-[40px] lg:text-[128.7px] text-foreground">
        About JobMama
      </h2>

      {/* Card and Navigation Layout */}
      <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:items-stretch lg:gap-16">
        {/* Desktop Navigation - left side of card */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:gap-6 lg:h-[950px]">
          {values.map((value) => {
            const isActive = activeValue === value.key;
            return (
              <button 
                key={value.key} 
                onClick={() => handleValueChange(value.key)} 
                className="group relative text-left"
              >
                <span style={{
                  fontFamily: "'Google Sans', sans-serif"
                }} className="text-[40px] font-normal leading-[1.2] text-foreground">
                  {value.label}
                </span>
                {/* Blue indicator line - only shown for selected item */}
                <div className={`absolute -bottom-2 left-0 h-[3px] w-full bg-primary transition-all duration-300 ${isActive ? "opacity-100" : "opacity-0"}`} />
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div className="w-full lg:max-w-[1097px]">
          <div 
            onClick={handleCardClick}
            className="relative overflow-hidden rounded-[24px] lg:rounded-[32px] h-[500px] lg:h-[950px] w-full lg:w-[1097px] bg-cover bg-center bg-no-repeat cursor-pointer" 
            style={{
              backgroundImage: `url(${aboutCardBg})`
            }}>
            {/* Content container positioned from bottom */}
            <div className={`absolute bottom-6 left-6 right-6 lg:bottom-[108px] lg:left-[95px] lg:right-[95px] flex flex-col gap-4 lg:gap-[36px] transition-all duration-300 ease-out ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <h3 style={{
                fontFamily: "'Google Sans', sans-serif",
                letterSpacing: '-0.04em'
              }} className="font-medium leading-[1.1] text-foreground text-[28px] lg:text-[75.88px]">
                {aboutContent[displayedValue].title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.04em'
              }} className="max-w-[500px] leading-[1.6] text-foreground/90 font-light text-[14px] lg:text-[24px]">
                {aboutContent[displayedValue].description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - below card */}
        <div className="flex lg:hidden justify-center mt-4 gap-[10px]">
          {values.map(value => (
            <button 
              key={value.key} 
              onClick={() => handleValueChange(value.key)} 
              className="relative whitespace-nowrap pb-3 transition-colors duration-200" 
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              <span className="text-sm font-bold text-foreground">
                {value.label}
              </span>
              {/* Active underline indicator */}
              <div className={`absolute bottom-0 left-0 h-[3px] w-full bg-primary transition-all duration-300 ${activeValue === value.key ? "opacity-100" : "opacity-0"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>;
};
export default AboutSection;