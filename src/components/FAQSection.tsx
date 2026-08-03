import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { pushEvent } from "@/lib/analytics";

const FAQSection = () => {
  const { t } = useLanguage();
  const { title, items } = t.faq;

  // Surfaces the same Q&A to search engines as FAQ rich results.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const handleValueChange = (value: string) => {
    if (value) pushEvent("faq_open", { question: value });
  };

  return (
    <section
      id="faq"
      className="w-full px-5 sm:px-6 md:px-12 lg:px-[100px] mt-[100px] md:mt-[140px] lg:mt-[160px] scroll-mt-24"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <h2
          style={{ fontFamily: "'Google Sans', sans-serif", color: "#0D141C" }}
          className="text-3xl md:text-5xl lg:text-6xl font-medium text-center break-words mb-8 md:mb-12"
        >
          {title}
        </h2>

        <Accordion type="single" collapsible onValueChange={handleValueChange}>
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger
                style={{ fontFamily: "'Inter', sans-serif", color: "#0D141C" }}
                className="text-left text-base md:text-lg font-medium py-5 hover:no-underline gap-4"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent
                style={{ fontFamily: "'Inter', sans-serif" }}
                className="pb-5 text-[15px] md:text-base leading-relaxed text-foreground/75"
              >
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
