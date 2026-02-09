import { useState } from "react";
import decorativeShape from "@/assets/faq-decorative-shape.png";
import { useLanguage } from "@/contexts/LanguageContext";

const NumberBadge = ({ number }: { number: string }) => (
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

const FAQItem = ({ number, question, description }: FAQItemProps) => (
  <div className="flex flex-col gap-3 md:gap-6">
    <div className="flex items-start gap-3 md:gap-6">
      <NumberBadge number={number} />
      <h3 className="font-google-sans font-medium text-xl sm:text-2xl md:text-3xl lg:text-[48px] text-[#0D141C] leading-tight break-words">
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
    className={`text-left py-2 px-2 sm:px-3 md:py-3 md:px-4 lg:py-4 lg:px-6 font-google-sans font-medium text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[96px] 2xl:leading-[1.1] transition-all min-h-[44px] ${
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
  const { t } = useLanguage();

  const currentSteps = activeTab === "mamas" ? t.process.mamasSteps : t.process.businessesSteps;

  return (
    <section id="our-approach" className="relative bg-[#87dda8] py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-[100px] overflow-hidden">
      <img
        src={decorativeShape}
        alt=""
        className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[450px] lg:w-[600px] h-auto pointer-events-none"
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16">
        <div className="flex flex-row lg:flex-col lg:w-1/3 gap-2 sm:gap-3 lg:gap-4">
          <TabButton
            active={activeTab === "mamas"}
            onClick={() => setActiveTab("mamas")}
          >
            {t.process.tabs.mamas}
          </TabButton>
          <TabButton
            active={activeTab === "businesses"}
            onClick={() => setActiveTab("businesses")}
          >
            {t.process.tabs.businesses}
          </TabButton>
        </div>

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
