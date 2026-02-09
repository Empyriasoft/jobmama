import { useState } from "react";
import decorativeShape from "@/assets/faq-decorative-shape.png";

const NumberBadge = ({
  number
}: {
  number: string;
}) => (
  <div className="inline-flex items-center justify-center px-3 py-1 md:px-4 md:py-2 border-2 border-[#0D141C] rounded-full shrink-0">
    <span className="font-inter font-medium text-base md:text-xl lg:text-[38px] text-[#0D141C]">
      {number}
    </span>
  </div>
);

interface FAQItemProps {
  number: string;
  question: string;
  description: string;
}

const FAQItem = ({
  number,
  question,
  description
}: FAQItemProps) => (
  <div className="flex flex-col gap-3 md:gap-6">
    <div className="flex items-start gap-3 md:gap-6">
      <NumberBadge number={number} />
      <h3 className="font-google-sans font-medium text-xl sm:text-2xl md:text-4xl lg:text-[58px] text-[#0D141C] leading-tight">
        {question}
      </h3>
    </div>
    <p className="font-inter text-sm sm:text-base md:text-lg lg:text-xl text-[#0D141C] opacity-80 leading-relaxed">
      {description}
    </p>
  </div>
);

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`text-left py-2 px-3 md:py-3 md:px-4 lg:py-4 lg:px-6 font-google-sans font-medium text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[116px] xl:leading-[1.1] transition-all whitespace-nowrap min-h-[44px] ${
      active
        ? "text-[#0D141C]"
        : "text-white hover:text-[#0D141C]"
    }`}
  >
    {children}
  </button>
);

const ProcessSection = () => {
  const [activeTab, setActiveTab] = useState<"mamas" | "businesses">("mamas");

  const mamasSteps = [
    {
      number: "01.",
      title: "Reflect & Plan",
      description: "We begin with a deep-dive conversation to understand your story, your professional goals, and your concerns. In our initial coaching session, we reflect on what you truly want from your next chapter and map out a personalized Strategic Action Plan."
    },
    {
      number: "02.",
      title: "Rebuild Your Toolkit",
      description: "We rewrite your CV, optimize your LinkedIn profile, and sharpen your interview skills to meet the market standards. As we upgrade your tools, we focus on rebuilding your confidence. We help you translate your resilience and multitasking into professional assets."
    },
    {
      number: "03.",
      title: "Relaunch Your Career",
      description: "Whether you are applying for new roles or negotiating a return to your previous employer, we provide the guidance you need to land a position that aligns with your potential."
    }
  ];

  const businessesSteps = [
    {
      number: "01.",
      title: "Initial Discovery",
      description: "Start by booking a consultation meeting with us. We will discuss your current challenges, parental leave turnover, and your specific needs for talent retention."
    },
    {
      number: "02.",
      title: "Tailored Solutions",
      description: "Based on our meeting, we recommend a mix of our modular services - whether it's a single workshop, a coaching series, or a targeted job posting - to solve your specific pain points."
    },
    {
      number: "03.",
      title: "Program Alignment",
      description: "We refine the selected solution to fit your industry and internal HR policies. This ensures that the integration of returning employees is seamless and adds immediate value to your teams."
    },
    {
      number: "04.",
      title: "Collaborative Execution",
      description: "We facilitate the sessions or launch the recruitment ads. Throughout the process, we remain in close contact to provide feedback and ensure the collaboration meets your expectations."
    }
  ];

  const currentSteps = activeTab === "mamas" ? mamasSteps : businessesSteps;

  return (
    <section id="our-approach" className="relative bg-[#87dda8] py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-[100px] overflow-hidden">
      {/* Decorative Shape */}
      <img
        src={decorativeShape}
        alt=""
        className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[450px] lg:w-[600px] h-auto pointer-events-none"
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16">
        {/* Tabs Navigation */}
        <div className="flex flex-row lg:flex-col lg:w-1/3 gap-2 sm:gap-3 lg:gap-4">
          <TabButton
            active={activeTab === "mamas"}
            onClick={() => setActiveTab("mamas")}
          >
            Mamas
          </TabButton>
          <TabButton
            active={activeTab === "businesses"}
            onClick={() => setActiveTab("businesses")}
          >
            Businesses
          </TabButton>
        </div>

        {/* Process Steps */}
        <div className="lg:w-2/3 flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {currentSteps.map((step) => (
            <FAQItem
              key={step.number}
              number={step.number}
              question={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
