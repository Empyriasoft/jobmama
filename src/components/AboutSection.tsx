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

  return (
    <section className="w-full px-8 py-[100px] md:px-16 lg:px-24">
      {/* Section Title */}
      <h2
        style={{ fontFamily: "'Playfair Display', serif" }}
        className="mb-[80px] text-[32px] italic text-foreground"
      >
        About JobMama
      </h2>

      {/* Two Column Layout */}
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-[412px]">
        {/* Left Column - Navigation - matches card height */}
        <div className="flex flex-col lg:w-[340px] lg:h-[950px]">
          {values.map((value, index) => (
            <button
              key={value.key}
              onClick={() => setActiveValue(value.key)}
              className="group relative text-left"
              style={{
                marginBottom: index === values.length - 1 ? 0 : '113px'
              }}
            >
              <span
                style={{ fontFamily: "'Google Sans', sans-serif" }}
                className={`text-[40px] font-normal leading-[1.2] transition-colors duration-200 ${
                  activeValue === value.key
                    ? "text-foreground"
                    : "text-muted-foreground/50 hover:text-muted-foreground"
                }`}
              >
                {value.label}
              </span>
              {/* Active Indicator Line */}
              <div
                className={`mt-[113px] h-[3px] w-[60px] bg-primary transition-all duration-300 ${
                  activeValue === value.key
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right Column - Content Card */}
        <div className="flex-1 lg:max-w-[1097px]">
          <div 
            className="relative overflow-hidden rounded-[32px] h-[950px] w-full lg:w-[1097px] bg-cover bg-center bg-no-repeat flex flex-col justify-center"
            style={{ backgroundImage: `url(${aboutCardBg})` }}
          >
            {/* Title positioned from bottom */}
            <h3
              style={{ fontFamily: "'Google Sans', sans-serif", fontSize: '75.88px', letterSpacing: '-0.04em' }}
              className="absolute bottom-[300px] left-[95px] right-[95px] font-medium leading-[1.1] text-foreground"
            >
              {aboutContent[activeValue].title}
            </h3>
            {/* Description positioned from bottom */}
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontSize: '24px', letterSpacing: '-0.04em' }}
              className="absolute bottom-[108px] left-[95px] max-w-[500px] leading-[1.6] text-foreground/90 font-light"
            >
              {aboutContent[activeValue].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
