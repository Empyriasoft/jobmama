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

const FAQSection = () => {
  const faqs = [
    {
      number: "01/",
      question: "What is JobMama?",
      description: "JobMama is a comprehensive career support platform designed specifically for mothers returning to the workforce. We provide personalized guidance, resources, and community support to help you navigate your career journey with confidence."
    },
    {
      number: "02/",
      question: "Who is JobMama for?",
      description: "JobMama is for any mother who is looking to re-enter the workforce, transition careers, or advance in their current role. Whether you've been out of work for a few months or several years, our platform is designed to meet you where you are."
    },
    {
      number: "03/",
      question: "How does JobMama support my career growth?",
      description: "We offer a range of services including personalized coaching sessions, resume optimization, interview preparation, networking opportunities, and access to job listings from family-friendly employers who value work-life balance."
    }
  ];

  return (
    <section className="relative bg-[#87dda8] py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-[100px] overflow-hidden">
      {/* Decorative SVG Shape */}
      <svg
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[400px] md:w-[600px] lg:w-[800px] h-auto opacity-60"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'translateY(-50%) translateX(25%) rotate(105deg)' }}
      >
        <path
          d="M400 0C620.914 0 800 179.086 800 400C800 620.914 620.914 800 400 800C179.086 800 0 620.914 0 400C0 179.086 179.086 0 400 0Z"
          fill="white"
          fillOpacity="0.3"
        />
      </svg>

      <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Title Section */}
        <div className="lg:w-1/3">
          <h2 className="font-google-sans text-4xl md:text-6xl lg:text-[128px] text-[#0D141C] leading-none">
            Most
            <br />
            Frequently
            <br />
            Asked
            <br />
            Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="lg:w-2/3 flex flex-col gap-12 md:gap-16 lg:gap-20">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.number}
              number={faq.number}
              question={faq.question}
              description={faq.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
