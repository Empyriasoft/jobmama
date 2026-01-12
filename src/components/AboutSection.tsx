import { useState } from "react";

type ValueKey = "empathy" | "determination" | "change" | "confidence";

interface AboutContent {
  title: string;
  description: string;
}

const aboutContent: Record<ValueKey, AboutContent> = {
  empathy: {
    title: "Understanding Your Unique Journey",
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
  const [activeValue, setActiveValue] = useState<ValueKey>("determination");

  return (
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 md:px-16 md:py-20 lg:px-24 lg:py-24">
      {/* Section Title */}
      <h2
        style={{ fontFamily: "'Playfair Display', serif" }}
        className="mb-10 text-2xl italic text-foreground sm:mb-12 sm:text-3xl md:mb-16 md:text-4xl"
      >
        About JobMama
      </h2>

      {/* Two Column Layout */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Left Column - Navigation */}
        <div className="flex flex-col gap-2 lg:w-2/5">
          {values.map((value) => (
            <button
              key={value.key}
              onClick={() => setActiveValue(value.key)}
              className="group relative text-left"
            >
              <span
                style={{ fontFamily: "'Google Sans', sans-serif" }}
                className={`text-2xl font-bold transition-colors duration-200 sm:text-3xl md:text-4xl ${
                  activeValue === value.key
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {value.label}
              </span>
              {/* Active Indicator Line */}
              <div
                className={`mt-2 h-0.5 w-12 bg-primary transition-all duration-300 sm:w-16 ${
                  activeValue === value.key
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-50"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Right Column - Content Card */}
        <div className="lg:w-3/5">
          <div className="relative overflow-hidden rounded-[24px] bg-primary p-6 sm:rounded-[32px] sm:p-8 md:p-10">
            {/* Decorative SVG Element */}
            <div className="absolute right-4 top-4 opacity-20 sm:right-6 sm:top-6">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px]"
              >
                <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" />
                <circle cx="40" cy="40" r="25" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" />
                <circle cx="40" cy="40" r="15" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" />
                <path
                  d="M40 5V75M5 40H75"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary-foreground"
                />
              </svg>
            </div>

            {/* Content with transition */}
            <div className="relative z-10">
              <h3
                style={{ fontFamily: "'Google Sans', sans-serif" }}
                className="mb-4 text-xl font-bold text-primary-foreground sm:mb-6 sm:text-2xl md:text-3xl"
              >
                {aboutContent[activeValue].title}
              </h3>
              <p
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="max-w-lg text-sm leading-relaxed text-primary-foreground/90 sm:text-base md:text-lg"
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
