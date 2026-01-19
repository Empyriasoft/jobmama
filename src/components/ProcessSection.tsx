import decorativeShape from "@/assets/faq-decorative-shape.png";

const NumberBadge = ({ number }: { number: string }) => (
  <div className="inline-flex items-center justify-center px-4 py-2 border-2 border-[#0D141C] rounded-full">
    <span className="font-inter font-medium text-xl md:text-2xl lg:text-[38px] text-[#0D141C]">
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
  <div className="flex flex-col gap-4 md:gap-6">
    <div className="flex items-start gap-4 md:gap-6">
      <NumberBadge number={number} />
      <h3 className="font-google-sans font-medium text-2xl md:text-4xl lg:text-[58px] text-[#0D141C] leading-tight">
        {question}
      </h3>
    </div>
    <p className="font-inter text-base md:text-lg lg:text-xl text-[#0D141C]/80 leading-relaxed pl-0 md:pl-[72px] lg:pl-[100px]">
      {description}
    </p>
  </div>
);

const ProcessSection = () => {
  const steps = [
    {
      number: "01.",
      title: "Reflect & Plan",
      description: "We begin with a deep-dive conversation to understand your story, your professional goals, and your concerns. This isn't just about a job; it's about your life. In our initial coaching session, we reflect on what you truly want from your next chapter and map out a personalized Strategic Action Plan. You will walk away with clarity, direction, and a concrete plan in hand."
    },
    {
      number: "02.",
      title: "Rebuild Your Toolkit",
      description: "Next, we roll up our sleeves to modernize your professional presence. We rewrite your CV, optimize your LinkedIn profile, and sharpen your interview skills to meet the market standards. As we upgrade your tools, we focus on rebuilding your confidence. Our founder's philosophy is simple: motherhood enhances your skills- it doesn't set them back. We help you translate your resilience and multitasking into professional assets."
    },
    {
      number: "03.",
      title: "Relaunch Your Career",
      description: "With a revamped toolkit and renewed self-belief, you are ready to step out and shine. Whether you are applying for new roles or negotiating a return to your previous employer, we provide the guidance you need to land a position that aligns with your potential. At JobMama, we don't disappear after the sessions end; we offer follow-up support and remain your biggest cheerleaders. You also gain access to our community- a network of fellow moms and experts to lean on as you launch this exciting new chapter."
    }
  ];

  return (
    <section className="relative bg-[#87dda8] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-[100px] overflow-hidden">
      {/* Decorative Shape */}
      <img
        src={decorativeShape}
        alt=""
        className="absolute bottom-0 left-0 w-[300px] md:w-[450px] lg:w-[600px] h-auto pointer-events-none"
      />

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Title Section */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <h2 className="font-google-sans text-4xl md:text-6xl lg:text-[128px] text-[#0D141C] leading-none">
            Our
            <br />
            Process
          </h2>
          <p className="font-inter text-base md:text-lg lg:text-xl text-[#0D141C]/80 leading-relaxed">
            We know that every mother's situation is unique, but the journey back to professional fulfillment follows a simple, proven path to success. At JobMama, we guide you through three transformative stages:
          </p>
        </div>

        {/* Process Steps */}
        <div className="lg:w-2/3 flex flex-col gap-12 md:gap-16 lg:gap-20">
          {steps.map((step) => (
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
